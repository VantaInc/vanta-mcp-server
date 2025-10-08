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
  CONTROL_ID_DESCRIPTION,
} from "./common/imports.js";

// 2. Input Schemas
const ControlsInput = createConsolidatedSchema(
  {
    paramName: "controlId",
    description: CONTROL_ID_DESCRIPTION,
    resourceName: "control",
  },
  {
    frameworkMatchesAny: z
      .array(z.string())
      .describe(
        "Filter controls by framework IDs. Returns controls that belong to any of the specified frameworks, e.g. ['soc2', 'iso27001', 'hipaa']",
      )
      .optional(),
  },
);

const ListControlTestsInput = createIdWithPaginationSchema({
  paramName: "controlId",
  description: CONTROL_ID_DESCRIPTION,
});

const ListLibraryControlsInput = createIdWithPaginationSchema({
  paramName: "controlId",
  description: CONTROL_ID_DESCRIPTION,
});

const ListControlDocumentsInput = createIdWithPaginationSchema({
  paramName: "controlId",
  description: CONTROL_ID_DESCRIPTION,
});

// 3. Tool Definitions
export const ControlsTool: Tool<typeof ControlsInput> = {
  name: "controls",
  description:
    "Access security controls in your Vanta account. Provide controlId to get a specific control, or omit to list all controls with optional framework filtering. Returns control names, descriptions, framework mappings, and implementation status.",
  parameters: ControlsInput,
};

export const ListControlTestsTool: Tool<typeof ListControlTestsInput> = {
  name: "list_control_tests",
  description:
    "List control tests. Get all automated tests that validate a specific security control. Use this when you know a control ID and want to see which specific tests monitor compliance for that control.",
  parameters: ListControlTestsInput,
};

export const ListLibraryControlsTool: Tool<typeof ListLibraryControlsInput> = {
  name: "list_library_controls",
  description:
    "List Vanta controls from the library. These are pre-built security controls available in Vanta's control library that can be added to your account.",
  parameters: ListLibraryControlsInput,
};

export const ListControlDocumentsTool: Tool<typeof ListControlDocumentsInput> =
  {
    name: "list_control_documents",
    description:
      "List a control's documents. Get all documents that are associated with or provide evidence for a specific security control.",
    parameters: ListControlDocumentsInput,
  };

// 4. Implementation Functions
export async function controls(
  args: z.infer<typeof ControlsInput>,
): Promise<CallToolResult> {
  return makeConsolidatedRequest("/v1/controls", args, "controlId");
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
  const { controlId, ...params } = args;
  const url = buildUrl(`/v1/library-controls/${String(controlId)}`, params);
  const response = await makeAuthenticatedRequest(url);
  return handleApiResponse(response);
}

export async function listControlDocuments(
  args: z.infer<typeof ListControlDocumentsInput>,
): Promise<CallToolResult> {
  const { controlId, ...params } = args;
  const url = buildUrl(`/v1/controls/${String(controlId)}/documents`, params);
  const response = await makeAuthenticatedRequest(url);
  return handleApiResponse(response);
}

// Registry export for automated tool registration
export default {
  tools: [
    { tool: ControlsTool, handler: controls },
    { tool: ListControlTestsTool, handler: listControlTests },
    { tool: ListLibraryControlsTool, handler: listLibraryControls },
    { tool: ListControlDocumentsTool, handler: listControlDocuments },
  ],
};
