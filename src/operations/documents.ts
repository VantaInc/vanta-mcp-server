// 1. Imports
import {
  CallToolResult,
  Tool,
  z,
  createPaginationSchema,
  createIdSchema,
  createIdWithPaginationSchema,
  makePaginatedGetRequest,
  makeGetByIdRequest,
  buildUrl,
  makeAuthenticatedRequest,
  handleApiResponse,
  DOCUMENT_ID_DESCRIPTION,
} from "./common/imports.js";

// 2. Input Schemas
const ListDocumentsInput = createPaginationSchema();

const GetDocumentInput = createIdSchema({
  paramName: "documentId",
  description: DOCUMENT_ID_DESCRIPTION,
});

const ListDocumentControlsInput = createIdWithPaginationSchema({
  paramName: "documentId",
  description: DOCUMENT_ID_DESCRIPTION,
});

const ListDocumentLinksInput = createIdWithPaginationSchema({
  paramName: "documentId",
  description: DOCUMENT_ID_DESCRIPTION,
});

const ListDocumentUploadsInput = createIdWithPaginationSchema({
  paramName: "documentId",
  description: DOCUMENT_ID_DESCRIPTION,
});

const DownloadDocumentFileInput = z.object({
  documentId: z.string().describe(DOCUMENT_ID_DESCRIPTION),
  uploadedFileId: z
    .string()
    .describe(
      "Uploaded file ID to download, e.g. 'file-456' or specific uploaded file identifier",
    ),
});

// 3. Tool Definitions
export const ListDocumentsTool: Tool<typeof ListDocumentsInput> = {
  name: "list_documents",
  description:
    "List all documents in your Vanta account. Returns document IDs, names, types, and metadata for compliance and evidence management. Use this to see all documents available for compliance frameworks and controls.",
  parameters: ListDocumentsInput,
};

export const GetDocumentTool: Tool<typeof GetDocumentInput> = {
  name: "get_document",
  description:
    "Get document by ID. Retrieve detailed information about a specific document when its ID is known. The ID of a document can be found from get_documents response. Returns complete document details including name, type, metadata, and compliance mappings.",
  parameters: GetDocumentInput,
};

export const ListDocumentControlsTool: Tool<typeof ListDocumentControlsInput> =
  {
    name: "list_document_controls",
    description:
      "List document's controls. Get all security controls that are mapped to or associated with a specific document. Use this to understand which compliance controls are supported by a particular document as evidence.",
    parameters: ListDocumentControlsInput,
  };

export const ListDocumentLinksTool: Tool<typeof ListDocumentLinksInput> = {
  name: "list_document_links",
  description:
    "List document's links. Get all external links and references associated with a specific document. Use this to access related resources, external documentation, or supplementary materials for compliance evidence.",
  parameters: ListDocumentLinksInput,
};

export const ListDocumentUploadsTool: Tool<typeof ListDocumentUploadsInput> = {
  name: "list_document_uploads",
  description:
    "List document's uploads. Get all files and uploads that have been attached to a specific document. Use this to see what files are available for download or review as part of compliance documentation.",
  parameters: ListDocumentUploadsInput,
};

export const DownloadDocumentFileTool: Tool<typeof DownloadDocumentFileInput> =
  {
    name: "download_document_file",
    description:
      "Download file for document. Intelligently retrieves file content from a document upload. For text-based files (txt, json, csv, xml, etc.), returns the readable content. For binary files (images, PDFs, etc.), returns file metadata and information. Use this to access compliance evidence and documentation content that can be analyzed.",
    parameters: DownloadDocumentFileInput,
  };

// 4. Implementation Functions
export async function listDocuments(
  args: z.infer<typeof ListDocumentsInput>,
): Promise<CallToolResult> {
  return makePaginatedGetRequest("/v1/documents", args);
}

export async function getDocument(
  args: z.infer<typeof GetDocumentInput>,
): Promise<CallToolResult> {
  return makeGetByIdRequest("/v1/documents", args.documentId);
}

export async function listDocumentControls(
  args: z.infer<typeof ListDocumentControlsInput>,
): Promise<CallToolResult> {
  const { documentId, ...params } = args;
  const url = buildUrl(`/v1/documents/${String(documentId)}/controls`, params);
  const response = await makeAuthenticatedRequest(url);
  return handleApiResponse(response);
}

export async function listDocumentLinks(
  args: z.infer<typeof ListDocumentLinksInput>,
): Promise<CallToolResult> {
  const { documentId, ...params } = args;
  const url = buildUrl(`/v1/documents/${String(documentId)}/links`, params);
  const response = await makeAuthenticatedRequest(url);
  return handleApiResponse(response);
}

export async function listDocumentUploads(
  args: z.infer<typeof ListDocumentUploadsInput>,
): Promise<CallToolResult> {
  const { documentId, ...params } = args;
  const url = buildUrl(`/v1/documents/${String(documentId)}/uploads`, params);
  const response = await makeAuthenticatedRequest(url);
  return handleApiResponse(response);
}

export async function downloadDocumentFile(
  args: z.infer<typeof DownloadDocumentFileInput>,
): Promise<CallToolResult> {
  const url = buildUrl(
    `/v1/documents/${String(args.documentId)}/uploads/${String(args.uploadedFileId)}/media`,
  );
  const response = await makeAuthenticatedRequest(url);

  if (!response.ok) {
    return handleApiResponse(response);
  }

  // Get the content type from the response headers
  const contentType =
    response.headers.get("content-type") ?? "application/octet-stream";
  const contentLength = response.headers.get("content-length");

  // Handle text-based MIME types - return content that LLMs can process
  if (
    contentType.startsWith("text/") ||
    contentType.includes("application/json") ||
    contentType.includes("application/xml") ||
    contentType.includes("application/javascript") ||
    contentType.includes("application/csv") ||
    contentType.includes("text/csv")
  ) {
    try {
      const textContent = await response.text();
      return {
        content: [
          {
            type: "text" as const,
            text: `File Content (${contentType}):\n\n${textContent}`,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text" as const,
            text: `Error reading text content: ${String(error)}`,
          },
        ],
      };
    }
  }

  // For binary files, return metadata instead of raw binary data
  return {
    content: [
      {
        type: "text" as const,
        text: `Binary File Information:
MIME Type: ${contentType}
Content Length: ${contentLength ? `${contentLength} bytes` : "Unknown"}
Document ID: ${args.documentId}
Uploaded File ID: ${args.uploadedFileId}

Note: This is a binary file (${contentType.split("/")[0]} format) that cannot be displayed as text. Use get_document_uploads to see file metadata, or access the file directly through the Vanta web interface for viewing.`,
      },
    ],
  };
}

// Registry export for automated tool registration
export default {
  tools: [
    { tool: ListDocumentsTool, handler: listDocuments },
    { tool: GetDocumentTool, handler: getDocument },
    { tool: ListDocumentControlsTool, handler: listDocumentControls },
    { tool: ListDocumentLinksTool, handler: listDocumentLinks },
    { tool: ListDocumentUploadsTool, handler: listDocumentUploads },
    { tool: DownloadDocumentFileTool, handler: downloadDocumentFile },
  ],
};
