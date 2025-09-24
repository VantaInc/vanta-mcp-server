import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { baseApiUrl } from "../api.js";
import { Tool } from "../types.js";
import { z } from "zod";
import { makeAuthenticatedRequest } from "./utils.js";
import {
  PAGE_SIZE_DESCRIPTION,
  PAGE_CURSOR_DESCRIPTION,
} from "./global-descriptions.js";

const ListGroupsInput = z.object({
  pageSize: z.number().describe(PAGE_SIZE_DESCRIPTION).optional(),
  pageCursor: z.string().describe(PAGE_CURSOR_DESCRIPTION).optional(),
});

export const ListGroupsTool: Tool<typeof ListGroupsInput> = {
  name: "list_groups",
  description:
    "List all groups in your Vanta account. Returns group IDs, names, descriptions, and metadata for organizational structure and access management. Use this to see all groups available for people assignment and access control.",
  parameters: ListGroupsInput,
};

const GetGroupInput = z.object({
  groupId: z
    .string()
    .describe(
      "Group ID to retrieve, e.g. 'group-123' or specific group identifier",
    ),
});

export const GetGroupTool: Tool<typeof GetGroupInput> = {
  name: "get_group",
  description:
    "Get group by ID. Retrieve detailed information about a specific group when its ID is known. The ID of a group can be found from get_groups response. Returns complete group details including name, description, member count, and access permissions.",
  parameters: GetGroupInput,
};

const ListGroupPeopleInput = z.object({
  groupId: z
    .string()
    .describe(
      "Group ID to get people for, e.g. 'group-123' or specific group identifier",
    ),
  pageSize: z.number().describe(PAGE_SIZE_DESCRIPTION).optional(),
  pageCursor: z.string().describe(PAGE_CURSOR_DESCRIPTION).optional(),
});

export const ListGroupPeopleTool: Tool<typeof ListGroupPeopleInput> = {
  name: "list_group_people",
  description:
    "List people in a group. Get all people who are members of a specific group for organizational structure and access management. Use this to understand group membership and review who has group-based access permissions.",
  parameters: ListGroupPeopleInput,
};

export async function listGroups(
  args: z.infer<typeof ListGroupsInput>,
): Promise<CallToolResult> {
  const url = new URL("/v1/groups", baseApiUrl());

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

export async function getGroup(
  args: z.infer<typeof GetGroupInput>,
): Promise<CallToolResult> {
  const url = new URL(`/v1/groups/${args.groupId}`, baseApiUrl());

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

export async function listGroupPeople(
  args: z.infer<typeof ListGroupPeopleInput>,
): Promise<CallToolResult> {
  const url = new URL(`/v1/groups/${args.groupId}/people`, baseApiUrl());

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
