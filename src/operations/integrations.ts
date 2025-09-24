import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { baseApiUrl } from "../api.js";
import { Tool } from "../types.js";
import { z } from "zod";
import { makeAuthenticatedRequest } from "./utils.js";
import {
  PAGE_SIZE_DESCRIPTION,
  PAGE_CURSOR_DESCRIPTION,
  INTEGRATION_ID_DESCRIPTION,
} from "./global-descriptions.js";

const GetIntegrationsInput = z.object({
  pageSize: z.number().describe(PAGE_SIZE_DESCRIPTION).optional(),
  pageCursor: z.string().describe(PAGE_CURSOR_DESCRIPTION).optional(),
});

export const GetIntegrationsTool: Tool<typeof GetIntegrationsInput> = {
  name: "get_integrations",
  description:
    "List all connected integrations in your Vanta account. Returns integration id, display name, resource kinds supported by the integration, and how many connections exist for such integration. Use this to see all integrations connected in your Vanta instance.",
  parameters: GetIntegrationsInput,
};

const GetIntegrationByIdInput = z.object({
  integrationId: z.string().describe(INTEGRATION_ID_DESCRIPTION),
});

export const GetIntegrationByIdTool: Tool<typeof GetIntegrationByIdInput> = {
  name: "get_integration_by_id",
  description:
    "Get integration by ID. Retrieve detailed information about a specific integration when its ID is known. The ID of an integration can be found from get_integrations response. Returns complete integration details including configuration, resource kinds, and connection status.",
  parameters: GetIntegrationByIdInput,
};

const GetIntegrationResourceKindsInput = z.object({
  integrationId: z.string().describe(INTEGRATION_ID_DESCRIPTION),
  pageSize: z.number().describe(PAGE_SIZE_DESCRIPTION).optional(),
  pageCursor: z.string().describe(PAGE_CURSOR_DESCRIPTION).optional(),
});

export const GetIntegrationResourceKindsTool: Tool<
  typeof GetIntegrationResourceKindsInput
> = {
  name: "get_integration_resource_kinds",
  description:
    "List integration resource kinds. Lists a connected integration's resource types (kinds) such as S3Bucket, CloudwatchLogGroup, etc. Use this to see what types of resources an integration can monitor.",
  parameters: GetIntegrationResourceKindsInput,
};

const GetIntegrationResourceKindDetailsInput = z.object({
  integrationId: z.string().describe(INTEGRATION_ID_DESCRIPTION),
  resourceKind: z
    .string()
    .describe(
      "Resource kind to get details for, e.g. 'S3Bucket', 'CloudwatchLogGroup'",
    ),
});

export const GetIntegrationResourceKindDetailsTool: Tool<
  typeof GetIntegrationResourceKindDetailsInput
> = {
  name: "get_integration_resource_kind_details",
  description:
    "Get details for resource kind. Gets details for a specific resource type (kind) such as S3Bucket or CloudwatchLogGroup for a specific integration. Use this to understand what properties and metadata are available for a resource type.",
  parameters: GetIntegrationResourceKindDetailsInput,
};

const GetIntegrationResourcesInput = z.object({
  integrationId: z.string().describe(INTEGRATION_ID_DESCRIPTION),
  pageSize: z.number().describe(PAGE_SIZE_DESCRIPTION).optional(),
  pageCursor: z.string().describe(PAGE_CURSOR_DESCRIPTION).optional(),
});

export const GetIntegrationResourcesTool: Tool<
  typeof GetIntegrationResourcesInput
> = {
  name: "get_integration_resources",
  description:
    "List resources. List all resources discovered by a specific integration. Use this to see all infrastructure resources that Vanta is monitoring through an integration.",
  parameters: GetIntegrationResourcesInput,
};

const GetIntegrationResourceByIdInput = z.object({
  integrationId: z.string().describe(INTEGRATION_ID_DESCRIPTION),
  resourceId: z
    .string()
    .describe(
      "Resource ID to get details for, e.g. 'i-1234567890abcdef0', 'bucket-name'",
    ),
});

export const GetIntegrationResourceByIdTool: Tool<
  typeof GetIntegrationResourceByIdInput
> = {
  name: "get_integration_resource_by_id",
  description:
    "Get resource by ID. Retrieve detailed information about a specific resource discovered by an integration. Use this to get full details about infrastructure resources including metadata, compliance status, and configuration.",
  parameters: GetIntegrationResourceByIdInput,
};

