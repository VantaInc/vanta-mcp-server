// 1. Imports
import {
  CallToolResult,
  Tool,
  z,
  createPaginationSchema,
  makePaginatedGetRequest,
} from "./common/imports.js";

// 2. Input Schemas
const ListVendorRiskAttributesInput = createPaginationSchema();

// 3. Tool Definitions
export const ListVendorRiskAttributesTool: Tool<
  typeof ListVendorRiskAttributesInput
> = {
  name: "list_vendor_risk_attributes",
  description:
    "List all vendor risk attributes in your Vanta account. Returns attribute IDs, names, categories, and risk scoring criteria for vendor risk assessment. Use this to see all available risk attributes for evaluating vendor relationships.",
  parameters: ListVendorRiskAttributesInput,
};

// 4. Implementation Functions
export async function listVendorRiskAttributes(
  args: z.infer<typeof ListVendorRiskAttributesInput>,
): Promise<CallToolResult> {
  return makePaginatedGetRequest("/v1/vendor-risk-attributes", args);
}

// Registry export for automated tool registration
export default {
  tools: [
    { tool: ListVendorRiskAttributesTool, handler: listVendorRiskAttributes },
  ],
};
