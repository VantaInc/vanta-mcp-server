import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { baseApiUrl } from "../../api.js";
import {
  PAGE_SIZE_DESCRIPTION,
  PAGE_CURSOR_DESCRIPTION,
} from "./descriptions.js";
import { requestContext } from "../../server/request-context.js";

export function createAuthHeaders(): Record<string, string> {
  const context = requestContext.getStore();
  if (!context?.vantaToken) {
    throw new Error("No authentication context available");
  }

  return {
    "Authorization": `Bearer ${context.vantaToken}`,
    "x-vanta-is-mcp": "true",
  };
}

/**
 * Makes an authenticated HTTP request using a bearer token from the request context.
 * Token refresh is handled by the MCP client, not the server.
 */
export async function makeAuthenticatedRequest(
  url: string,
  options: RequestInit = {},
): Promise<Response> {
  const headers = createAuthHeaders();

  const requestOptions: RequestInit = {
    ...options,
    headers: {
      ...headers,
      ...options.headers,
    },
  };

  return fetch(url, requestOptions);
}

// ==========================================
// RESPONSE PROCESSING UTILITIES
// ==========================================

/**
 * Creates an error response with consistent formatting
 */
export function createErrorResponse(statusText: string): CallToolResult {
  return {
    content: [{ type: "text", text: `Error: ${statusText}` }],
    isError: true,
  };
}

/**
 * Creates a success response with JSON content
 */
