import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { randomUUID } from "node:crypto";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { registerAllOperations } from "../registry.js";

const RESOURCE_METADATA_PATH = "/.well-known/oauth-protected-resource";
const AUTH_SERVER_METADATA_PATH = "/.well-known/oauth-authorization-server";
const VANTA_SCOPES = ["vanta-api.all:read"];

interface AuthenticatedRequest extends Request {
  vantaToken: string;
}

export interface ServerConfig {
  issuerUrl: string;
  vantaAuthServer: string;
}

// Vanta's actual token endpoint (proxied through this server)
const VANTA_TOKEN_ENDPOINT = "http://127.0.0.1:10290/oauth/token";

export function createHttpServer(config: ServerConfig) {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Log ALL requests to see what the client is doing
  app.use((req: Request, _res: Response, next: NextFunction) => {
    console.log(`[${req.method}] ${req.path}`);
    next();
  });

  // Protected Resource Metadata (RFC 9728)
  // Points to this server as the issuer - we proxy Vanta's OAuth endpoints
  app.get(RESOURCE_METADATA_PATH, (_req: Request, res: Response) => {
    console.log('inside resource metadata');
    res.json({
      resource: config.issuerUrl,
      authorization_servers: [{ issuer: config.issuerUrl }],
      scopes_supported: VANTA_SCOPES,
    });
  });

  // Authorization Server Metadata (RFC 8414)
  // Proxies to Vanta's actual OAuth endpoints
  app.get(AUTH_SERVER_METADATA_PATH, (_req: Request, res: Response) => {
    console.log('inside auth server metadata');

    // Build authorization URL with extra query parameters
    const authUrl = new URL("http://127.0.0.1:8080/oauth/authorize");
    authUrl.searchParams.set("source_id", "vanta-mcp-server");

    res.json({
      issuer: config.issuerUrl,
      authorization_endpoint: authUrl.toString(),
      // Token endpoint points to our proxy, which adds extra params
      token_endpoint: `${config.issuerUrl}/oauth/token`,
      scopes_supported: VANTA_SCOPES,
      response_types_supported: ["code"],
      grant_types_supported: ["authorization_code", "refresh_token"],
    });
  });

  // Token endpoint proxy - adds extra parameters and forwards to Vanta
  app.post("/oauth/token", async (req: Request, res: Response) => {
    console.log("Proxying token request to Vanta");

    // Add extra parameters to the request body
    const bodyWithExtras = {
      ...req.body,
      source_id: "vanta-mcp-server",
      // Add any other custom parameters here:
      // custom_param: "value",
    };

    try {
      const response = await fetch(VANTA_TOKEN_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(bodyWithExtras).toString(),
      });

      const data = await response.json() as Record<string, unknown>;
      console.log("Token proxy response:", data);
      console.log("Token proxy response status:", response.status);

      // Add scope to response if not present (some clients require this)
      if (response.ok && !data.scope) {
        data.scope = VANTA_SCOPES.join(" ");
      }

      res.status(response.status).json(data);
    } catch (error) {
      console.error("Token proxy error:", error);
      res.status(500).json({ error: "Token proxy failed" });
    }
  });

  // Bearer token validation middleware
  const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      res
        .status(401)
        .set(
          "WWW-Authenticate",
          `Bearer resource_metadata="${config.issuerUrl}${RESOURCE_METADATA_PATH}"`,
        )
        .send("Unauthorized");
      return;
    }
    (req as AuthenticatedRequest).vantaToken = authHeader.slice(7);
    next();
  };

  // Track active transports and servers by session ID
  const sessions = new Map<string, {
    transport: StreamableHTTPServerTransport;
    server: McpServer;
  }>();

  // MCP endpoint (Streamable HTTP) - handles both GET and POST
  app.all("/mcp", requireAuth, async (req: Request, res: Response) => {
    const { vantaToken } = req as AuthenticatedRequest;
    console.log(`MCP endpoint called: ${req.method}`);

    // Check for existing session
    const sessionId = req.headers["mcp-session-id"] as string | undefined;
    console.log(`Session ID from header: ${sessionId}`);

    if (sessionId && sessions.has(sessionId)) {
      // Existing session - reuse transport
      console.log(`Reusing existing session: ${sessionId}`);
      const session = sessions.get(sessionId)!;
      await session.transport.handleRequest(req, res, req.body);
      return;
    }

    // New session - create server and transport
    console.log("Creating new session");
    const server = new McpServer({ name: "vanta-mcp", version: "2.0.0" });
    await registerAllOperations(server, vantaToken);

    const transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: () => randomUUID(),
    });

    // Connect server to transport BEFORE handling request
    await server.connect(transport);

    // Handle the request - this will set the sessionId
    await transport.handleRequest(req, res, req.body);

    // Store session AFTER handling request (sessionId is now set)
    const newSessionId = transport.sessionId;
    console.log(`New session ID after handling: ${newSessionId}`);
    if (newSessionId) {
      sessions.set(newSessionId, { transport, server });

      transport.onclose = () => {
        console.log(`Session ${newSessionId} closed`);
        sessions.delete(newSessionId);
      };
    }
  });

  return app;
}