export async function getIntegrations(
  args: z.infer<typeof GetIntegrationsInput>,
): Promise<CallToolResult> {
  const url = new URL("/v1/integrations", baseApiUrl());

  if (args.pageSize !== undefined) {
    url.searchParams.append("pageSize", args.pageSize.toString());
  }
  if (args.pageCursor !== undefined) {
    url.searchParams.append("pageCursor", args.pageCursor);
  }

  const response = await makeAuthenticatedRequest(url.toString());

  if (!response.ok) {
    return {
      content: [
        {
          type: "text" as const,
          text: `Error: ${response.statusText}`,
        },
      ],
    };
  }

  return {
    content: [
      { type: "text" as const, text: JSON.stringify(await response.json()) },
    ],
  };
}

export async function getIntegrationById(
  args: z.infer<typeof GetIntegrationByIdInput>,
): Promise<CallToolResult> {
  const url = new URL(`/v1/integrations/${args.integrationId}`, baseApiUrl());

  const response = await makeAuthenticatedRequest(url.toString());

  if (!response.ok) {
    return {
      content: [
        {
          type: "text" as const,
          text: `Error: ${response.statusText}`,
        },
      ],
    };
  }

  return {
    content: [
      { type: "text" as const, text: JSON.stringify(await response.json()) },
    ],
  };
}

export async function getIntegrationResourceKinds(
  args: z.infer<typeof GetIntegrationResourceKindsInput>,
): Promise<CallToolResult> {
  const url = new URL(
    `/v1/integrations/${args.integrationId}/resource-kinds`,
    baseApiUrl(),
  );

  if (args.pageSize !== undefined) {
    url.searchParams.append("pageSize", args.pageSize.toString());
  }
  if (args.pageCursor !== undefined) {
    url.searchParams.append("pageCursor", args.pageCursor);
  }

  const response = await makeAuthenticatedRequest(url.toString());

  if (!response.ok) {
    return {
      content: [
        {
          type: "text" as const,
          text: `Error: ${response.statusText}`,
        },
      ],
    };
  }

  return {
    content: [
      { type: "text" as const, text: JSON.stringify(await response.json()) },
    ],
  };
}

export async function getIntegrationResourceKindDetails(
  args: z.infer<typeof GetIntegrationResourceKindDetailsInput>,
): Promise<CallToolResult> {
  const url = new URL(
    `/v1/integrations/${args.integrationId}/resource-kinds/${args.resourceKind}`,
    baseApiUrl(),
  );

  const response = await makeAuthenticatedRequest(url.toString());

  if (!response.ok) {
    return {
      content: [
        {
          type: "text" as const,
          text: `Error: ${response.statusText}`,
        },
      ],
    };
  }

  return {
    content: [
      { type: "text" as const, text: JSON.stringify(await response.json()) },
    ],
  };
}

export async function getIntegrationResources(
  args: z.infer<typeof GetIntegrationResourcesInput>,
): Promise<CallToolResult> {
  const url = new URL(
    `/v1/integrations/${args.integrationId}/resources`,
    baseApiUrl(),
  );

  if (args.pageSize !== undefined) {
    url.searchParams.append("pageSize", args.pageSize.toString());
  }
  if (args.pageCursor !== undefined) {
    url.searchParams.append("pageCursor", args.pageCursor);
  }

  const response = await makeAuthenticatedRequest(url.toString());

  if (!response.ok) {
    return {
      content: [
        {
          type: "text" as const,
          text: `Error: ${response.statusText}`,
        },
      ],
    };
  }

  return {
    content: [
      { type: "text" as const, text: JSON.stringify(await response.json()) },
    ],
  };
}

export async function getIntegrationResourceById(
  args: z.infer<typeof GetIntegrationResourceByIdInput>,
): Promise<CallToolResult> {
  const url = new URL(
    `/v1/integrations/${args.integrationId}/resources/${args.resourceId}`,
    baseApiUrl(),
  );

  const response = await makeAuthenticatedRequest(url.toString());

  if (!response.ok) {
    return {
      content: [
        {
          type: "text" as const,
          text: `Error: ${response.statusText}`,
        },
      ],
    };
  }

  return {
    content: [
      { type: "text" as const, text: JSON.stringify(await response.json()) },
    ],
  };
}
