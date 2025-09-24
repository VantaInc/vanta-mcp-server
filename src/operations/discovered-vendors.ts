import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { baseApiUrl } from "../api.js";
import { Tool } from "../types.js";
import { z } from "zod";
import { makeAuthenticatedRequest } from "./utils.js";
import {
  PAGE_SIZE_DESCRIPTION,
  PAGE_CURSOR_DESCRIPTION,
} from "./global-descriptions.js";

const ListDiscoveredVendorsInput = z.object({
  pageSize: z.number().describe(PAGE_SIZE_DESCRIPTION).optional(),
  pageCursor: z.string().describe(PAGE_CURSOR_DESCRIPTION).optional(),
});

export const ListDiscoveredVendorsTool: Tool<typeof ListDiscoveredVendorsInput> =
  {
    name: "list_discovered_vendors",
    description:
      "List discovered vendors in your Vanta account. Returns vendors that have been automatically discovered through integrations but may not yet be managed as official vendors. Use this to see potential vendors for risk assessment and vendor management onboarding.",
    parameters: ListDiscoveredVendorsInput,
  };

const ListDiscoveredVendorAccountsInput = z.object({
  pageSize: z.number().describe(PAGE_SIZE_DESCRIPTION).optional(),
  pageCursor: z.string().describe(PAGE_CURSOR_DESCRIPTION).optional(),
});

export const ListDiscoveredVendorAccountsTool: Tool<
  typeof ListDiscoveredVendorAccountsInput
> = {
  name: "list_discovered_vendor_accounts",
  description:
    "List discovered vendor accounts in your Vanta account. Returns detailed account information for discovered vendors including integration sources and account metadata. Use this to understand vendor relationships and account structures before converting to managed vendors.",
  parameters: ListDiscoveredVendorAccountsInput,
};

export async function listDiscoveredVendors(
  args: z.infer<typeof ListDiscoveredVendorsInput>,
): Promise<CallToolResult> {
  const url = new URL("/v1/discovered-vendors", baseApiUrl());

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

export async function listDiscoveredVendorAccounts(
  args: z.infer<typeof ListDiscoveredVendorAccountsInput>,
): Promise<CallToolResult> {
  const url = new URL("/v1/discovered-vendors/accounts", baseApiUrl());

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
