import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { baseApiUrl } from "../api.js";
import { Tool } from "../types.js";
import { z } from "zod";
import { makeAuthenticatedRequest } from "./utils.js";
import {
  PAGE_SIZE_DESCRIPTION,
  PAGE_CURSOR_DESCRIPTION,
} from "./global-descriptions.js";

const GetVulnerableAssetsInput = z.object({
  pageSize: z.number().describe(PAGE_SIZE_DESCRIPTION).optional(),
  pageCursor: z.string().describe(PAGE_CURSOR_DESCRIPTION).optional(),
});

export const GetVulnerableAssetsTool: Tool<typeof GetVulnerableAssetsInput> = {
  name: "get_vulnerable_assets",
  description:
    "List assets associated with vulnerabilities in your Vanta account. Returns asset IDs, vulnerability associations, asset types, and security status for infrastructure security management. Use this to identify which assets are affected by vulnerabilities and prioritize security efforts.",
  parameters: GetVulnerableAssetsInput,
};

const GetVulnerableAssetByIdInput = z.object({
  vulnerableAssetId: z
    .string()
    .describe(
      "Vulnerable asset ID to retrieve, e.g. 'asset-123' or specific vulnerable asset identifier",
    ),
});

export const GetVulnerableAssetByIdTool: Tool<typeof GetVulnerableAssetByIdInput> = {
  name: "get_vulnerable_asset_by_id",
  description:
    "Get vulnerable asset by ID. Retrieve detailed information about a specific vulnerable asset when its ID is known. The ID of a vulnerable asset can be found from get_vulnerable_assets response. Returns complete asset details including vulnerability associations, asset type, and security status.",
  parameters: GetVulnerableAssetByIdInput,
};

export async function getVulnerableAssets(
  args: z.infer<typeof GetVulnerableAssetsInput>,
): Promise<CallToolResult> {
  const url = new URL("/v1/vulnerable-assets", baseApiUrl());

  if (args.pageSize !== undefined) {
    url.searchParams.append("pageSize", args.pageSize.toString());
  }
  if (args.pageCursor !== undefined) {
    url.searchParams.append("pageCursor", args.pageCursor);
  }

  const response = await makeAuthenticatedRequest(url.toString());

  if (!response.ok) {
    return {
      content: [
        {
          type: "text" as const,
          text: `Error: ${response.statusText}`,
        },
      ],
    };
  }

  return {
    content: [
      { type: "text" as const, text: JSON.stringify(await response.json()) },
    ],
  };
}

export async function getVulnerableAssetById(
  args: z.infer<typeof GetVulnerableAssetByIdInput>,
): Promise<CallToolResult> {
  const url = new URL(`/v1/vulnerable-assets/${args.vulnerableAssetId}`, baseApiUrl());

  const response = await makeAuthenticatedRequest(url.toString());

  if (!response.ok) {
    return {
      content: [
        {
          type: "text" as const,
          text: `Error: ${response.statusText}`,
        },
      ],
    };
  }

  return {
    content: [
      { type: "text" as const, text: JSON.stringify(await response.json()) },
    ],
  };
}