export async function createSuccessResponse(
  response: Response,
): Promise<CallToolResult> {
  try {
    const jsonData: unknown = await response.json();
    return {
      content: [{ type: "text", text: JSON.stringify(jsonData, null, 2) }],
    };
  } catch (error) {
    return createErrorResponse(
      `Failed to parse JSON response: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}

/**
 * Handles API response consistently - either returns success or error
 */
export async function handleApiResponse(
  response: Response,
): Promise<CallToolResult> {
  if (!response.ok) {
    return createErrorResponse(response.statusText);
  }
  return createSuccessResponse(response);
}

// ==========================================
// SCHEMA FACTORY FUNCTIONS
// ==========================================

/**
 * Creates a standard pagination schema
 */
export function createPaginationSchema(
  customFields: Record<string, z.ZodTypeAny> = {},
): z.ZodObject<Record<string, z.ZodTypeAny>> {
  return z.object({
    pageSize: z
      .number()
      .min(1)
      .max(100)
      .describe(PAGE_SIZE_DESCRIPTION)
      .optional(),
    pageCursor: z.string().describe(PAGE_CURSOR_DESCRIPTION).optional(),
    ...customFields,
  });
}

/**
 * Creates a filter schema with pagination base
 */
export function createFilterSchema(
  customFields: Record<string, z.ZodTypeAny> = {},
): z.ZodObject<Record<string, z.ZodTypeAny>> {
  return z.object({
    pageSize: z
      .number()
      .min(1)
      .max(100)
      .describe(PAGE_SIZE_DESCRIPTION)
      .optional(),
    pageCursor: z.string().describe(PAGE_CURSOR_DESCRIPTION).optional(),
    ...customFields,
  });
}

/**
 * Creates a schema with a single required ID parameter plus pagination
 */
export function createIdWithPaginationSchema(params: {
  paramName: string;
  description: string;
}): z.ZodObject<Record<string, z.ZodTypeAny>> {
  return z.object({
    [params.paramName]: z.string().describe(params.description),
    pageSize: z
      .number()
      .min(1)
      .max(100)
      .describe(PAGE_SIZE_DESCRIPTION)
      .optional(),
    pageCursor: z.string().describe(PAGE_CURSOR_DESCRIPTION).optional(),
  });
}

/**
 * Creates a schema with a single required ID parameter only
 */
export function createIdSchema(params: {
  paramName: string;
  description: string;
}): z.ZodObject<Record<string, z.ZodTypeAny>> {
  return z.object({
    [params.paramName]: z.string().describe(params.description),
  });
}

/**
 * Creates a schema for consolidated tools that can either list resources or get a single resource by ID
 */
export function createConsolidatedSchema(
  params: {
    paramName: string;
    description: string;
    resourceName: string;
  },
  additionalFields: Record<string, z.ZodTypeAny> = {},
): z.ZodObject<Record<string, z.ZodTypeAny>> {
  const idDescription = `Optional ${params.resourceName} ID. If provided, returns the specific ${params.resourceName}. If omitted, lists all ${params.resourceName}s with optional filtering and pagination.`;

  return z.object({
    [params.paramName]: z.string().describe(idDescription).optional(),
    ...createPaginationSchema().shape,
    ...additionalFields,
  });
}

/**
 * Creates a schema for Trust Center consolidated tools that require a slugId plus optional resource ID
 */
export function createTrustCenterConsolidatedSchema(
  params: {
    paramName: string;
    description: string;
    resourceName: string;
  },
  additionalFields: Record<string, z.ZodTypeAny> = {},
): z.ZodObject<Record<string, z.ZodTypeAny>> {
  const idDescription = `Optional ${params.resourceName} ID. If provided, returns the specific ${params.resourceName}. If omitted, lists all ${params.resourceName}s with optional filtering and pagination.`;

  return z.object({
    slugId: z
      .string()
      .describe(
        "Trust Center slug ID, e.g. 'company-trust-center' or specific trust center identifier",
      ),
    [params.paramName]: z.string().describe(idDescription).optional(),
    ...createPaginationSchema().shape,
    ...additionalFields,
  });
}

// ==========================================
// URL CONSTRUCTION UTILITIES
// ==========================================

/**
 * Builds a URL with query parameters
 */
export function buildUrl(
  basePath: string,
  params: Record<string, string | number | boolean | string[] | undefined> = {},
): string {
  const url = new URL(basePath, baseApiUrl());

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) {
      if (Array.isArray(value)) {
        // Handle arrays by joining with commas
        url.searchParams.set(key, value.join(","));
      } else {
        url.searchParams.set(key, String(value));
      }
    }
  }

  return url.toString();
}

// ==========================================
// REQUEST HANDLER UTILITIES
// ==========================================

/**
 * Makes a simple GET request to the specified endpoint
 */
export async function makeSimpleGetRequest(
  endpoint: string,
): Promise<CallToolResult> {
  const url = buildUrl(endpoint);
  const response = await makeAuthenticatedRequest(url);
  return handleApiResponse(response);
}

/**
 * Makes a paginated GET request with query parameters
 */
export async function makePaginatedGetRequest(
  endpoint: string,
  params: Record<string, string | number | boolean | string[] | undefined> = {},
): Promise<CallToolResult> {
  const url = buildUrl(endpoint, params);
  const response = await makeAuthenticatedRequest(url);
  return handleApiResponse(response);
}

/**
 * Makes a GET request for a specific resource by ID
 */
export async function makeGetByIdRequest(
  endpoint: string,
  id: string,
): Promise<CallToolResult> {
  const url = buildUrl(`${endpoint}/${String(id)}`);
  const response = await makeAuthenticatedRequest(url);
  return handleApiResponse(response);
}

/**
 * Makes a request that can either list resources or get a single resource by ID
 */
export async function makeConsolidatedRequest(
  endpoint: string,
  params: Record<string, string | number | boolean | string[] | undefined>,
  idParamName: string,
): Promise<CallToolResult> {
  const id = params[idParamName];

  if (id) {
    // Single resource request
    return makeGetByIdRequest(endpoint, String(id));
  } else {
    // List request - remove the ID param from the parameters
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { [idParamName]: _removedId, ...listParams } = params;
    return makePaginatedGetRequest(endpoint, listParams);
  }
}

/**
 * Makes a Trust Center request that can either list resources or get a single resource by ID
 */
export async function makeTrustCenterConsolidatedRequest(
  baseEndpoint: string,
  params: Record<string, string | number | boolean | string[] | undefined>,
  idParamName: string,
  resourcePath: string,
): Promise<CallToolResult> {
  const { slugId, [idParamName]: resourceId, ...otherParams } = params;

  if (resourceId) {
    // Single resource request: /v1/trust-centers/{slugId}/{resourcePath}/{resourceId}
    const url = buildUrl(
      `${baseEndpoint}/${String(slugId)}/${resourcePath}/${String(resourceId)}`,
    );
    const response = await makeAuthenticatedRequest(url);
    return handleApiResponse(response);
  } else {
    // List request: /v1/trust-centers/{slugId}/{resourcePath}
    const url = buildUrl(
      `${baseEndpoint}/${String(slugId)}/${resourcePath}`,
      otherParams,
    );
    const response = await makeAuthenticatedRequest(url);
    return handleApiResponse(response);
  }
}
