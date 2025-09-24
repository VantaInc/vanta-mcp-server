import { getValidToken, refreshToken } from "../../auth.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { baseApiUrl } from "../../api.js";
import {
  PAGE_SIZE_DESCRIPTION,
  PAGE_CURSOR_DESCRIPTION,
} from "./descriptions.js";

export async function createAuthHeaders(): Promise<Record<string, string>> {
  const token = await getValidToken();
  return {
    "Authorization": `Bearer ${token}`,
    "x-vanta-is-mcp": "true",
  };
}

/**
 * Makes an authenticated HTTP request using a bearer token from the Vanta MCP auth system.
 * If the request returns a 401 Unauthorized, it will refresh the token and retry once.
 *
 * @param {string} url - The URL to send the request to.
 * @param {RequestInit} [options={}] - Optional fetch options (method, headers, body, etc.).
 * @returns {Promise<Response>} The fetch Response object.
 */
export async function makeAuthenticatedRequest(
  url: string,
  options: RequestInit = {},
): Promise<Response> {
  let headers = await createAuthHeaders();

  const response = await fetch(url, {
    ...options,
    headers: {
      ...headers,
      ...options.headers,
    },
  });

  // If we get unauthorized, try refreshing the token once
  if (response.status === 401) {
    const newToken = await refreshToken();
    headers = {
      "Authorization": `Bearer ${newToken}`,
      "x-vanta-is-mcp": "true",
    };

    return fetch(url, {
      ...options,
      headers: {
        ...headers,
        ...options.headers,
      },
    });
  }

  return response;
}

// ==========================================
// RESPONSE PROCESSING UTILITIES
// ==========================================

/**
 * Creates a standard error response for failed API calls
 */
export function createErrorResponse(statusText: string): CallToolResult {
  return {
    content: [
      {
        type: "text" as const,
        text: `Error: ${statusText}`,
      },
    ],
  };
}

/**
 * Creates a standard success response with JSON data
 */
export async function createSuccessResponse(
  response: Response,
): Promise<CallToolResult> {
  return {
    content: [
      { type: "text" as const, text: JSON.stringify(await response.json()) },
    ],
  };
}

/**
 * Handles API response with standard error/success processing
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
 * Creates a schema with only pagination parameters
 */
export function createPaginationSchema(): z.ZodObject<{
  pageSize: z.ZodOptional<z.ZodNumber>;
  pageCursor: z.ZodOptional<z.ZodString>;
}> {
  return z.object({
    pageSize: z.number().describe(PAGE_SIZE_DESCRIPTION).optional(),
    pageCursor: z.string().describe(PAGE_CURSOR_DESCRIPTION).optional(),
  });
}

/**
 * Creates a schema with a single ID parameter
 */
export function createIdSchema(params: {
  paramName: string;
  description: string;
}): z.ZodObject<Record<string, z.ZodString>> {
  return z.object({
    [params.paramName]: z.string().describe(params.description),
  });
}

/**
 * Creates a schema with an ID parameter plus pagination
 */
export function createIdWithPaginationSchema(params: {
  paramName: string;
  description: string;
}): z.ZodObject<
  Record<
    string,
    z.ZodString | z.ZodOptional<z.ZodNumber> | z.ZodOptional<z.ZodString>
  >
> {
  return z.object({
    [params.paramName]: z.string().describe(params.description),
    pageSize: z.number().describe(PAGE_SIZE_DESCRIPTION).optional(),
    pageCursor: z.string().describe(PAGE_CURSOR_DESCRIPTION).optional(),
  });
}

/**
 * Creates a base schema that can be extended with custom fields
 */
export function createFilterSchema(
  customFields: Record<string, z.ZodTypeAny> = {},
): z.ZodObject<Record<string, z.ZodTypeAny>> {
  return z.object({
    pageSize: z.number().describe(PAGE_SIZE_DESCRIPTION).optional(),
    pageCursor: z.string().describe(PAGE_CURSOR_DESCRIPTION).optional(),
    ...customFields,
  });
}

// ==========================================
// URL CONSTRUCTION UTILITIES
// ==========================================

/**
 * Builds a URL with query parameters from an object
 */
export function buildUrl(
  basePath: string,
  params: Record<string, string | number | boolean | string[] | undefined> = {},
): string {
  const url = new URL(basePath, baseApiUrl());

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      if (Array.isArray(value)) {
        // Handle array parameters (e.g., frameworkMatchesAny)
        value.forEach(item => {
          url.searchParams.append(key, String(item));
        });
      } else {
        url.searchParams.append(key, String(value));
      }
    }
  });

  return url.toString();
}

// ==========================================
// REQUEST HANDLER UTILITIES
// ==========================================

/**
 * Makes a simple GET request with no parameters
 */
export async function makeSimpleGetRequest(
  endpoint: string,
): Promise<CallToolResult> {
  const url = new URL(endpoint, baseApiUrl());
  const response = await makeAuthenticatedRequest(url.toString());
  return handleApiResponse(response);
}

/**
 * Makes a GET request with pagination and filtering parameters
 */
export async function makePaginatedGetRequest(
  endpoint: string,
  params: Record<string, string | number | boolean | string[] | undefined>,
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
