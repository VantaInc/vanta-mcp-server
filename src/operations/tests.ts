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
const ListTestEntitiesInput = createIdWithPaginationSchema({
  paramName: "testId",
  description:
    "Test ID to get entities for, e.g. 'test-123' or specific test identifier",
});

const ListTestsInput = createPaginationSchema();

const GetTestInput = createIdSchema({
  paramName: "testId",
  description:
    "Test ID to retrieve, e.g. 'test-123' or specific test identifier",
});

// 3. Tool Definitions
export const ListTestEntitiesTool: Tool<typeof ListTestEntitiesInput> = {
  name: "list_test_entities",
  description:
    "List a test's entities. Get all entities (resources) that are being tested by a specific security test. Use this when you know a test ID and want to see which specific resources (servers, applications, databases, etc.) are being validated for compliance by that test.",
  parameters: ListTestEntitiesInput,
};

export const ListTestsTool: Tool<typeof ListTestsInput> = {
  name: "list_tests",
  description:
    "List all security tests configured in your Vanta account. Returns test IDs, names, types, schedules, and current status for compliance monitoring. Use this to see all automated and manual tests running for your security controls.",
  parameters: ListTestsInput,
};

export const GetTestTool: Tool<typeof GetTestInput> = {
  name: "get_test",
  description:
    "Get test by ID. Retrieve detailed information about a specific security test when its ID is known. The ID of a test can be found from list_tests response. Returns complete test details including configuration, execution history, results, and associated controls.",
  parameters: GetTestInput,
};

// 4. Implementation Functions
export async function listTestEntities(
  args: z.infer<typeof ListTestEntitiesInput>,
): Promise<CallToolResult> {
  const { testId, ...params } = args;
  const url = buildUrl(`/v1/tests/${String(testId)}/entities`, params);
  const response = await makeAuthenticatedRequest(url);
  return handleApiResponse(response);
}

export async function listTests(
  args: z.infer<typeof ListTestsInput>,
): Promise<CallToolResult> {
  return makePaginatedGetRequest("/v1/tests", args);
}

export async function getTest(
  args: z.infer<typeof GetTestInput>,
): Promise<CallToolResult> {
  return makeGetByIdRequest("/v1/tests", args.testId);
}
