import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { baseApiUrl } from "../api.js";
import { Tool } from "../types.js";
import { z } from "zod";
import { makeAuthenticatedRequest } from "./utils.js";
import {
  PAGE_SIZE_DESCRIPTION,
  PAGE_CURSOR_DESCRIPTION,
} from "./global-descriptions.js";

const ListVendorRiskAttributesInput = z.object({
  pageSize: z.number().describe(PAGE_SIZE_DESCRIPTION).optional(),
  pageCursor: z.string().describe(PAGE_CURSOR_DESCRIPTION).optional(),
});

export const ListVendorRiskAttributesTool: Tool<
  typeof ListVendorRiskAttributesInput
> = {
  name: "list_vendor_risk_attributes",
  description:
    "List vendor risk attributes in your Vanta account. Returns risk attribute IDs, names, categories, and assessment criteria for vendor risk management. Use this to understand the available risk attributes for evaluating and categorizing vendor risks across your organization.",
  parameters: ListVendorRiskAttributesInput,
};

export async function listVendorRiskAttributes(
  args: z.infer<typeof ListVendorRiskAttributesInput>,
): Promise<CallToolResult> {
  const url = new URL("/v1/vendor-risk-attributes", baseApiUrl());

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
