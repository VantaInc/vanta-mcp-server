// 1. Imports
import {
  CallToolResult,
  Tool,
  z,
  createConsolidatedSchema,
  makeConsolidatedRequest,
} from "./common/imports.js";

// 2. Input Schemas
const RisksInput = createConsolidatedSchema(
  {
    paramName: "riskId",
    description:
      "Risk scenario ID to retrieve, e.g. 'risk-scenario-123' or specific risk identifier",
    resourceName: "risk scenario",
  },
  {
    categoryMatchesAny: z
      .string()
      .optional()
      .describe(
        "Filter by risk category. Example: Access Control, Cryptography, Privacy, etc.",
      ),
  },
);

// 3. Tool Definitions
export const RisksTool: Tool<typeof RisksInput> = {
  name: "risks",
  description:
    "Access risk scenarios in your Vanta account. Provide riskId to get a specific risk scenario, or omit to list all risks with optional category filtering. Returns risk details, assessments, and mitigation strategies for compliance reporting.",
  parameters: RisksInput,
};

// 4. Implementation Functions
export async function risks(
  args: z.infer<typeof RisksInput>,
): Promise<CallToolResult> {
  return makeConsolidatedRequest("/v1/risk-scenarios", args, "riskId");
}

// Registry export for automated tool registration
export default {
  tools: [{ tool: RisksTool, handler: risks }],
};
