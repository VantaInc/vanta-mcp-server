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
  DOCUMENT_ID_DESCRIPTION,
} from "./common/imports.js";

// 2. Input Schemas
const DocumentsInput = createConsolidatedSchema({
  paramName: "documentId",
  description: DOCUMENT_ID_DESCRIPTION,
  resourceName: "document",
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
  uploadedFileId: z
    .string()
    .describe(
      "Uploaded file ID to download, e.g. 'upload-123' or specific uploaded file identifier",
    ),
});

// 3. Tool Definitions
export const DocumentsTool: Tool<typeof DocumentsInput> = {
  name: "documents",
  description:
    "Access documents in your Vanta account. Provide documentId to get a specific document, or omit to list all documents. Returns document IDs, names, types, and metadata for compliance and evidence management.",
  parameters: DocumentsInput,
};

export const ListDocumentControlsTool: Tool<typeof ListDocumentControlsInput> =
  {
    name: "list_document_controls",
    description:
      "List document's controls. Get all security controls that are mapped to or associated with a specific document.",
    parameters: ListDocumentControlsInput,
  };

export const ListDocumentLinksTool: Tool<typeof ListDocumentLinksInput> = {
  name: "list_document_links",
  description:
    "List document's links. Get all external links and references associated with a specific document.",
  parameters: ListDocumentLinksInput,
};

export const ListDocumentUploadsTool: Tool<typeof ListDocumentUploadsInput> = {
  name: "list_document_uploads",
  description:
    "List document's uploads. Get all files and uploads attached to a specific document for compliance documentation.",
  parameters: ListDocumentUploadsInput,
};

export const DownloadDocumentFileTool: Tool<typeof DownloadDocumentFileInput> =
  {
    name: "download_document_file",
    description:
      "Download document file by upload ID. Get the actual uploaded document file. Intelligently handles different MIME types: returns text content for readable files (text/*, JSON, XML, CSV, JavaScript) and metadata information for binary files (images, videos, PDFs, etc.).",
    parameters: DownloadDocumentFileInput,
  };

// 4. Implementation Functions
export async function documents(
  args: z.infer<typeof DocumentsInput>,
): Promise<CallToolResult> {
  return makeConsolidatedRequest("/v1/documents", args, "documentId");
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
    `/v1/document-uploads/${String(args.uploadedFileId)}/download`,
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
            text: `Document File Content (${contentType}):\n\n${textContent}`,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text" as const,
            text: `Error reading text content: ${error instanceof Error ? error.message : "Unknown error"}`,
          },
        ],
        isError: true,
      };
    }
  }

  // For binary files, return metadata about the file
  return {
    content: [
      {
        type: "text" as const,
        text: `Document File Information:
- Content Type: ${contentType}
- Content Length: ${contentLength ? `${contentLength} bytes` : "Unknown"}
- File Type: ${contentType.startsWith("image/") ? "Image" : contentType.startsWith("video/") ? "Video" : contentType.startsWith("audio/") ? "Audio" : contentType.startsWith("application/pdf") ? "PDF Document" : "Binary File"}
- Upload ID: ${String(args.uploadedFileId)}

Note: This is a binary file. Use appropriate tools to download and process the actual file content.`,
      },
    ],
  };
}

// Registry export for automated tool registration
export default {
  tools: [
    { tool: DocumentsTool, handler: documents },
    { tool: ListDocumentControlsTool, handler: listDocumentControls },
    { tool: ListDocumentLinksTool, handler: listDocumentLinks },
    { tool: ListDocumentUploadsTool, handler: listDocumentUploads },
    { tool: DownloadDocumentFileTool, handler: downloadDocumentFile },
  ],
};
