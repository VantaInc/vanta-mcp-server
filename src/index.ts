#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registerAllOperations } from "./registry.js";
import { initializeToken } from "./auth.js";
import { getEnabledToolNames, hasEnabledToolFilter } from "./config.js";

const server = new McpServer({
  name: "vanta-mcp",
  version: "1.0.0",
});

async function main() {
  try {
    await initializeToken();
    console.error("Token initialized successfully");

    // Register all tools automatically
    await registerAllOperations(server);

    if (hasEnabledToolFilter) {
      const enabledTools = getEnabledToolNames();
      console.error(
        `⚠️ Tools enabled via VANTA_MCP_ENABLED_TOOLS: ${enabledTools.join(", ")}`,
      );
    }

    // Connect to stdio transport
    const transport = new StdioServerTransport();
    await server.connect(transport);

    console.error("🚀 Vanta MCP Server started successfully!");
  } catch (error) {
    console.error("Failed to start Vanta MCP Server:", error);
    process.exit(1);
  }
}

// Handle shutdown gracefully
process.on("SIGINT", () => {
  console.error("Shutting down Vanta MCP Server...");
  process.exit(0);
});

main().catch(error => {
  console.error("Fatal error:", error);
  process.exit(1);
});
