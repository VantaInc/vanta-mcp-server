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
import { CONTROL_ID_DESCRIPTION } from "./global-descriptions.js";

// 2. Input Schemas
const ListControlsInput = createPaginationSchema().extend({
  frameworkMatchesAny: z
    .array(z.string())
    .describe(
      "Filter controls by framework IDs. Returns controls that belong to any of the specified frameworks, e.g. ['soc2', 'iso27001', 'hipaa']",
    )
    .optional(),
});

const ListControlTestsInput = createIdWithPaginationSchema({
  paramName: "controlId",
  description: CONTROL_ID_DESCRIPTION,
});

const ListLibraryControlsInput = createPaginationSchema();

const ListControlDocumentsInput = createIdWithPaginationSchema({
  paramName: "controlId",
  description: CONTROL_ID_DESCRIPTION,
});

const GetControlInput = createIdSchema({
  paramName: "controlId",
  description: CONTROL_ID_DESCRIPTION,
});

// 3. Tool Definitions
export const ListControlsTool: Tool<typeof ListControlsInput> = {
  name: "list_controls",
  description:
    "List all security controls across all frameworks in your Vanta account. Returns control names, descriptions, framework mappings, and current implementation status. Use this to see all available controls or to find a specific control ID for use with other tools. Optionally filter by specific frameworks using frameworkMatchesAny.",
  parameters: ListControlsInput,
};

export const ListControlTestsTool: Tool<typeof ListControlTestsInput> = {
  name: "list_control_tests",
  description:
    "List a control's tests. Get all automated tests that validate a specific security control. Use this when you know a control ID and want to see which specific tests monitor compliance for that control. Returns test details, current status, and any failing entities for the control's tests.",
  parameters: ListControlTestsInput,
};

export const ListLibraryControlsTool: Tool<typeof ListLibraryControlsInput> = {
  name: "list_library_controls",
  description:
    "List Vanta controls from the library. These are pre-built security controls available in Vanta's control library that can be added to your account. Different from list_controls which lists controls already in your account - this shows available controls you can implement.",
  parameters: ListLibraryControlsInput,
};

export const ListControlDocumentsTool: Tool<typeof ListControlDocumentsInput> =
  {
    name: "list_control_documents",
    description:
      "List a control's documents. Get all documents that are associated with or provide evidence for a specific security control. Use this when you know a control ID and want to see which documents are mapped to that control for compliance evidence.",
    parameters: ListControlDocumentsInput,
  };

export const GetControlTool: Tool<typeof GetControlInput> = {
  name: "get_control",
  description:
    "Get control by an ID. Retrieve detailed information about a specific security control when its ID is known. The ID of a control can be found from list_controls or list_framework_controls responses. Returns complete control details including name, description, framework mappings, and implementation status.",
  parameters: GetControlInput,
};

// 4. Implementation Functions
export async function listControls(
  args: z.infer<typeof ListControlsInput>,
): Promise<CallToolResult> {
  return makePaginatedGetRequest("/v1/controls", args);
}

export async function listControlTests(
  args: z.infer<typeof ListControlTestsInput>,
): Promise<CallToolResult> {
  const { controlId, ...params } = args;
  const url = buildUrl(`/v1/controls/${String(controlId)}/tests`, params);
  const response = await makeAuthenticatedRequest(url);
  return handleApiResponse(response);
}

export async function listLibraryControls(
  args: z.infer<typeof ListLibraryControlsInput>,
): Promise<CallToolResult> {
  return makePaginatedGetRequest("/v1/controls/controls-library", args);
}

export async function listControlDocuments(
  args: z.infer<typeof ListControlDocumentsInput>,
): Promise<CallToolResult> {
  const { controlId, ...params } = args;
  const url = buildUrl(`/v1/controls/${String(controlId)}/documents`, params);
  const response = await makeAuthenticatedRequest(url);
  return handleApiResponse(response);
}

export async function getControl(
  args: z.infer<typeof GetControlInput>,
): Promise<CallToolResult> {
  return makeGetByIdRequest("/v1/controls", args.controlId);
}

// Registry export for automated tool registration
export default {
  tools: [
    { tool: ListControlsTool, handler: listControls },
    { tool: ListControlTestsTool, handler: listControlTests },
    { tool: ListLibraryControlsTool, handler: listLibraryControls },
    { tool: ListControlDocumentsTool, handler: listControlDocuments },
    { tool: GetControlTool, handler: getControl },
  ],
};
