// 1. Imports
import {
  CallToolResult,
  Tool,
  z,
  createConsolidatedSchema,
  makeConsolidatedRequest,
} from "./common/imports.js";

// 2. Input Schemas
const VulnerabilitiesInput = createConsolidatedSchema({
  paramName: "vulnerabilityId",
  description:
    "Vulnerability ID to retrieve, e.g. 'vulnerability-123' or specific vulnerability identifier",
  resourceName: "vulnerability",
});

// 3. Tool Definitions
export const VulnerabilitiesTool: Tool<typeof VulnerabilitiesInput> = {
  name: "vulnerabilities",
  description:
    "Access vulnerabilities in your Vanta account. Provide vulnerabilityId to get a specific vulnerability, or omit to list all vulnerabilities. Returns vulnerability details, severity levels, and status for security monitoring.",
  parameters: VulnerabilitiesInput,
};

// 4. Implementation Functions
export async function vulnerabilities(
  args: z.infer<typeof VulnerabilitiesInput>,
): Promise<CallToolResult> {
  return makeConsolidatedRequest(
    "/v1/vulnerabilities",
    args,
    "vulnerabilityId",
  );
}

// Registry export for automated tool registration
export default {
  tools: [{ tool: VulnerabilitiesTool, handler: vulnerabilities }],
};
