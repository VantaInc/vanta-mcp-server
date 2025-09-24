# Operations Architecture Guide

This document explains the architecture, patterns, and conventions used in the Vanta MCP Server operations layer.

## Table of Contents

- [Overview](#overview)
- [File Structure](#file-structure)
- [Naming Conventions](#naming-conventions)
- [DRY Utilities](#dry-utilities)
- [Schema Factory Functions](#schema-factory-functions)
- [Request Handler Utilities](#request-handler-utilities)
- [Creating New Operations](#creating-new-operations)
- [Best Practices](#best-practices)
- [Examples](#examples)

## Overview

The operations layer provides a clean, consistent interface to the Vanta API. Each operation file corresponds to a specific resource type in the Vanta API (e.g., `controls.ts`, `vendors.ts`, `people.ts`).

### Key Architectural Principles

1. **DRY (Don't Repeat Yourself)**: Common patterns are abstracted into reusable utilities
2. **RESTful Naming**: Tools follow REST conventions (`list_*` for multiple items, `get_*` for single items)
3. **Type Safety**: Full TypeScript support with proper type definitions
4. **Consistent Error Handling**: Standardized error responses across all operations
5. **Schema Factories**: Reusable Zod schema generators for common patterns

## File Structure

```
operations/
├── README.md                    # This file
├── global-descriptions.ts       # Centralized parameter descriptions
├── utils.ts                    # DRY utilities and common functions
├── controls.ts                 # Control-related operations
├── vendors.ts                  # Vendor-related operations
├── people.ts                   # People-related operations
└── ...                         # Other resource operations
```

### Standard Operation File Structure

Each operation file follows this pattern:

```typescript
// 1. Imports
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { Tool } from "../types.js";
import { z } from "zod";
import { list of DRY utilities } from "./utils.js";
import { descriptions } from "./global-descriptions.js";

// 2. Input Schemas (using schema factories)
const ListResourcesInput = createPaginationSchema();
const GetResourceInput = createIdSchema("resourceId", RESOURCE_ID_DESCRIPTION);

// 3. Tool Definitions
export const ListResourcesTool: Tool<typeof ListResourcesInput> = {
  name: "list_resources",
  description: "...",
  parameters: ListResourcesInput,
};

// 4. Implementation Functions (using request handlers)
export async function listResources(
  args: z.infer<typeof ListResourcesInput>,
): Promise<CallToolResult> {
  return makePaginatedGetRequest("/v1/resources", args);
}
```

## Naming Conventions

### REST-Style Tool Names

- **`list_*`**: Returns multiple items (e.g., `list_controls`, `list_vendors`)
- **`get_*`**: Returns a single item by ID (e.g., `get_control`, `get_vendor`)
- **Special actions**: Keep descriptive names (e.g., `download_document_file`)

### Consistent Naming Pattern

```typescript
// ✅ Correct
const ListControlsInput = createPaginationSchema();
export const ListControlsTool: Tool<typeof ListControlsInput> = { name: "list_controls", ... };
export async function listControls(args: z.infer<typeof ListControlsInput>): Promise<CallToolResult> { ... }

// ✅ Correct
const GetControlInput = createIdSchema("controlId", CONTROL_ID_DESCRIPTION);
export const GetControlTool: Tool<typeof GetControlInput> = { name: "get_control", ... };
export async function getControl(args: z.infer<typeof GetControlInput>): Promise<CallToolResult> { ... }
```

### Function and Constant Naming

- **Input schemas**: `List*Input`, `Get*Input`
- **Tool exports**: `List*Tool`, `Get*Tool`
- **Implementation functions**: `list*()`, `get*()`

## DRY Utilities

The `utils.ts` file provides reusable utilities to eliminate code duplication:

### Response Processing

```typescript
// Standard error response
export function createErrorResponse(statusText: string): CallToolResult;

// Standard success response with JSON
export async function createSuccessResponse(
  response: Response,
): Promise<CallToolResult>;

// Complete response handling (error or success)
export async function handleApiResponse(
  response: Response,
): Promise<CallToolResult>;
```

### URL Construction

```typescript
// Build URLs with query parameters
export function buildUrl(
  basePath: string,
  params: Record<string, string | number | boolean | string[] | undefined>,
): string;

// Build resource-by-ID URLs
export function buildResourceUrl(resource: string, id: string): string;
```

### Authentication

```typescript
// Make authenticated requests to Vanta API
export async function makeAuthenticatedRequest(
  url: string,
  options?: RequestInit,
): Promise<Response>;
```

## Schema Factory Functions

Common parameter patterns are abstracted into reusable schema generators:

### Basic Schemas

```typescript
// Pagination parameters (pageSize, pageCursor)
const schema = createPaginationSchema();

// Single ID parameter
const schema = createIdSchema("controlId", CONTROL_ID_DESCRIPTION);

// ID + pagination parameters
const schema = createIdWithPaginationSchema("vendorId", VENDOR_ID_DESCRIPTION);

// Base schema with custom fields
const schema = createFilterSchema({
  categoryMatchesAny: z.array(z.string()).optional(),
});
```

### Extended Schemas

```typescript
// Extend pagination with custom fields
const ListControlsInput = createPaginationSchema().extend({
  frameworkMatchesAny: z
    .array(z.string())
    .describe("Framework IDs to filter by")
    .optional(),
});
```

## Request Handler Utilities

Common request patterns are abstracted into reusable functions:

### Simple GET Request

```typescript
export async function listResources(
  args: z.infer<typeof ListResourcesInput>,
): Promise<CallToolResult> {
  return makePaginatedGetRequest("/v1/resources", args);
}
```

### GET by ID

```typescript
export async function getResource(
  args: z.infer<typeof GetResourceInput>,
): Promise<CallToolResult> {
  return makeGetByIdRequest("resources", args.resourceId);
}
```

### Custom Endpoints

```typescript
export async function listResourceDetails(
  args: z.infer<typeof ListResourceDetailsInput>,
): Promise<CallToolResult> {
  const { resourceId, ...params } = args;
  const url = buildUrl(`/v1/resources/${String(resourceId)}/details`, params);
  const response = await makeAuthenticatedRequest(url);
  return handleApiResponse(response);
}
```

## Creating New Operations

### Step 1: Create the Operation File

```typescript
// src/operations/new-resource.ts
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { Tool } from "../types.js";
import { z } from "zod";
import {
  createPaginationSchema,
  createIdSchema,
  makePaginatedGetRequest,
  makeGetByIdRequest,
} from "./utils.js";

// Define schemas
const ListNewResourcesInput = createPaginationSchema();
const GetNewResourceInput = createIdSchema(
  "newResourceId",
  "New resource ID to retrieve",
);

// Define tools
export const ListNewResourcesTool: Tool<typeof ListNewResourcesInput> = {
  name: "list_new_resources",
  description: "List all new resources in your Vanta account.",
  parameters: ListNewResourcesInput,
};

export const GetNewResourceTool: Tool<typeof GetNewResourceInput> = {
  name: "get_new_resource",
  description: "Get new resource by ID.",
  parameters: GetNewResourceInput,
};

// Implement functions
export async function listNewResources(
  args: z.infer<typeof ListNewResourcesInput>,
): Promise<CallToolResult> {
  return makePaginatedGetRequest("/v1/new-resources", args);
}

export async function getNewResource(
  args: z.infer<typeof GetNewResourceInput>,
): Promise<CallToolResult> {
  return makeGetByIdRequest("new-resources", args.newResourceId);
}
```

### Step 2: Register in index.ts

```typescript
// Add imports
import {
  ListNewResourcesTool,
  GetNewResourceTool,
  listNewResources,
  getNewResource,
} from "./operations/new-resource.js";

// Register tools
server.tool(
  ListNewResourcesTool.name,
  ListNewResourcesTool.description,
  ListNewResourcesTool.parameters.shape,
  listNewResources,
);
server.tool(
  GetNewResourceTool.name,
  GetNewResourceTool.description,
  GetNewResourceTool.parameters.shape,
  getNewResource,
);
```

### Step 3: Add to eval.ts

```typescript
// Import tools
import {
  ListNewResourcesTool,
  GetNewResourceTool,
} from "../operations/new-resource.js";

// Add to tools array
const tools = [
  // ... existing tools
  {
    type: "function" as const,
    function: {
      name: ListNewResourcesTool.name,
      description: ListNewResourcesTool.description,
      parameters: zodToJsonSchema(ListNewResourcesTool.parameters),
    },
  },
  // Add test cases...
];
```

### Step 4: Update README.md

Add the new operations to the main project README.md.

## Best Practices

### 1. Use DRY Utilities

```typescript
// ✅ Good - Uses DRY utilities
export async function listControls(
  args: z.infer<typeof ListControlsInput>,
): Promise<CallToolResult> {
  return makePaginatedGetRequest("/v1/controls", args);
}

// ❌ Bad - Manual implementation
export async function listControls(
  args: z.infer<typeof ListControlsInput>,
): Promise<CallToolResult> {
  const url = new URL("/v1/controls", baseApiUrl());
  if (args.pageSize)
    url.searchParams.append("pageSize", args.pageSize.toString());
  // ... 20+ more lines of boilerplate
}
```

### 2. Use Schema Factories

```typescript
// ✅ Good - Uses schema factory
const GetControlInput = createIdSchema("controlId", CONTROL_ID_DESCRIPTION);

// ❌ Bad - Manual schema
const GetControlInput = z.object({
  controlId: z.string().describe("Control ID to retrieve, e.g. 'control-123'"),
});
```

### 3. Centralize Descriptions

```typescript
// ✅ Good - Uses centralized description
import { CONTROL_ID_DESCRIPTION } from "./global-descriptions.js";
const schema = createIdSchema("controlId", CONTROL_ID_DESCRIPTION);

// ❌ Bad - Hardcoded description
const schema = createIdSchema("controlId", "Control ID to retrieve");
```

### 4. Consistent Error Handling

```typescript
// ✅ Good - Uses standard response handling
const response = await makeAuthenticatedRequest(url);
return handleApiResponse(response);

// ❌ Bad - Manual error handling
if (!response.ok) {
  return { content: [{ type: "text", text: `Error: ${response.statusText}` }] };
}
return {
  content: [{ type: "text", text: JSON.stringify(await response.json()) }],
};
```

### 5. Type Safety

```typescript
// ✅ Good - Explicit return type
export async function listControls(
  args: z.infer<typeof ListControlsInput>,
): Promise<CallToolResult> {
  return makePaginatedGetRequest("/v1/controls", args);
}

// ❌ Bad - Missing return type
export async function listControls(args: z.infer<typeof ListControlsInput>) {
  return makePaginatedGetRequest("/v1/controls", args);
}
```

## Examples

### Basic List Operation

```typescript
const ListVendorsInput = createPaginationSchema();

export const ListVendorsTool: Tool<typeof ListVendorsInput> = {
  name: "list_vendors",
  description: "List all vendors in your Vanta account.",
  parameters: ListVendorsInput,
};

export async function listVendors(
  args: z.infer<typeof ListVendorsInput>,
): Promise<CallToolResult> {
  return makePaginatedGetRequest("/v1/vendors", args);
}
```

### Get by ID Operation

```typescript
const GetVendorInput = createIdSchema("vendorId", VENDOR_ID_DESCRIPTION);

export const GetVendorTool: Tool<typeof GetVendorInput> = {
  name: "get_vendor",
  description: "Get vendor by ID.",
  parameters: GetVendorInput,
};

export async function getVendor(
  args: z.infer<typeof GetVendorInput>,
): Promise<CallToolResult> {
  return makeGetByIdRequest("vendors", args.vendorId);
}
```

### Custom Filtered List

```typescript
const ListControlsInput = createPaginationSchema().extend({
  frameworkMatchesAny: z
    .array(z.string())
    .describe("Framework IDs to filter by")
    .optional(),
});

export async function listControls(
  args: z.infer<typeof ListControlsInput>,
): Promise<CallToolResult> {
  return makePaginatedGetRequest("/v1/controls", args);
}
```

### Nested Resource Operations

```typescript
const ListVendorDocumentsInput = createIdWithPaginationSchema(
  "vendorId",
  VENDOR_ID_DESCRIPTION,
);

export async function listVendorDocuments(
  args: z.infer<typeof ListVendorDocumentsInput>,
): Promise<CallToolResult> {
  const { vendorId, ...params } = args;
  const url = buildUrl(`/v1/vendors/${String(vendorId)}/documents`, params);
  const response = await makeAuthenticatedRequest(url);
  return handleApiResponse(response);
}
```

## Code Quality

### ESLint Compliance

- All operation files should pass ESLint with zero errors
- Use `npx eslint src/operations/*.ts --quiet` to check

### Type Safety

- All functions must have explicit return types
- Use proper TypeScript types throughout
- Avoid `any` types

### Testing

- Add evaluation test cases for all new tools in `eval.ts`
- Update `eval/README.md` with new test descriptions

---

This architecture provides a maintainable, consistent foundation for extending the Vanta MCP Server with new operations while ensuring code quality and developer productivity.
