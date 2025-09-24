import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { baseApiUrl } from "../api.js";
import { Tool } from "../types.js";
import { z } from "zod";
import { makeAuthenticatedRequest } from "./utils.js";
import {
  PAGE_SIZE_DESCRIPTION,
  PAGE_CURSOR_DESCRIPTION,
} from "./global-descriptions.js";

const ListPoliciesInput = z.object({
  pageSize: z.number().describe(PAGE_SIZE_DESCRIPTION).optional(),
  pageCursor: z.string().describe(PAGE_CURSOR_DESCRIPTION).optional(),
});

export const ListPoliciesTool: Tool<typeof ListPoliciesInput> = {
  name: "list_policies",
  description:
    "List all policies in your Vanta account. Returns policy IDs, names, types, and metadata for compliance and governance management. Use this to see all policies available for compliance frameworks and organizational governance.",
  parameters: ListPoliciesInput,
};

const GetPolicyInput = z.object({
  policyId: z
    .string()
    .describe(
      "Policy ID to retrieve, e.g. 'policy-123' or specific policy identifier",
    ),
});

export const GetPolicyTool: Tool<typeof GetPolicyInput> = {
  name: "get_policy",
  description:
    "Get policy by ID. Retrieve detailed information about a specific policy when its ID is known. The ID of a policy can be found from get_policies response. Returns complete policy details including name, description, content, approval status, and compliance mappings.",
  parameters: GetPolicyInput,
};

export async function listPolicies(
  args: z.infer<typeof ListPoliciesInput>,
): Promise<CallToolResult> {
  const url = new URL("/v1/policies", baseApiUrl());

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

export async function getPolicy(
  args: z.infer<typeof GetPolicyInput>,
): Promise<CallToolResult> {
  const url = new URL(`/v1/policies/${args.policyId}`, baseApiUrl());

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
