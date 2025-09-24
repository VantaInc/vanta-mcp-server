import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { baseApiUrl } from "../api.js";
import { Tool } from "../types.js";
import { z } from "zod";
import { makeAuthenticatedRequest } from "./utils.js";
import {
  PAGE_SIZE_DESCRIPTION,
  PAGE_CURSOR_DESCRIPTION,
  CONTROL_ID_DESCRIPTION,
} from "./global-descriptions.js";

const ListControlsInput = z.object({
  pageSize: z.number().describe(PAGE_SIZE_DESCRIPTION).optional(),
  pageCursor: z.string().describe(PAGE_CURSOR_DESCRIPTION).optional(),
  frameworkMatchesAny: z
    .array(z.string())
    .describe(
      "Filter controls by framework IDs. Returns controls that belong to any of the specified frameworks, e.g. ['soc2', 'iso27001', 'hipaa']",
    )
    .optional(),
});

export const ListControlsTool: Tool<typeof ListControlsInput> = {
  name: "list_controls",
  description:
    "List all security controls across all frameworks in your Vanta account. Returns control names, descriptions, framework mappings, and current implementation status. Use this to see all available controls or to find a specific control ID for use with other tools. Optionally filter by specific frameworks using frameworkMatchesAny.",
  parameters: ListControlsInput,
};

const ListControlTestsInput = z.object({
  controlId: z.string().describe(CONTROL_ID_DESCRIPTION),
  pageSize: z.number().describe(PAGE_SIZE_DESCRIPTION).optional(),
  pageCursor: z.string().describe(PAGE_CURSOR_DESCRIPTION).optional(),
});

export const ListControlTestsTool: Tool<typeof ListControlTestsInput> = {
  name: "list_control_tests",
  description:
    "List a control's tests. Get all automated tests that validate a specific security control. Use this when you know a control ID and want to see which specific tests monitor compliance for that control. Returns test details, current status, and any failing entities for the control's tests.",
  parameters: ListControlTestsInput,
};

const ListLibraryControlsInput = z.object({
  pageSize: z.number().describe(PAGE_SIZE_DESCRIPTION).optional(),
  pageCursor: z.string().describe(PAGE_CURSOR_DESCRIPTION).optional(),
});

export const ListLibraryControlsTool: Tool<typeof ListLibraryControlsInput> = {
  name: "list_library_controls",
  description:
    "List Vanta controls from the library. These are pre-built security controls available in Vanta's control library that can be added to your account. Different from list_controls which lists controls already in your account - this shows available controls you can implement.",
  parameters: ListLibraryControlsInput,
};

const ListControlDocumentsInput = z.object({
  controlId: z.string().describe(CONTROL_ID_DESCRIPTION),
  pageSize: z.number().describe(PAGE_SIZE_DESCRIPTION).optional(),
  pageCursor: z.string().describe(PAGE_CURSOR_DESCRIPTION).optional(),
});

export const ListControlDocumentsTool: Tool<typeof ListControlDocumentsInput> = {
  name: "list_control_documents",
  description:
    "List a control's documents. Get all documents that are associated with or provide evidence for a specific security control. Use this when you know a control ID and want to see which documents are mapped to that control for compliance evidence.",
  parameters: ListControlDocumentsInput,
};

const GetControlInput = z.object({
  controlId: z.string().describe(CONTROL_ID_DESCRIPTION),
});

export const GetControlTool: Tool<typeof GetControlInput> = {
  name: "get_control",
  description:
    "Get control by an ID. Retrieve detailed information about a specific security control when its ID is known. The ID of a control can be found from list_controls or list_framework_controls responses. Returns complete control details including name, description, framework mappings, and implementation status.",
  parameters: GetControlInput,
};

export async function listControls(
  args: z.infer<typeof ListControlsInput>,
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

export async function listControlTests(
  args: z.infer<typeof ListControlTestsInput>,
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

export async function listLibraryControls(
  args: z.infer<typeof ListLibraryControlsInput>,
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

export async function listControlDocuments(
  args: z.infer<typeof ListControlDocumentsInput>,
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

export async function getControl(
  args: z.infer<typeof GetControlInput>,
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
