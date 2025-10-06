// 1. Imports
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

// 2. Input Schemas
const DocumentsInput = createConsolidatedSchema(
  {
    paramName: "documentId",
    description: DOCUMENT_ID_DESCRIPTION,
    resourceName: "document",
  },
  {
    frameworkMatchesAny: z
      .array(z.string())
      .describe(
        "Filter documents by framework IDs. Returns documents that belong to any of the specified frameworks, e.g. ['soc2', 'iso27001', 'hipaa']",
      )
      .optional(),
    statusMatchesAny: z
      .array(z.string())
      .describe(
        "Filter documents by status. Possible values: Needs document, Needs update, Not relevant, OK.",
      )
      .optional(),
  },
);

const DocumentResourcesInput = z.object({
  documentId: z.string().describe(DOCUMENT_ID_DESCRIPTION),
  resourceType: z
    .enum(["controls", "links", "uploads"])
    .describe(
      "Type of document resource: 'controls' for associated controls, 'links' for external references, 'uploads' for attached files",
    ),
  ...createPaginationSchema().shape,
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

export const DocumentResourcesTool: Tool<typeof DocumentResourcesInput> = {
  name: "document_resources",
  description:
    "Access document-related resources including controls, links (i.e. hyperlinks), and uploads. Specify resourceType to get the specific type of resource associated with a document. Use this to explore what controls are linked to a document, what external references exist, or what files are attached (including the download link for those files).",
  parameters: DocumentResourcesInput,
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

export async function documentResources(
  args: z.infer<typeof DocumentResourcesInput>,
): Promise<CallToolResult> {
  const { documentId, resourceType, ...params } = args;

  const endpoints = {
    controls: `/v1/documents/${String(documentId)}/controls`,
    links: `/v1/documents/${String(documentId)}/links`,
    uploads: `/v1/documents/${String(documentId)}/uploads`,
  };

  const endpoint = endpoints[resourceType];
  if (!endpoint) {
    return {
      content: [
        {
          type: "text",
          text: `Error: Invalid resourceType '${resourceType}'. Must be one of: controls, links, uploads`,
        },
      ],
      isError: true,
    };
  }

  const url = buildUrl(endpoint, params);
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
    { tool: DocumentResourcesTool, handler: documentResources },
    { tool: DownloadDocumentFileTool, handler: downloadDocumentFile },
  ],
};
