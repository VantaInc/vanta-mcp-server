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
  INTEGRATION_ID_DESCRIPTION,
} from "./common/imports.js";

// 2. Input Schemas
const IntegrationsInput = createConsolidatedSchema({
  paramName: "integrationId",
  description: INTEGRATION_ID_DESCRIPTION,
  resourceName: "integration",
});

const ListIntegrationResourceKindsInput = createIdWithPaginationSchema({
  paramName: "integrationId",
  description: INTEGRATION_ID_DESCRIPTION,
});

const GetIntegrationResourceKindDetailsInput = z.object({
  integrationId: z.string().describe(INTEGRATION_ID_DESCRIPTION),
  resourceKind: z
    .string()
    .describe(
      "Resource kind to get details for, e.g. 'ec2-instances' or specific resource kind identifier",
    ),
});

const ListIntegrationResourcesInput = z.object({
  integrationId: z.string().describe(INTEGRATION_ID_DESCRIPTION),
  resourceKind: z
    .string()
    .describe(
      "Resource kind to list resources for, e.g. 'ec2-instances' or specific resource kind identifier",
    ),
  pageSize: z
    .number()
    .min(1)
    .max(100)
    .describe("Number of items to return per page (1-100)")
    .optional(),
  pageCursor: z
    .string()
    .describe("Cursor for pagination to get the next page of results")
    .optional(),
});

const GetIntegrationResourceInput = z.object({
  integrationId: z.string().describe(INTEGRATION_ID_DESCRIPTION),
  resourceKind: z
    .string()
    .describe(
      "Resource kind the resource belongs to, e.g. 'ec2-instances' or specific resource kind identifier",
    ),
  resourceId: z
    .string()
    .describe(
      "Resource ID to retrieve, e.g. 'resource-123' or specific resource identifier",
    ),
});

// 3. Tool Definitions
export const IntegrationsTool: Tool<typeof IntegrationsInput> = {
  name: "integrations",
  description:
    "Access connected integrations in your Vanta account. Provide integrationId to get a specific integration, or omit to list all integrations. Returns integration details, supported resource kinds, and connection status for compliance monitoring.",
  parameters: IntegrationsInput,
};

export const ListIntegrationResourceKindsTool: Tool<
  typeof ListIntegrationResourceKindsInput
> = {
  name: "list_integration_resource_kinds",
  description:
    "List integration's resource kinds. Get all resource types that are available through a specific integration. Use this to see what kinds of resources (EC2 instances, S3 buckets, etc.) can be monitored through an integration.",
  parameters: ListIntegrationResourceKindsInput,
};

export const GetIntegrationResourceKindDetailsTool: Tool<
  typeof GetIntegrationResourceKindDetailsInput
> = {
  name: "get_integration_resource_kind_details",
  description:
    "Get integration resource kind details. Get detailed information about a specific resource kind within an integration. Use this to understand the schema and available fields for a particular resource type.",
  parameters: GetIntegrationResourceKindDetailsInput,
};

export const ListIntegrationResourcesTool: Tool<
  typeof ListIntegrationResourcesInput
> = {
  name: "list_integration_resources",
  description:
    "List integration resources. Get all resources of a specific type within an integration. Use this to see all instances of a particular resource kind (like all EC2 instances) being monitored through an integration.",
  parameters: ListIntegrationResourcesInput,
};

export const GetIntegrationResourceTool: Tool<
  typeof GetIntegrationResourceInput
> = {
  name: "get_integration_resource",
  description:
    "Get integration resource by ID. Get detailed information about a specific resource within an integration. Use this to see the current state and attributes of a particular monitored resource.",
  parameters: GetIntegrationResourceInput,
};

// 4. Implementation Functions
export async function integrations(
  args: z.infer<typeof IntegrationsInput>,
): Promise<CallToolResult> {
  return makeConsolidatedRequest("/v1/integrations", args, "integrationId");
}

export async function listIntegrationResourceKinds(
  args: z.infer<typeof ListIntegrationResourceKindsInput>,
): Promise<CallToolResult> {
  const { integrationId, ...params } = args;
  const url = buildUrl(
    `/v1/integrations/${String(integrationId)}/resource-kinds`,
    params,
  );
  const response = await makeAuthenticatedRequest(url);
  return handleApiResponse(response);
}

export async function getIntegrationResourceKindDetails(
  args: z.infer<typeof GetIntegrationResourceKindDetailsInput>,
): Promise<CallToolResult> {
  const url = buildUrl(
    `/v1/integrations/${String(args.integrationId)}/resource-kinds/${String(args.resourceKind)}`,
  );
  const response = await makeAuthenticatedRequest(url);
  return handleApiResponse(response);
}

export async function listIntegrationResources(
  args: z.infer<typeof ListIntegrationResourcesInput>,
): Promise<CallToolResult> {
  const { integrationId, resourceKind, ...params } = args;
  const url = buildUrl(
    `/v1/integrations/${String(integrationId)}/resource-kinds/${String(resourceKind)}/resources`,
    params,
  );
  const response = await makeAuthenticatedRequest(url);
  return handleApiResponse(response);
}

export async function getIntegrationResource(
  args: z.infer<typeof GetIntegrationResourceInput>,
): Promise<CallToolResult> {
  const url = buildUrl(
    `/v1/integrations/${String(args.integrationId)}/resource-kinds/${String(args.resourceKind)}/resources/${String(args.resourceId)}`,
  );
  const response = await makeAuthenticatedRequest(url);
  return handleApiResponse(response);
}

// Registry export for automated tool registration
export default {
  tools: [
    { tool: IntegrationsTool, handler: integrations },
    {
      tool: ListIntegrationResourceKindsTool,
      handler: listIntegrationResourceKinds,
    },
    {
      tool: GetIntegrationResourceKindDetailsTool,
      handler: getIntegrationResourceKindDetails,
    },
    { tool: ListIntegrationResourcesTool, handler: listIntegrationResources },
    { tool: GetIntegrationResourceTool, handler: getIntegrationResource },
  ],
};
