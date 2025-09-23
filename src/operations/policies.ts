import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { baseApiUrl } from "../api.js";
import { Tool } from "../types.js";
import { z } from "zod";
import { makeAuthenticatedRequest } from "./utils.js";
import {
  PAGE_SIZE_DESCRIPTION,
  PAGE_CURSOR_DESCRIPTION,
} from "./global-descriptions.js";

const GetPoliciesInput = z.object({
  pageSize: z.number().describe(PAGE_SIZE_DESCRIPTION).optional(),
  pageCursor: z.string().describe(PAGE_CURSOR_DESCRIPTION).optional(),
});

export const GetPoliciesTool: Tool<typeof GetPoliciesInput> = {
  name: "get_policies",
  description:
    "List all policies in your Vanta account. Returns policy IDs, names, types, and metadata for compliance and governance management. Use this to see all policies available for compliance frameworks and organizational governance.",
  parameters: GetPoliciesInput,
};

const GetPolicyByIdInput = z.object({
  policyId: z
    .string()
    .describe(
      "Policy ID to retrieve, e.g. 'policy-123' or specific policy identifier",
    ),
});

export const GetPolicyByIdTool: Tool<typeof GetPolicyByIdInput> = {
  name: "get_policy_by_id",
  description:
    "Get policy by ID. Retrieve detailed information about a specific policy when its ID is known. The ID of a policy can be found from get_policies response. Returns complete policy details including name, description, content, approval status, and compliance mappings.",
  parameters: GetPolicyByIdInput,
};

export async function getPolicies(
  args: z.infer<typeof GetPoliciesInput>,
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

export async function getPolicyById(
  args: z.infer<typeof GetPolicyByIdInput>,
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
