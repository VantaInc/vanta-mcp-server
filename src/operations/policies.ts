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
const ListPoliciesInput = createPaginationSchema();

const GetPolicyInput = createIdSchema({
  paramName: "policyId",
  description:
    "Policy ID to retrieve, e.g. 'policy-123' or specific policy identifier",
});

// 3. Tool Definitions
export const ListPoliciesTool: Tool<typeof ListPoliciesInput> = {
  name: "list_policies",
  description:
    "List all policies in your Vanta account. Returns policy IDs, names, types, and metadata for compliance and governance management. Use this to see all policies available for compliance frameworks and organizational governance.",
  parameters: ListPoliciesInput,
};

export const GetPolicyTool: Tool<typeof GetPolicyInput> = {
  name: "get_policy",
  description:
    "Get policy by ID. Retrieve detailed information about a specific policy when its ID is known. The ID of a policy can be found from get_policies response. Returns complete policy details including name, description, content, approval status, and compliance mappings.",
  parameters: GetPolicyInput,
};

// 4. Implementation Functions
export async function listPolicies(
  args: z.infer<typeof ListPoliciesInput>,
): Promise<CallToolResult> {
  return makePaginatedGetRequest("/v1/policies", args);
}

export async function getPolicy(
  args: z.infer<typeof GetPolicyInput>,
): Promise<CallToolResult> {
  return makeGetByIdRequest("/v1/policies", args.policyId);
}
