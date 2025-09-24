// 1. Imports
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { Tool } from "../types.js";
import { z } from "zod";
import {
  createPaginationSchema,
  createIdSchema,
  createIdWithPaginationSchema,
  makePaginatedGetRequest,
  makeGetByIdRequest,
  buildUrl,
  makeAuthenticatedRequest,
  handleApiResponse,
} from "./utils.js";

// 2. Input Schemas
const ListGroupsInput = createPaginationSchema();

const GetGroupInput = createIdSchema({
  paramName: "groupId",
  description:
    "Group ID to retrieve, e.g. 'group-123' or specific group identifier",
});

const ListGroupPeopleInput = createIdWithPaginationSchema({
  paramName: "groupId",
  description:
    "Group ID to get people for, e.g. 'group-123' or specific group identifier",
});

// 3. Tool Definitions
export const ListGroupsTool: Tool<typeof ListGroupsInput> = {
  name: "list_groups",
  description:
    "List all groups in your Vanta account. Returns group IDs, names, descriptions, and member counts for organizational structure management. Use this to see all available groups for access control and compliance.",
  parameters: ListGroupsInput,
};

export const GetGroupTool: Tool<typeof GetGroupInput> = {
  name: "get_group",
  description:
    "Get group by ID. Retrieve detailed information about a specific group when its ID is known. The ID of a group can be found from list_groups response. Returns complete group details including name, description, member list, and access permissions.",
  parameters: GetGroupInput,
};

export const ListGroupPeopleTool: Tool<typeof ListGroupPeopleInput> = {
  name: "list_group_people",
  description:
    "List people in a group. Get all people who are members of a specific group for access management and organizational oversight. Returns person details including names, emails, and roles within the group.",
  parameters: ListGroupPeopleInput,
};

// 4. Implementation Functions
export async function listGroups(
  args: z.infer<typeof ListGroupsInput>,
): Promise<CallToolResult> {
  return makePaginatedGetRequest("/v1/groups", args);
}

export async function getGroup(
  args: z.infer<typeof GetGroupInput>,
): Promise<CallToolResult> {
  return makeGetByIdRequest("/v1/groups", args.groupId);
}

export async function listGroupPeople(
  args: z.infer<typeof ListGroupPeopleInput>,
): Promise<CallToolResult> {
  const { groupId, ...params } = args;
  const url = buildUrl(`/v1/groups/${String(groupId)}/people`, params);
  const response = await makeAuthenticatedRequest(url);
  return handleApiResponse(response);
}

// Registry export for automated tool registration
export default {
  tools: [
    { tool: ListGroupsTool, handler: listGroups },
    { tool: GetGroupTool, handler: getGroup },
    { tool: ListGroupPeopleTool, handler: listGroupPeople },
  ],
};
