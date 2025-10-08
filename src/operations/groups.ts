// 1. Imports
import {
  CallToolResult,
  Tool,
  z,
  createConsolidatedSchema,
  createIdWithPaginationSchema,
  makeConsolidatedRequest,
  buildUrl,
  makeAuthenticatedRequest,
  handleApiResponse,
} from "./common/imports.js";

// 2. Input Schemas
const GroupsInput = createConsolidatedSchema({
  paramName: "groupId",
  description:
    "Group ID to retrieve, e.g. 'group-123' or specific group identifier",
  resourceName: "group",
});

const ListGroupPeopleInput = createIdWithPaginationSchema({
  paramName: "groupId",
  description:
    "Group ID to get people for, e.g. 'group-123' or specific group identifier",
});

// 3. Tool Definitions
export const GroupsTool: Tool<typeof GroupsInput> = {
  name: "groups",
  description:
    "Access groups in your Vanta account. Provide groupId to get a specific group, or omit to list all groups. Returns group IDs, names, descriptions, and metadata for organizational structure and access management.",
  parameters: GroupsInput,
};

export const ListGroupPeopleTool: Tool<typeof ListGroupPeopleInput> = {
  name: "list_group_people",
  description:
    "List group's people. Get all people who are members of a specific group. Use this to see group membership and organizational structure.",
  parameters: ListGroupPeopleInput,
};

// 4. Implementation Functions
export async function groups(
  args: z.infer<typeof GroupsInput>,
): Promise<CallToolResult> {
  return makeConsolidatedRequest("/v1/groups", args, "groupId");
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
    { tool: GroupsTool, handler: groups },
    { tool: ListGroupPeopleTool, handler: listGroupPeople },
  ],
};
