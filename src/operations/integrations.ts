// 1. Imports
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { Tool } from "../types.js";
import { z } from "zod";
import {
  createPaginationSchema,
  createIdSchema,
  makePaginatedGetRequest,
  makeGetByIdRequest,
  buildUrl,
  makeAuthenticatedRequest,
  handleApiResponse,
} from "./utils.js";
import { INTEGRATION_ID_DESCRIPTION } from "./global-descriptions.js";

// 2. Input Schemas
const ListIntegrationsInput = createPaginationSchema();

const GetIntegrationInput = createIdSchema({
  paramName: "integrationId",
  description: INTEGRATION_ID_DESCRIPTION,
});

const ListIntegrationResourceKindsInput = z.object({
  integrationId: z.string().describe(INTEGRATION_ID_DESCRIPTION),
  ...createPaginationSchema().shape,
});

const GetIntegrationResourceKindDetailsInput = z.object({
  integrationId: z.string().describe(INTEGRATION_ID_DESCRIPTION),
  resourceKind: z
    .string()
    .describe(
      "Resource kind to get details for, e.g. 'S3Bucket', 'CloudwatchLogGroup'",
    ),
});

const ListIntegrationResourcesInput = z.object({
  integrationId: z.string().describe(INTEGRATION_ID_DESCRIPTION),
  resourceKind: z
    .string()
    .describe(
      "Resource kind to list resources for, e.g. 'S3Bucket', 'CloudwatchLogGroup'",
    ),
  ...createPaginationSchema().shape,
});

const GetIntegrationResourceInput = z.object({
  integrationId: z.string().describe(INTEGRATION_ID_DESCRIPTION),
  resourceKind: z
    .string()
    .describe(
      "Resource kind to get resource from, e.g. 'S3Bucket', 'CloudwatchLogGroup'",
    ),
  resourceId: z
    .string()
    .describe(
      "Resource ID to get details for, e.g. 'i-1234567890abcdef0', 'bucket-name'",
    ),
});

// 3. Tool Definitions
export const ListIntegrationsTool: Tool<typeof ListIntegrationsInput> = {
  name: "list_integrations",
  description:
    "List all connected integrations in your Vanta account. Returns integration id, display name, resource kinds supported by the integration, and how many connections exist for such integration. Use this to see all integrations connected in your Vanta instance.",
  parameters: ListIntegrationsInput,
};

export const GetIntegrationTool: Tool<typeof GetIntegrationInput> = {
  name: "get_integration",
  description:
    "Get integration by ID. Retrieve detailed information about a specific integration when its ID is known. The ID of an integration can be found from get_integrations response. Returns complete integration details including configuration, resource kinds, and connection status.",
  parameters: GetIntegrationInput,
};

export const ListIntegrationResourceKindsTool: Tool<
  typeof ListIntegrationResourceKindsInput
> = {
  name: "list_integration_resource_kinds",
  description:
    "List integration resource kinds. Lists a connected integration's resource types (kinds) such as S3Bucket, CloudwatchLogGroup, etc. Use this to see what types of resources an integration can monitor.",
  parameters: ListIntegrationResourceKindsInput,
};

export const GetIntegrationResourceKindDetailsTool: Tool<
  typeof GetIntegrationResourceKindDetailsInput
> = {
  name: "get_integration_resource_kind_details",
  description:
    "Get details for resource kind. Gets details for a specific resource type (kind) such as S3Bucket or CloudwatchLogGroup for a specific integration. Use this to understand what properties and metadata are available for a resource type.",
  parameters: GetIntegrationResourceKindDetailsInput,
};

export const ListIntegrationResourcesTool: Tool<
  typeof ListIntegrationResourcesInput
> = {
  name: "list_integration_resources",
  description:
    "List resources for a specific resource kind. List all resources of a specific type (kind) discovered by an integration. Use this to see all infrastructure resources of a particular type that Vanta is monitoring through an integration.",
  parameters: ListIntegrationResourcesInput,
};

export const GetIntegrationResourceTool: Tool<
  typeof GetIntegrationResourceInput
> = {
  name: "get_integration_resource",
  description:
    "Get resource by ID within a specific resource kind. Retrieve detailed information about a specific resource of a particular type discovered by an integration. Use this to get full details about infrastructure resources including metadata, compliance status, and configuration.",
  parameters: GetIntegrationResourceInput,
};

// 4. Implementation Functions
export async function listIntegrations(
  args: z.infer<typeof ListIntegrationsInput>,
): Promise<CallToolResult> {
  return makePaginatedGetRequest("/v1/integrations", args);
}

export async function getIntegration(
  args: z.infer<typeof GetIntegrationInput>,
): Promise<CallToolResult> {
  return makeGetByIdRequest("/v1/integrations", args.integrationId);
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
    { tool: ListIntegrationsTool, handler: listIntegrations },
    { tool: GetIntegrationTool, handler: getIntegration },
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
