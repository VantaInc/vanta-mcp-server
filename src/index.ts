import { McpServer, ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { deactivateTestEntity, DeactivateTestEntityTool, getTestEntities, GetTestEntitiesTool, getTests, GetTestsTool } from "./operations/tests.js";
import { ZodRawShape } from "zod";
import { z } from "zod";

const server = new McpServer({
  name: "vanta-mcp",
  version: "1.0.0",
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
  DeactivateTestEntityTool.name,
  DeactivateTestEntityTool.description,
  DeactivateTestEntityTool.parameters.shape,
  deactivateTestEntity,
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch(error => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
