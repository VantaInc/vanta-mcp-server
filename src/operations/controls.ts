import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { baseApiUrl } from "../api.js";
import { Tool } from "../types.js";
import { z } from "zod";
import { makeAuthenticatedRequest } from "./utils.js";
import {
  PAGE_SIZE_DESCRIPTION,
  PAGE_CURSOR_DESCRIPTION,
} from "../global-descriptions.js";

const GetControlsInput = z.object({
  pageSize: z.number().describe(PAGE_SIZE_DESCRIPTION).optional(),
  pageCursor: z.string().describe(PAGE_CURSOR_DESCRIPTION).optional(),
  frameworkMatchesAny: z
    .array(z.string())
    .describe(
      "Filter controls by framework IDs. Returns controls that belong to any of the specified frameworks, e.g. ['soc2', 'iso27001', 'hipaa']",
    )
    .optional(),
});

export const GetControlsTool: Tool<typeof GetControlsInput> = {
  name: "get_controls",
  description:
    "List all security controls across all frameworks in your Vanta account. Returns control names, descriptions, framework mappings, and current implementation status. Use this to see all available controls or to find a specific control ID for use with other tools. Optionally filter by specific frameworks using frameworkMatchesAny.",
  parameters: GetControlsInput,
};

const GetControlTestsInput = z.object({
  controlId: z
    .string()
    .describe(
      "Control ID to get tests for, e.g. 'access-control-1' or 'data-protection-2'",
    ),
  pageSize: z.number().describe(PAGE_SIZE_DESCRIPTION).optional(),
  pageCursor: z.string().describe(PAGE_CURSOR_DESCRIPTION).optional(),
});

export const GetControlTestsTool: Tool<typeof GetControlTestsInput> = {
  name: "get_control_tests",
  description:
    "List a control's tests. Get all automated tests that validate a specific security control. Use this when you know a control ID and want to see which specific tests monitor compliance for that control. Returns test details, current status, and any failing entities for the control's tests.",
  parameters: GetControlTestsInput,
};

const GetLibraryControlsInput = z.object({
  pageSize: z.number().describe(PAGE_SIZE_DESCRIPTION).optional(),
  pageCursor: z.string().describe(PAGE_CURSOR_DESCRIPTION).optional(),
});

export const GetLibraryControlsTool: Tool<typeof GetLibraryControlsInput> = {
  name: "get_library_controls",
  description:
    "List Vanta controls from the library. These are pre-built security controls available in Vanta's control library that can be added to your account. Different from get_controls which lists controls already in your account - this shows available controls you can implement.",
  parameters: GetLibraryControlsInput,
};

const GetControlDocumentsInput = z.object({
  controlId: z
    .string()
    .describe(
      "Control ID to get documents for, e.g. 'access-control-1' or 'data-protection-2'",
    ),
  pageSize: z.number().describe(PAGE_SIZE_DESCRIPTION).optional(),
  pageCursor: z.string().describe(PAGE_CURSOR_DESCRIPTION).optional(),
});

export const GetControlDocumentsTool: Tool<typeof GetControlDocumentsInput> = {
  name: "get_control_documents",
  description:
    "List a control's documents. Get all documents that are associated with or provide evidence for a specific security control. Use this when you know a control ID and want to see which documents are mapped to that control for compliance evidence.",
  parameters: GetControlDocumentsInput,
};

const GetControlByIdInput = z.object({
  controlId: z
    .string()
    .describe(
      "Control ID to retrieve, e.g. 'access-control-1' or 'data-protection-2'",
    ),
});

export const GetControlByIdTool: Tool<typeof GetControlByIdInput> = {
  name: "get_control_by_id",
  description:
    "Get control by an ID. Retrieve detailed information about a specific security control when its ID is known. The ID of a control can be found from get_controls or get_framework_controls responses. Returns complete control details including name, description, framework mappings, and implementation status.",
  parameters: GetControlByIdInput,
};

export async function getControls(
  args: z.infer<typeof GetControlsInput>,
): Promise<CallToolResult> {
  const url = new URL("/v1/controls", baseApiUrl());

  if (args.pageSize !== undefined) {
    url.searchParams.append("pageSize", args.pageSize.toString());
  }
  if (args.pageCursor !== undefined) {
    url.searchParams.append("pageCursor", args.pageCursor);
  }
  if (args.frameworkMatchesAny !== undefined) {
    args.frameworkMatchesAny.forEach(framework => {
      url.searchParams.append("frameworkMatchesAny", framework);
    });
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

export async function getControlTests(
  args: z.infer<typeof GetControlTestsInput>,
): Promise<CallToolResult> {
  const url = new URL(`/v1/controls/${args.controlId}/tests`, baseApiUrl());

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

export async function getLibraryControls(
  args: z.infer<typeof GetLibraryControlsInput>,
): Promise<CallToolResult> {
  const url = new URL("/v1/controls/controls-library", baseApiUrl());

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

export async function getControlDocuments(
  args: z.infer<typeof GetControlDocumentsInput>,
): Promise<CallToolResult> {
  const url = new URL(`/v1/controls/${args.controlId}/documents`, baseApiUrl());

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

export async function getControlById(
  args: z.infer<typeof GetControlByIdInput>,
): Promise<CallToolResult> {
  const url = new URL(`/v1/controls/${args.controlId}`, baseApiUrl());

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
