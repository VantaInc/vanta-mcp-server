// 1. Imports
import {
  CallToolResult,
  Tool,
  z,
  createPaginationSchema,
  createIdSchema,
  makePaginatedGetRequest,
  makeGetByIdRequest,
} from "./common/imports.js";

// 2. Input Schemas
const ListPeopleInput = createPaginationSchema();

const GetPersonInput = createIdSchema({
  paramName: "personId",
  description:
    "Person ID to retrieve, e.g. 'person-123' or specific person identifier",
});

// 3. Tool Definitions
export const ListPeopleTool: Tool<typeof ListPeopleInput> = {
  name: "list_people",
  description:
    "List all people in your Vanta account. Returns person IDs, names, email addresses, and metadata for organizational structure and access management. Use this to see all people in your organization for compliance and security management.",
  parameters: ListPeopleInput,
};

export const GetPersonTool: Tool<typeof GetPersonInput> = {
  name: "get_person",
  description:
    "Get person by ID. Retrieve detailed information about a specific person when their ID is known. The ID of a person can be found from get_people response. Returns complete person details including name, email, role, group memberships, and access permissions.",
  parameters: GetPersonInput,
};

// 4. Implementation Functions
export async function listPeople(
  args: z.infer<typeof ListPeopleInput>,
): Promise<CallToolResult> {
  return makePaginatedGetRequest("/v1/people", args);
}

export async function getPerson(
  args: z.infer<typeof GetPersonInput>,
): Promise<CallToolResult> {
  return makeGetByIdRequest("/v1/people", args.personId);
}

// Registry export for automated tool registration
export default {
  tools: [
    { tool: ListPeopleTool, handler: listPeople },
    { tool: GetPersonTool, handler: getPerson },
  ],
};
