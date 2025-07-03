import { baseApiUrl } from "../api.js";
import { z } from "zod";
import { Tool } from "../types.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { makeAuthenticatedRequest } from "./utils.js";

export async function getDocuments(
  args: z.infer<typeof GetDocumentsInput>,
): Promise<CallToolResult> {
  const url = new URL("/v1/documents", baseApiUrl());

  if (args.pageSize !== undefined) {
    url.searchParams.append("pageSize", args.pageSize.toString());
  }
  if (args.pageCursor !== undefined) {
    url.searchParams.append("pageCursor", args.pageCursor);
  }  
  if (args.frameworkMatchesAny !== undefined) {
    url.searchParams.append("frameworkMatchesAny", args.frameworkMatchesAny);
  }
  if (args.statusMatchesAny !== undefined) {
    url.searchParams.append("statusMatchesAny", args.statusMatchesAny);
  }

  const response = await makeAuthenticatedRequest(url.toString());

  if (!response.ok) {
    return {
      content: [
        {
          type: "text" as const,
          text: `Url: ${url.toString()}, Error: ${response.statusText}`,
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

export async function getDocumentControls(
  args: z.infer<typeof GetDocumentControlsInput>,
): Promise<CallToolResult> {
  const url = new URL(`/v1/documents/${args.documentId}/controls`, baseApiUrl());
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
          text: `Url: ${url.toString()}, Error: ${response.statusText}`,
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

const TOOL_DESCRIPTION = `Retrieve Vanta's document requirements. Filter by status (OK, Needs document, Needs update, Not relevant) and/or compliance framework (soc2, iso27001, hipaa).`;

const DOCUMENT_STATUS_FILTER_DESCRIPTION = `Filter documents by their status.
Helpful for retrieving only relevant or actionable results.
Possible values: OK, Needs document, Needs update, Not relevant.`;

const PAGE_SIZE_DESCRIPTION = `Controls the maximum number of tests returned in a single response.
Allowed values: 1–100. Default is 10.`;

const FRAMEWORK_FILTER_DESCRIPTION = `Filter by framework. Non-exhaustive examples: soc2, ccpa, fedramp`;

export const GetDocumentsInput = z.object({
  pageSize: z.number().describe(PAGE_SIZE_DESCRIPTION).optional(),
  pageCursor: z.string().describe("Used for pagination. Leave blank to start from the first page.").optional(),
  statusMatchesAny: z.string().describe(DOCUMENT_STATUS_FILTER_DESCRIPTION).optional(),
  frameworkMatchesAny: z.string().describe(FRAMEWORK_FILTER_DESCRIPTION).optional(),
});

export const GetDocumentsTool: Tool<typeof GetDocumentsInput> = {
  name: "get_documents",
  description: TOOL_DESCRIPTION,
  parameters: GetDocumentsInput,
};

export const GetDocumentControlsInput = z.object({
  documentId: z.string().describe("Lowercase with hyphens"),
  pageSize: z.number().describe(PAGE_SIZE_DESCRIPTION).optional(),
  pageCursor: z.string().describe("Used for pagination. Leave blank to start from the first page.").optional(),
});

export const GetDocumentControlsTool: Tool<typeof GetDocumentControlsInput> = {
  name: "get_document_controls",
  description: "Get the controls associated to the specified document.",
  parameters: GetDocumentControlsInput,
};