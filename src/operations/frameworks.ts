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
  FRAMEWORK_ID_DESCRIPTION,
} from "./common/imports.js";

// 2. Input Schemas
const FrameworksInput = createConsolidatedSchema({
  paramName: "frameworkId",
  description: FRAMEWORK_ID_DESCRIPTION,
  resourceName: "framework",
});

const ListFrameworkControlsInput = createIdWithPaginationSchema({
  paramName: "frameworkId",
  description: FRAMEWORK_ID_DESCRIPTION,
});

// 3. Tool Definitions
export const FrameworksTool: Tool<typeof FrameworksInput> = {
  name: "frameworks",
  description:
    "Access compliance frameworks in your Vanta account. Provide frameworkId to get a specific framework, or omit to list all frameworks. Returns frameworks (SOC 2, ISO 27001, HIPAA, GDPR, etc.) with completion status and progress metrics.",
  parameters: FrameworksInput,
};

export const ListFrameworkControlsTool: Tool<
  typeof ListFrameworkControlsInput
> = {
  name: "list_framework_controls",
  description:
    "List framework's controls. Get detailed security control requirements for a specific compliance framework. Returns the specific controls, their descriptions, implementation guidance, and current compliance status.",
  parameters: ListFrameworkControlsInput,
};

// 4. Implementation Functions
export async function frameworks(
  args: z.infer<typeof FrameworksInput>,
): Promise<CallToolResult> {
  return makeConsolidatedRequest("/v1/frameworks", args, "frameworkId");
}

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

// Registry export for automated tool registration
export default {
  tools: [
    { tool: FrameworksTool, handler: frameworks },
    { tool: ListFrameworkControlsTool, handler: listFrameworkControls },
  ],
};
