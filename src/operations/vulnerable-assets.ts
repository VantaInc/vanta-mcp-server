// 1. Imports
import {
  CallToolResult,
  Tool,
  z,
  createConsolidatedSchema,
  makeConsolidatedRequest,
} from "./common/imports.js";

// 2. Input Schemas
const VulnerableAssetsInput = createConsolidatedSchema({
  paramName: "vulnerableAssetId",
  description:
    "Vulnerable asset ID to retrieve, e.g. 'vulnerable-asset-123' or specific asset identifier",
  resourceName: "vulnerable asset",
});

// 3. Tool Definitions
export const VulnerableAssetsTool: Tool<typeof VulnerableAssetsInput> = {
  name: "vulnerable_assets",
  description:
    "Access vulnerable assets in your Vanta account. Provide vulnerableAssetId to get a specific vulnerable asset, or omit to list all vulnerable assets. Returns asset details, vulnerability counts, and security status.",
  parameters: VulnerableAssetsInput,
};

// 4. Implementation Functions
export async function vulnerableAssets(
  args: z.infer<typeof VulnerableAssetsInput>,
): Promise<CallToolResult> {
  return makeConsolidatedRequest(
    "/v1/vulnerable-assets",
    args,
    "vulnerableAssetId",
  );
}

// Registry export for automated tool registration
export default {
  tools: [{ tool: VulnerableAssetsTool, handler: vulnerableAssets }],
};
