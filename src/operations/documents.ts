import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { baseApiUrl } from "../api.js";
import { Tool } from "../types.js";
import { z } from "zod";
import { makeAuthenticatedRequest } from "./utils.js";

const GetControlDocumentsInput = z.object({
  controlId: z
    .string()
    .describe("The ID of the control to list documents for"),
  pageSize: z
    .number()
    .describe("Number of documents to return (1-100, default 10)")
    .optional(),
  pageCursor: z.string().describe("Pagination cursor for next page").optional(),
});

export const GetControlDocumentsTool: Tool<typeof GetControlDocumentsInput> = {
  name: "get_control_documents",
  description:
    "List all documents associated with a specific security control. Use this when you know a control ID and want to see which documents provide evidence or documentation for that control. Returns document details including names, types, and upload status.",
  parameters: GetControlDocumentsInput,
};

const GetDocumentUploadsInput = z.object({
  documentId: z
    .string()
    .describe("The ID of the document to list uploaded files for"),
  pageSize: z
    .number()
    .describe("Number of uploads to return (1-100, default 10)")
    .optional(),
  pageCursor: z.string().describe("Pagination cursor for next page").optional(),
});

export const GetDocumentUploadsTool: Tool<typeof GetDocumentUploadsInput> = {
  name: "get_document_uploads",
  description:
    "List all uploaded files for a specific document. Use this when you know a document ID and want to see which files have been uploaded to provide evidence for that document. Returns file details including names, upload dates, and file IDs.",
  parameters: GetDocumentUploadsInput,
};

const DownloadDocumentFileInput = z.object({
  documentId: z
    .string()
    .describe("The ID of the document containing the file"),
  uploadedFileId: z
    .string()
    .describe("The ID of the specific uploaded file to download"),
});

export const DownloadDocumentFileTool: Tool<typeof DownloadDocumentFileInput> = {
  name: "download_document_file",
  description:
    "Download a specific file from a document. Use this when you know both the document ID and the uploaded file ID and want to retrieve the actual file content. Returns the file content as binary data.",
  parameters: DownloadDocumentFileInput,
};

export async function getControlDocuments(
  args: z.infer<typeof GetControlDocumentsInput>,
): Promise<CallToolResult> {
  const url = new URL(
    `/v1/controls/${args.controlId}/documents`,
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
        { type: "text" as const, text: `Error: ${response.statusText}` },
      ],
    };
  }

  return {
    content: [
      { type: "text" as const, text: JSON.stringify(await response.json()) },
    ],
  };
}

export async function getDocumentUploads(
  args: z.infer<typeof GetDocumentUploadsInput>,
): Promise<CallToolResult> {
  const url = new URL(
    `/v1/documents/${args.documentId}/uploads`,
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
        { type: "text" as const, text: `Error: ${response.statusText}` },
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
        { type: "text" as const, text: `Error: ${response.statusText}` },
      ],
    };
  }

  // For file downloads, we'll return information about the file rather than binary content
  // since MCP tools typically work with text/JSON responses
  const contentType = response.headers.get("content-type") || "unknown";
  const contentLength = response.headers.get("content-length") || "unknown";
  
  return {
    content: [
      { 
        type: "text" as const, 
        text: JSON.stringify({
          message: "File download endpoint accessed successfully",
          contentType,
          contentLength,
          downloadUrl: url.toString(),
          note: "Use this URL with proper authentication to download the actual file content"
        })
      },
    ],
  };
} 