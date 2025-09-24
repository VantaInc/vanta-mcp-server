import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { baseApiUrl } from "../api.js";
import { Tool } from "../types.js";
import { z } from "zod";
import { makeAuthenticatedRequest } from "./utils.js";
import {
  PAGE_SIZE_DESCRIPTION,
  PAGE_CURSOR_DESCRIPTION,
  DOCUMENT_ID_DESCRIPTION,
} from "./global-descriptions.js";

const ListDocumentsInput = z.object({
  pageSize: z.number().describe(PAGE_SIZE_DESCRIPTION).optional(),
  pageCursor: z.string().describe(PAGE_CURSOR_DESCRIPTION).optional(),
});

export const ListDocumentsTool: Tool<typeof ListDocumentsInput> = {
  name: "list_documents",
  description:
    "List all documents in your Vanta account. Returns document IDs, names, types, and metadata for compliance and evidence management. Use this to see all documents available for compliance frameworks and controls.",
  parameters: ListDocumentsInput,
};

const GetDocumentInput = z.object({
  documentId: z.string().describe(DOCUMENT_ID_DESCRIPTION),
});

export const GetDocumentTool: Tool<typeof GetDocumentInput> = {
  name: "get_document",
  description:
    "Get document by ID. Retrieve detailed information about a specific document when its ID is known. The ID of a document can be found from get_documents response. Returns complete document details including name, type, metadata, and compliance mappings.",
  parameters: GetDocumentInput,
};

const ListDocumentControlsInput = z.object({
  documentId: z.string().describe(DOCUMENT_ID_DESCRIPTION),
  pageSize: z.number().describe(PAGE_SIZE_DESCRIPTION).optional(),
  pageCursor: z.string().describe(PAGE_CURSOR_DESCRIPTION).optional(),
});

export const ListDocumentControlsTool: Tool<typeof ListDocumentControlsInput> = {
  name: "list_document_controls",
  description:
    "List document's controls. Get all security controls that are mapped to or associated with a specific document. Use this to understand which compliance controls are supported by a particular document as evidence.",
  parameters: ListDocumentControlsInput,
};

const ListDocumentLinksInput = z.object({
  documentId: z.string().describe(DOCUMENT_ID_DESCRIPTION),
  pageSize: z.number().describe(PAGE_SIZE_DESCRIPTION).optional(),
  pageCursor: z.string().describe(PAGE_CURSOR_DESCRIPTION).optional(),
});

export const ListDocumentLinksTool: Tool<typeof ListDocumentLinksInput> = {
  name: "list_document_links",
  description:
    "List document's links. Get all external links and references associated with a specific document. Use this to access related resources, external documentation, or supplementary materials for compliance evidence.",
  parameters: ListDocumentLinksInput,
};

const ListDocumentUploadsInput = z.object({
  documentId: z.string().describe(DOCUMENT_ID_DESCRIPTION),
  pageSize: z.number().describe(PAGE_SIZE_DESCRIPTION).optional(),
  pageCursor: z.string().describe(PAGE_CURSOR_DESCRIPTION).optional(),
});

export const ListDocumentUploadsTool: Tool<typeof ListDocumentUploadsInput> = {
  name: "list_document_uploads",
  description:
    "List document's uploads. Get all files and uploads that have been attached to a specific document. Use this to see what files are available for download or review as part of compliance documentation.",
  parameters: ListDocumentUploadsInput,
};

const DownloadDocumentFileInput = z.object({
  documentId: z.string().describe(DOCUMENT_ID_DESCRIPTION),
  uploadedFileId: z
    .string()
    .describe(
      "Uploaded file ID to download, e.g. 'file-456' or specific uploaded file identifier",
    ),
});

export const DownloadDocumentFileTool: Tool<typeof DownloadDocumentFileInput> =
  {
    name: "download_document_file",
    description:
      "Download file for document. Intelligently retrieves file content from a document upload. For text-based files (txt, json, csv, xml, etc.), returns the readable content. For binary files (images, PDFs, etc.), returns file metadata and information. Use this to access compliance evidence and documentation content that can be analyzed.",
    parameters: DownloadDocumentFileInput,
  };

export async function listDocuments(
  args: z.infer<typeof ListDocumentsInput>,
): Promise<CallToolResult> {
  const url = new URL("/v1/documents", baseApiUrl());

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

export async function getDocument(
  args: z.infer<typeof GetDocumentInput>,
): Promise<CallToolResult> {
  const url = new URL(`/v1/documents/${args.documentId}`, baseApiUrl());

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

export async function listDocumentControls(
  args: z.infer<typeof ListDocumentControlsInput>,
): Promise<CallToolResult> {
  const url = new URL(
    `/v1/documents/${args.documentId}/controls`,
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

export async function listDocumentLinks(
  args: z.infer<typeof ListDocumentLinksInput>,
): Promise<CallToolResult> {
  const url = new URL(`/v1/documents/${args.documentId}/links`, baseApiUrl());

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

export async function listDocumentUploads(
  args: z.infer<typeof ListDocumentUploadsInput>,
): Promise<CallToolResult> {
  const url = new URL(`/v1/documents/${args.documentId}/uploads`, baseApiUrl());

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

export async function downloadDocumentFile(
  args: z.infer<typeof DownloadDocumentFileInput>,
): Promise<CallToolResult> {
  const url = new URL(
    `/v1/documents/${args.documentId}/uploads/${args.uploadedFileId}/media`,
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

  // Get the content type from the response headers
  const contentType =
    response.headers.get("content-type") || "application/octet-stream";
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
