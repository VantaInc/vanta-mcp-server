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
import { FRAMEWORK_ID_DESCRIPTION } from "./global-descriptions.js";

// 2. Input Schemas
const ListFrameworksInput = createPaginationSchema();

const ListFrameworkControlsInput = createIdWithPaginationSchema({
  paramName: "frameworkId",
  description: FRAMEWORK_ID_DESCRIPTION,
});

const GetFrameworkInput = createIdSchema({
  paramName: "frameworkId",
  description: FRAMEWORK_ID_DESCRIPTION,
});

// 3. Tool Definitions
export const ListFrameworksTool: Tool<typeof ListFrameworksInput> = {
  name: "list_frameworks",
  description:
    "List all compliance frameworks available in your Vanta account (SOC 2, ISO 27001, HIPAA, GDPR, FedRAMP, PCI, etc.) along with completion status and progress metrics. Shows which frameworks you're actively pursuing and their current compliance state including status of controls, documents, and tests for each framework.",
  parameters: ListFrameworksInput,
};

export const ListFrameworkControlsTool: Tool<
  typeof ListFrameworkControlsInput
> = {
  name: "list_framework_controls",
  description:
    "Get the detailed CONTROL REQUIREMENTS for a specific framework (requires frameworkId). Use this when you need the specific control details, requirements, and implementation guidance for a known framework like 'soc2' or 'iso27001'. This returns the actual security controls and their descriptions, NOT the framework list. Use list_frameworks first if you need to see available frameworks.",
  parameters: ListFrameworkControlsInput,
};

export const GetFrameworkTool: Tool<typeof GetFrameworkInput> = {
  name: "get_framework",
  description:
    "Get framework by ID. Retrieve detailed information about a specific compliance framework when its ID is known. The ID of a framework can be found from list_frameworks response. Returns complete framework details including description, requirements, completion status, and associated controls.",
  parameters: GetFrameworkInput,
};

// 4. Implementation Functions
export async function listFrameworkControls(
  args: z.infer<typeof ListFrameworkControlsInput>,
): Promise<CallToolResult> {
  const { frameworkId, ...params } = args;
  const url = buildUrl(
    `/v1/frameworks/${String(frameworkId)}/controls`,
    params,
  );
  const response = await makeAuthenticatedRequest(url);
  return handleApiResponse(response);
}

export async function listFrameworks(
  args: z.infer<typeof ListFrameworksInput>,
): Promise<CallToolResult> {
  return makePaginatedGetRequest("/v1/frameworks", args);
}

export async function getFramework(
  args: z.infer<typeof GetFrameworkInput>,
): Promise<CallToolResult> {
  return makeGetByIdRequest("/v1/frameworks", args.frameworkId);
}
