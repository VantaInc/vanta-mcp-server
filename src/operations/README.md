# Operations Architecture Reference

This document explains the structure, conventions, and utilities used in the Vanta MCP Server operations layer. It is intended for developers extending the `src/operations/` directory.

## Overview

- **Purpose**: Each operations file wraps one or more Vanta API GET endpoints as MCP tools.
- **Scope**: Operation modules and registered tools.
- **Patterns**: Consolidated list/get tools, resource-specific routing tools, and specialized tools for unique behaviors (e.g., downloads).
- **Automation**: Tools are auto-registered through the registry system; common logic lives in `src/operations/common/`.

## Directory Layout

```
src/operations/
├── README.md                # Operations reference (this file)
├── README.proposed.md       # Proposal used for the latest refresh
├── index.ts                 # Barrel export of all operations modules
├── common/
│   ├── descriptions.ts      # Reusable parameter descriptions (e.g., DOCUMENT_ID_DESCRIPTION)
│   ├── imports.ts           # Barrel import for CallToolResult, Tool, z, utilities, constants
│   └── utils.ts             # Shared schema factories, request helpers, response handlers
├── documents.ts             # Document tools (consolidated + download)
├── frameworks.ts            # Framework tools (consolidated + nested resources)
├── controls.ts
├── discovered-vendors.ts
├── ...
```

## Core Concepts

### Consolidated Tool Pattern

Many resources expose both “list” and “get by ID” behaviors within a single tool. The helper `createConsolidatedSchema` creates a schema with an optional ID plus pagination fields, and `makeConsolidatedRequest` routes the request based on the presence of that ID.

Example (`frameworks.ts`):

```typescript
const FrameworksInput = createConsolidatedSchema({
  paramName: "frameworkId",
  description: FRAMEWORK_ID_DESCRIPTION,
  resourceName: "framework",
});

export async function frameworks(
  args: z.infer<typeof FrameworksInput>,
): Promise<CallToolResult> {
  return makeConsolidatedRequest("/v1/frameworks", args, "frameworkId");
}
```

- **No ID provided** → lists frameworks with pagination.
- **ID provided** → fetches a specific framework.

### Resource-Specific Routing Tools

Some resources expose additional nested endpoints. These tools accept a required ID plus a discriminator to route to different endpoints.

Example (`documents.ts`):

```typescript
const DocumentResourcesInput = z.object({
  documentId: z.string().describe(DOCUMENT_ID_DESCRIPTION),
  resourceType: z
    .enum(["controls", "links", "uploads"])
    .describe(
      "Type of document resource: 'controls' for associated controls, 'links' for external references, 'uploads' for attached files",
    ),
  ...createPaginationSchema().shape,
});

export async function documentResources(
  args: z.infer<typeof DocumentResourcesInput>,
): Promise<CallToolResult> {
  const { documentId, resourceType, ...params } = args;
  const endpoints = {
    controls: `/v1/documents/${String(documentId)}/controls`,
    links: `/v1/documents/${String(documentId)}/links`,
    uploads: `/v1/documents/${String(documentId)}/uploads`,
  };
  const url = buildUrl(endpoints[resourceType], params);
  const response = await makeAuthenticatedRequest(url);
  return handleApiResponse(response);
}
```

### Specialized Tools

When behavior diverges from JSON-based responses (e.g., file downloads), tools implement custom response logic.

Example (`documents.ts`):

```typescript
const DownloadDocumentFileInput = z.object({
  uploadedFileId: z
    .string()
    .describe(
      "Uploaded file ID to download, e.g. 'upload-123' or specific uploaded file identifier",
    ),
});

export async function downloadDocumentFile(
  args: z.infer<typeof DownloadDocumentFileInput>,
): Promise<CallToolResult> {
  const url = buildUrl(
    `/v1/document-uploads/${String(args.uploadedFileId)}/download`,
  );
  const response = await makeAuthenticatedRequest(url);

  if (!response.ok) {
    return handleApiResponse(response);
  }

  const contentType =
    response.headers.get("content-type") ?? "application/octet-stream";
  const contentLength = response.headers.get("content-length");

  if (
    contentType.startsWith("text/") ||
    contentType.includes("application/json") ||
    contentType.includes("application/xml") ||
    contentType.includes("application/javascript") ||
    contentType.includes("application/csv") ||
    contentType.includes("text/csv")
  ) {
    const textContent = await response.text();
    return {
      content: [
        {
          type: "text" as const,
          text: `Document File Content (${contentType}):\n\n${textContent}`,
        },
      ],
    };
  }

  return {
    content: [
      {
        type: "text" as const,
        text: `Document File Information:\n- Content Type: ${contentType}\n- Content Length: ${contentLength ? `${contentLength} bytes` : "Unknown"}\n- File Type: ${contentType.startsWith("image/") ? "Image" : contentType.startsWith("video/") ? "Video" : contentType.startsWith("audio/") ? "Audio" : contentType.startsWith("application/pdf") ? "PDF Document" : "Binary File"}\n- Upload ID: ${String(args.uploadedFileId)}\n\nNote: This is a binary file. Use appropriate tools to download and process the actual file content.`,
      },
    ],
  };
}
```

## Shared Infrastructure (`common/`)

### `descriptions.ts`

- Contains reusable strings for parameter descriptions (e.g., `DOCUMENT_ID_DESCRIPTION`, `FRAMEWORK_ID_DESCRIPTION`).
- Promotes consistency and reduces duplication of descriptive text across operation files.

### `imports.ts`

