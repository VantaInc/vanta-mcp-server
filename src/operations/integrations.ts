// 1. Imports
import {
  CallToolResult,
  Tool,
  z,
  createConsolidatedSchema,
  makeConsolidatedRequest,
  makePaginatedGetRequest,
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

const IntegrationResourcesInput = z.object({
  integrationId: z.string().describe(INTEGRATION_ID_DESCRIPTION),
  operation: z
    .enum(["list_kinds", "get_kind_details", "list_resources", "get_resource"])
    .describe(
      "Integration resource operation: 'list_kinds' to get available resource types, 'get_kind_details' for schema information, 'list_resources' for all resources of a type, 'get_resource' for specific resource details",
    ),
  resourceKind: z
    .string()
    .describe(
      "Resource kind to operate on, e.g. 'EC2Instance' or specific resource kind identifier (required for get_kind_details, list_resources, get_resource)",
    )
    .optional(),
  resourceId: z
    .string()
    .describe(
      "Resource ID to retrieve, e.g. 'resource-123' or specific resource identifier (required for get_resource)",
    )
    .optional(),
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

// 3. Tool Definitions
export const IntegrationsTool: Tool<typeof IntegrationsInput> = {
  name: "integrations",
  description:
    "Access connected integrations in your Vanta account. Provide integrationId to get a specific integration, or omit to list all integrations. Returns integration details, supported resource kinds, and connection status for compliance monitoring.",
  parameters: IntegrationsInput,
};

export const IntegrationResourcesTool: Tool<typeof IntegrationResourcesInput> =
  {
    name: "integration_resources",
    description:
      "Access integration resources including resource kinds, resource kind details, and specific resources. Specify operation to perform: 'list_kinds' for available resource types, 'get_kind_details' for schema information, 'list_resources' for all resources of a type, or 'get_resource' for specific resource details.",
    parameters: IntegrationResourcesInput,
  };

// 4. Implementation Functions
export async function integrations(
  args: z.infer<typeof IntegrationsInput>,
): Promise<CallToolResult> {
  return makeConsolidatedRequest("/v1/integrations", args, "integrationId");
}

export async function integrationResources(
  args: z.infer<typeof IntegrationResourcesInput>,
): Promise<CallToolResult> {
  const { integrationId, operation, resourceKind, resourceId, ...params } =
    args;

  switch (operation) {
    case "list_kinds": {
      return makePaginatedGetRequest(
        `/v1/integrations/${String(integrationId)}/resource-kinds`,
        params,
      );
    }

    case "get_kind_details": {
      if (!resourceKind) {
        return {
          content: [
            {
              type: "text",
              text: "Error: resourceKind is required for get_kind_details operation",
            },
          ],
          isError: true,
        };
      }
      const kindUrl = buildUrl(
        `/v1/integrations/${String(integrationId)}/resource-kinds/${String(resourceKind)}`,
      );
      const kindResponse = await makeAuthenticatedRequest(kindUrl);
      return handleApiResponse(kindResponse);
    }

    case "list_resources": {
      if (!resourceKind) {
        return {
          content: [
            {
              type: "text",
              text: "Error: resourceKind is required for list_resources operation",
            },
          ],
          isError: true,
        };
      }
      return makePaginatedGetRequest(
        `/v1/integrations/${String(integrationId)}/resource-kinds/${String(resourceKind)}/resources`,
        params,
      );
    }

    case "get_resource": {
      if (!resourceKind || !resourceId) {
        return {
          content: [
            {
              type: "text",
              text: "Error: both resourceKind and resourceId are required for get_resource operation",
            },
          ],
          isError: true,
        };
      }
      const resourceUrl = buildUrl(
        `/v1/integrations/${String(integrationId)}/resource-kinds/${String(resourceKind)}/resources/${String(resourceId)}`,
      );
      const resourceResponse = await makeAuthenticatedRequest(resourceUrl);
      return handleApiResponse(resourceResponse);
    }

    default: {
      return {
        content: [
          {
            type: "text",
            text: `Error: Invalid operation '${operation as string}'. Must be one of: list_kinds, get_kind_details, list_resources, get_resource`,
          },
        ],
        isError: true,
      };
    }
  }
}

// Registry export for automated tool registration
export default {
  tools: [
    { tool: IntegrationsTool, handler: integrations },
    { tool: IntegrationResourcesTool, handler: integrationResources },
  ],
};
