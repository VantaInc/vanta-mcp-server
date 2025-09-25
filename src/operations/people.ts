// 1. Imports
import {
  CallToolResult,
  Tool,
  z,
  createConsolidatedSchema,
  makeConsolidatedRequest,
} from "./common/imports.js";

// 2. Input Schemas
const PeopleInput = createConsolidatedSchema({
  paramName: "personId",
  description:
    "Person ID to retrieve, e.g. 'person-123' or specific person identifier",
  resourceName: "person",
});

// 3. Tool Definitions
export const PeopleTool: Tool<typeof PeopleInput> = {
  name: "people",
  description:
    "Access people in your Vanta account. Provide personId to get a specific person, or omit to list all people. Returns person IDs, names, email addresses, and organizational information for identity and access management.",
  parameters: PeopleInput,
};

// 4. Implementation Functions
export async function people(
  args: z.infer<typeof PeopleInput>,
): Promise<CallToolResult> {
  return makeConsolidatedRequest("/v1/people", args, "personId");
}

// Registry export for automated tool registration
export default {
  tools: [{ tool: PeopleTool, handler: people }],
};
