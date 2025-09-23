import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { baseApiUrl } from "../api.js";
import { Tool } from "../types.js";
import { z } from "zod";
import { makeAuthenticatedRequest } from "./utils.js";
import {
  PAGE_SIZE_DESCRIPTION,
  PAGE_CURSOR_DESCRIPTION,
} from "./global-descriptions.js";

const GetPeopleInput = z.object({
  pageSize: z.number().describe(PAGE_SIZE_DESCRIPTION).optional(),
  pageCursor: z.string().describe(PAGE_CURSOR_DESCRIPTION).optional(),
});

export const GetPeopleTool: Tool<typeof GetPeopleInput> = {
  name: "get_people",
  description:
    "List all people in your Vanta account. Returns person IDs, names, email addresses, and metadata for organizational structure and access management. Use this to see all people in your organization for compliance and security management.",
  parameters: GetPeopleInput,
};

const GetPersonByIdInput = z.object({
  personId: z
    .string()
    .describe(
      "Person ID to retrieve, e.g. 'person-123' or specific person identifier",
    ),
});

export const GetPersonByIdTool: Tool<typeof GetPersonByIdInput> = {
  name: "get_person_by_id",
  description:
    "Get person by ID. Retrieve detailed information about a specific person when their ID is known. The ID of a person can be found from get_people response. Returns complete person details including name, email, role, group memberships, and access permissions.",
  parameters: GetPersonByIdInput,
};

export async function getPeople(
  args: z.infer<typeof GetPeopleInput>,
): Promise<CallToolResult> {
  const url = new URL("/v1/people", baseApiUrl());

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

export async function getPersonById(
  args: z.infer<typeof GetPersonByIdInput>,
): Promise<CallToolResult> {
  const url = new URL(`/v1/people/${args.personId}`, baseApiUrl());

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
