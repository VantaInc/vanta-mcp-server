// 1. Imports
import {
  CallToolResult,
  Tool,
  z,
  createPaginationSchema,
  createIdWithPaginationSchema,
  makePaginatedGetRequest,
  buildUrl,
  makeAuthenticatedRequest,
  handleApiResponse,
  DISCOVERED_VENDOR_ID_DESCRIPTION,
} from "./common/imports.js";

// 2. Input Schemas
const ListDiscoveredVendorsInput = createPaginationSchema();

const ListDiscoveredVendorAccountsInput = createIdWithPaginationSchema({
  paramName: "discoveredVendorId",
  description: DISCOVERED_VENDOR_ID_DESCRIPTION,
});

// 3. Tool Definitions
export const ListDiscoveredVendorsTool: Tool<
  typeof ListDiscoveredVendorsInput
> = {
  name: "list_discovered_vendors",
  description:
    "List discovered vendors identified by Vanta's automated discovery. Returns vendor names, domains, discovery sources, and linkage status to managed vendor records.",
  parameters: ListDiscoveredVendorsInput,
};

export const ListDiscoveredVendorAccountsTool: Tool<
  typeof ListDiscoveredVendorAccountsInput
> = {
  name: "list_discovered_vendor_accounts",
  description:
    "List accounts associated with a discovered vendor. Provide discoveredVendorId to retrieve account identifiers, connection details, and discovery metadata.",
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
