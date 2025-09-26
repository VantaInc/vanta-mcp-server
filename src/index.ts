#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import {
  getTestEntities,
  GetTestEntitiesTool,
  getTests,
  GetTestsTool,
} from "./operations/tests.js";
import {
  GetFrameworkControlsTool,
  GetFrameworksTool,
  getFrameworkControls,
  getFrameworks,
} from "./operations/frameworks.js";
import {
  GetControlsTool,
  GetControlTestsTool,
  getControls,
  getControlTests,
} from "./operations/controls.js";
import express, { Request, Response } from "express";
import { initializeToken } from "./auth.js";

function createServer(): McpServer {
  const server = new McpServer({
    name: "vanta-mcp",
    version: "1.0.0",
    description:
      "Model Context Protocol server for Vanta's automated security compliance platform. Provides access to security tests, compliance frameworks, and security controls for SOC 2, ISO 27001, HIPAA, GDPR and other standards.",
  });

  server.tool(
    GetTestsTool.name,
    GetTestsTool.description,
    GetTestsTool.parameters.shape,
    getTests,
  );

  server.tool(
    GetTestEntitiesTool.name,
    GetTestEntitiesTool.description,
    GetTestEntitiesTool.parameters.shape,
    getTestEntities,
  );

  server.tool(
    GetFrameworksTool.name,
    GetFrameworksTool.description,
    GetFrameworksTool.parameters.shape,
    getFrameworks,
  );

  server.tool(
    GetFrameworkControlsTool.name,
    GetFrameworkControlsTool.description,
    GetFrameworkControlsTool.parameters.shape,
    getFrameworkControls,
  );

  server.tool(
    GetControlsTool.name,
    GetControlsTool.description,
    GetControlsTool.parameters.shape,
    getControls,
  );

  server.tool(
    GetControlTestsTool.name,
    GetControlTestsTool.description,
    GetControlTestsTool.parameters.shape,
    getControlTests,
  );

  return server;
}

async function main() {
  try {
    await initializeToken();
    console.error("Token initialized successfully");
  } catch (error) {
    console.error("Failed to initialize token:", error);
    process.exit(1);
  }

  // Check if we should run in HTTP mode
  const mode = process.env.MCP_MODE ?? 'stdio';

  if (mode === 'http') {
    await startHttpServer();
  } else {
    await startStdioServer();
  }
}

async function startStdioServer() {
  const server = createServer();
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

async function startHttpServer() {
  const app = express();
  app.use(express.json());

  app.post('/mcp', async (req: Request, res: Response) => {
    // In stateless mode, create a new instance of transport and server for each request
    // to ensure complete isolation. A single instance would cause request ID collisions
    // when multiple clients connect concurrently.

    try {
      const server = createServer();
      const transport: StreamableHTTPServerTransport = new StreamableHTTPServerTransport({
        sessionIdGenerator: undefined,
      });
      res.on('close', () => {
        console.log('Request closed');
        void transport.close();
        void server.close();
      });
      await server.connect(transport);
      await transport.handleRequest(req, res, req.body);
    } catch (error) {
      console.error('Error handling MCP request:', error);
      if (!res.headersSent) {
        res.status(500).json({
          jsonrpc: '2.0',
          error: {
            code: -32603,
            message: 'Internal server error',
          },
          id: null,
        });
      }
    }
  });

  // SSE notifications not supported in stateless mode
  app.get('/mcp', (req: Request, res: Response) => {
    console.log('Received GET MCP request');
    res.writeHead(405).end(JSON.stringify({
      jsonrpc: "2.0",
      error: {
        code: -32000,
        message: "Method not allowed."
      },
      id: null
    }));
  });

  // Session termination not needed in stateless mode
  app.delete('/mcp', (req: Request, res: Response) => {
    console.log('Received DELETE MCP request');
    res.writeHead(405).end(JSON.stringify({
      jsonrpc: "2.0",
      error: {
        code: -32000,
        message: "Method not allowed."
      },
      id: null
    }));
  });

  // Health check endpoint for Docker
  app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      mode: 'http',
      service: 'vanta-mcp-server'
    });
  });

  const PORT = Number.parseInt(process.env.PORT ?? '3000', 10);
  app.listen(PORT, (error?: Error) => {
    if (error) {
      console.error('Failed to start server:', error);
      process.exit(1);
    }
    console.log(`MCP Stateless Streamable HTTP Server listening on port ${PORT}`);
  });
}

main().catch(error => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
