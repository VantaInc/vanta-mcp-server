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
      "Risk scenario ID to retrieve, e.g. 'risk-scenario-123' or specific risk identifier. If provided, returns the specific risk scenario, and no other parameters may be provided. If omitted, lists all risk scenarios with optional filtering and pagination.",
    resourceName: "risk scenario",
  },
  {
    categoryMatchesAny: z
      .string()
      .optional()
      .describe(
        "Filter by risk category. Example: Access Control, Cryptography, Privacy, etc. Use 'Uncategorized' for risks that don't have a category.",
      ),
    reviewStatusMatchesAny: z
      .array(z.string())
      .describe(
        "Filter risk scenarios by review status. Possible values: PENDING, APPROVED, REJECTED",
      )
      .optional(),
  },
);

// 3. Tool Definitions
export const RisksTool: Tool<typeof RisksInput> = {
  name: "risks",
  description:
    "Access risk scenarios in your Vanta account. Provide riskId to get a specific risk scenario, or omit to list all risks with optional filtering and pagination. Returns risk details, impact assessments, and mitigation strategies for compliance reporting.",
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