- Re-exports `CallToolResult`, `Tool`, `z`, schema factories, request helpers, and description constants.
- Imported by every operations file so that a single statement brings in all required utilities:

```typescript
import {
  CallToolResult,
  Tool,
  z,
  createConsolidatedSchema,
  createPaginationSchema,
  makeConsolidatedRequest,
  buildUrl,
  makeAuthenticatedRequest,
  handleApiResponse,
  DOCUMENT_ID_DESCRIPTION,
} from "./common/imports.js";
```

### `utils.ts`

Key exports include:

- **Schema factories**: `createConsolidatedSchema`, `createPaginationSchema`, `createIdSchema`, `createIdWithPaginationSchema`, `createFilterSchema`.
- **Request helpers**: `makeConsolidatedRequest`, `makePaginatedGetRequest`, `makeGetByIdRequest`, `makeSimpleGetRequest`.
- **URL utilities**: `buildUrl` for query string construction.
- **Response utilities**: `handleApiResponse`, `createErrorResponse`, `createSuccessResponse`.

All utilities enforce consistent error handling and response formatting across tools.

## Anatomy of an Operations File

Each operations file follows a common structure:

1. **Imports** from `./common/imports.js` for all dependencies.
2. **Input schemas** using schema factories or explicit Zod objects.
3. **Tool definitions** exporting REST-style tool metadata.
4. **Implementation functions** calling Vanta endpoints using utilities.
5. **Registry export** listing every tool/handler pair for automated registration.

Example skeleton:

```typescript
// 1. Imports
import {
  CallToolResult,
  Tool,
  z,
  createConsolidatedSchema,
  makeConsolidatedRequest,
  buildUrl,
  makeAuthenticatedRequest,
  handleApiResponse,
} from "./common/imports.js";

// 2. Input Schemas
const ResourceInput = createConsolidatedSchema({
  paramName: "resourceId",
  description: "Resource ID...",
  resourceName: "resource",
});

const ResourceDetailsInput = z.object({
  resourceId: z.string().describe("Resource ID..."),
  detailType: z.enum(["summary", "history"]),
  ...createPaginationSchema().shape,
});

// 3. Tool Definitions
export const ResourcesTool: Tool<typeof ResourceInput> = {
  name: "resources",
  description: "Access resources...",
  parameters: ResourceInput,
};

export const ResourceDetailsTool: Tool<typeof ResourceDetailsInput> = {
  name: "resource_details",
  description: "Access resource details...",
  parameters: ResourceDetailsInput,
};

// 4. Implementation Functions
export async function resources(
  args: z.infer<typeof ResourceInput>,
): Promise<CallToolResult> {
  return makeConsolidatedRequest("/v1/resources", args, "resourceId");
}

export async function resourceDetails(
  args: z.infer<typeof ResourceDetailsInput>,
): Promise<CallToolResult> {
  const { resourceId, detailType, ...params } = args;
  const url = buildUrl(
    `/v1/resources/${String(resourceId)}/${detailType}`,
    params,
  );
  const response = await makeAuthenticatedRequest(url);
  return handleApiResponse(response);
}

// 5. Registry Export
export default {
  tools: [
    { tool: ResourcesTool, handler: resources },
    { tool: ResourceDetailsTool, handler: resourceDetails },
  ],
};
```

## Naming and Tool Guidelines

- **Tool names**: Use plural nouns for consolidated tools (e.g., `frameworks`, `documents`).
- **Schema constants**: Use PascalCase with `Input` suffix (e.g., `DocumentsInput`).
- **Implementation functions**: Use camelCase matching tool names (e.g., `frameworks`, `documentResources`).
- **Registry export**: Always include every tool/handler pair in the default export.
- **Descriptions**: Reference centralized descriptions from `common/descriptions.ts` whenever possible.

## Automated Registration

- Each operations file exports a default object `{ tools: [...] }`.
- `src/registry.ts` automatically imports every `src/operations/*.ts` module and registers the listed tools (see Step 7 below).

## Adding or Updating Operations

1. **Create or edit input schemas** using factory helpers or explicit `z.object` definitions.
2. **Define or update tool metadata** with REST-aligned naming.
3. **Implement handlers** using `makeConsolidatedRequest`, `makePaginatedGetRequest`, or custom logic.
4. **Extend the default export** with the new tool/handler pair.
5. **Update `src/operations/index.ts`** to re-export the module (if a new file is added).
6. **Document new tools** in `README.md` (root) and update evaluation artifacts (below).
7. **Enable the tool in `src/config.ts`**. Add the tool's name to the `enabledToolNames` array to make it available through the MCP server. Leaving the array empty enables _all_ tools.

## Evaluation Suite Updates

Whenever tools change:

- Update `src/eval/eval.ts` to include the new tool definition and test cases.
- Update `src/eval/README.md` to describe new or renamed test scenarios.

## Testing and Validation

- **TypeScript Build**: `npm run build`
- **Linting**: `npm run lint -- src/operations/*.ts`
- **Manual Testing**: Invoke tools through the MCP interface if available.

## Quick Reference

- **Consolidated tool example**: `frameworks.ts` (`frameworks` tool).
- **Nested resource example**: `documents.ts` (`document_resources` tool).
- **Download example**: `documents.ts` (`download_document_file` tool).
- **Common utilities**: `src/operations/common/utils.ts`.
- **Automated registry**: `src/registry.ts` + per-file `export default { tools: [...] }`.

---

Use this README as the canonical reference for updates to the operations layer. Developers should rely on it when adding, modifying, or auditing tools.
