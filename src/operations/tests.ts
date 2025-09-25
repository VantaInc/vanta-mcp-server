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
const TestsInput = createConsolidatedSchema({
  paramName: "testId",
  description:
    "Test ID to retrieve, e.g. 'test-123' or specific test identifier",
  resourceName: "test",
});

const ListTestEntitiesInput = createIdWithPaginationSchema({
  paramName: "testId",
  description:
    "Test ID to get entities for, e.g. 'test-123' or specific test identifier",
});

// 3. Tool Definitions
export const TestsTool: Tool<typeof TestsInput> = {
  name: "tests",
  description:
    "Access security tests in your Vanta account. Provide testId to get a specific test, or omit to list all tests. Returns test IDs, names, types, schedules, current status, and detailed configuration for compliance monitoring.",
  parameters: TestsInput,
};

export const ListTestEntitiesTool: Tool<typeof ListTestEntitiesInput> = {
  name: "list_test_entities",
  description:
    "List a test's entities. Get all entities (resources) that are being tested by a specific security test. Use this when you know a test ID and want to see which specific resources (servers, applications, databases, etc.) are being validated for compliance by that test.",
  parameters: ListTestEntitiesInput,
};

// 4. Implementation Functions
export async function tests(
  args: z.infer<typeof TestsInput>,
): Promise<CallToolResult> {
  return makeConsolidatedRequest("/v1/tests", args, "testId");
}

export async function listTestEntities(
  args: z.infer<typeof ListTestEntitiesInput>,
): Promise<CallToolResult> {
  const { testId, ...params } = args;
  const url = buildUrl(`/v1/tests/${String(testId)}/entities`, params);
  const response = await makeAuthenticatedRequest(url);
  return handleApiResponse(response);
}

// Registry export for automated tool registration
export default {
  tools: [
    { tool: TestsTool, handler: tests },
    { tool: ListTestEntitiesTool, handler: listTestEntities },
  ],
};
