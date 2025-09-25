// 1. Imports
import {
  CallToolResult,
  Tool,
  z,
  createConsolidatedSchema,
  makeConsolidatedRequest,
} from "./common/imports.js";

// 2. Input Schemas
const MonitoredComputersInput = createConsolidatedSchema({
  paramName: "monitoredComputerId",
  description:
    "Monitored computer ID to retrieve, e.g. 'comp-123' or specific monitored computer identifier",
  resourceName: "monitored computer",
});

// 3. Tool Definitions
export const MonitoredComputersTool: Tool<typeof MonitoredComputersInput> = {
  name: "monitored_computers",
  description:
    "Access monitored computers in your Vanta account. Provide monitoredComputerId to get a specific computer, or omit to list all monitored computers. Returns computer details, compliance status, and security measures for device management.",
  parameters: MonitoredComputersInput,
};

// 4. Implementation Functions
export async function monitoredComputers(
  args: z.infer<typeof MonitoredComputersInput>,
): Promise<CallToolResult> {
  return makeConsolidatedRequest(
    "/v1/monitored-computers",
    args,
    "monitoredComputerId",
  );
}

// Registry export for automated tool registration
export default {
  tools: [{ tool: MonitoredComputersTool, handler: monitoredComputers }],
};
