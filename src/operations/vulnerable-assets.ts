// 1. Imports
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { Tool } from "../types.js";
import { z } from "zod";
import {
  createPaginationSchema,
  createIdSchema,
  makePaginatedGetRequest,
  makeGetByIdRequest,
} from "./utils.js";

// 2. Input Schemas
const ListVulnerableAssetsInput = createPaginationSchema();

const GetVulnerableAssetInput = createIdSchema({
  paramName: "vulnerableAssetId",
  description:
    "Vulnerable asset ID to retrieve, e.g. 'vulnerable-asset-123' or specific asset identifier",
});

// 3. Tool Definitions
export const ListVulnerableAssetsTool: Tool<typeof ListVulnerableAssetsInput> =
  {
    name: "list_vulnerable_assets",
    description:
      "List all vulnerable assets in your Vanta account. Returns asset IDs, hostnames, vulnerability counts, and risk scores for security monitoring. Use this to see all assets that have identified vulnerabilities requiring attention.",
    parameters: ListVulnerableAssetsInput,
  };

export const GetVulnerableAssetTool: Tool<typeof GetVulnerableAssetInput> = {
  name: "get_vulnerable_asset",
  description:
    "Get vulnerable asset by ID. Retrieve detailed information about a specific vulnerable asset when its ID is known. The ID of a vulnerable asset can be found from list_vulnerable_assets response. Returns complete asset details including vulnerability list, risk assessment, and remediation recommendations.",
  parameters: GetVulnerableAssetInput,
};

// 4. Implementation Functions
export async function listVulnerableAssets(
  args: z.infer<typeof ListVulnerableAssetsInput>,
): Promise<CallToolResult> {
  return makePaginatedGetRequest("/v1/vulnerable-assets", args);
}

export async function getVulnerableAsset(
  args: z.infer<typeof GetVulnerableAssetInput>,
): Promise<CallToolResult> {
  return makeGetByIdRequest("/v1/vulnerable-assets", args.vulnerableAssetId);
}

// Registry export for automated tool registration
export default {
  tools: [
    { tool: ListVulnerableAssetsTool, handler: listVulnerableAssets },
    { tool: GetVulnerableAssetTool, handler: getVulnerableAsset },
  ],
};
