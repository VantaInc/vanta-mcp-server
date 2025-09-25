// 1. Imports
import {
  CallToolResult,
  Tool,
  z,
  createConsolidatedSchema,
  makeConsolidatedRequest,
} from "./common/imports.js";

// 2. Input Schemas
const PoliciesInput = createConsolidatedSchema({
  paramName: "policyId",
  description:
    "Policy ID to retrieve, e.g. 'policy-123' or specific policy identifier",
  resourceName: "policy",
});

// 3. Tool Definitions
export const PoliciesTool: Tool<typeof PoliciesInput> = {
  name: "policies",
  description:
    "Access policies in your Vanta account. Provide policyId to get a specific policy, or omit to list all policies. Returns policy IDs, names, and metadata for governance and compliance management.",
  parameters: PoliciesInput,
};

// 4. Implementation Functions
export async function policies(
  args: z.infer<typeof PoliciesInput>,
): Promise<CallToolResult> {
  return makeConsolidatedRequest("/v1/policies", args, "policyId");
}

// Registry export for automated tool registration
export default {
  tools: [{ tool: PoliciesTool, handler: policies }],
};
