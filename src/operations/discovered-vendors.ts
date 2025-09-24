// 1. Imports
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { Tool } from "../types.js";
import { z } from "zod";
import {
  createPaginationSchema,
  createIdWithPaginationSchema,
  makePaginatedGetRequest,
  buildUrl,
  makeAuthenticatedRequest,
  handleApiResponse,
} from "./utils.js";

// 2. Input Schemas
const ListDiscoveredVendorsInput = createPaginationSchema();

const ListDiscoveredVendorAccountsInput = createIdWithPaginationSchema({
  paramName: "discoveredVendorId",
  description:
    "Discovered vendor ID to get accounts for, e.g. 'discovered-vendor-123' or specific discovered vendor identifier",
});

// 3. Tool Definitions
export const ListDiscoveredVendorsTool: Tool<
  typeof ListDiscoveredVendorsInput
> = {
  name: "list_discovered_vendors",
  description:
    "List all discovered vendors in your Vanta account. Returns vendor IDs, names, and metadata for vendor risk management. Use this to see all vendors that have been discovered through automatic detection or manual entry.",
  parameters: ListDiscoveredVendorsInput,
};

export const ListDiscoveredVendorAccountsTool: Tool<
  typeof ListDiscoveredVendorAccountsInput
> = {
  name: "list_discovered_vendor_accounts",
  description:
    "List a discovered vendor's accounts. Get all accounts associated with a specific discovered vendor for vendor risk management. Use this when you know a discovered vendor ID and want to see which accounts are linked to that vendor.",
  parameters: ListDiscoveredVendorAccountsInput,
};

// 4. Implementation Functions
export async function listDiscoveredVendors(
  args: z.infer<typeof ListDiscoveredVendorsInput>,
): Promise<CallToolResult> {
  return makePaginatedGetRequest("/v1/discovered-vendors", args);
}

export async function listDiscoveredVendorAccounts(
  args: z.infer<typeof ListDiscoveredVendorAccountsInput>,
): Promise<CallToolResult> {
  const { discoveredVendorId, ...params } = args;
  const url = buildUrl(
    `/v1/discovered-vendors/${String(discoveredVendorId)}/accounts`,
    params,
  );
  const response = await makeAuthenticatedRequest(url);
  return handleApiResponse(response);
}

// Registry export for automated tool registration
export default {
  tools: [
    { tool: ListDiscoveredVendorsTool, handler: listDiscoveredVendors },
    {
      tool: ListDiscoveredVendorAccountsTool,
      handler: listDiscoveredVendorAccounts,
    },
  ],
};
