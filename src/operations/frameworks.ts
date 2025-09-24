import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { baseApiUrl } from "../api.js";
import { Tool } from "../types.js";
import { z } from "zod";
import { makeAuthenticatedRequest } from "./utils.js";
import {
  PAGE_SIZE_DESCRIPTION,
  PAGE_CURSOR_DESCRIPTION,
  FRAMEWORK_ID_DESCRIPTION,
} from "./global-descriptions.js";

const ListFrameworksInput = z.object({
  pageSize: z.number().describe(PAGE_SIZE_DESCRIPTION).optional(),
  pageCursor: z.string().describe(PAGE_CURSOR_DESCRIPTION).optional(),
});

export const ListFrameworksTool: Tool<typeof ListFrameworksInput> = {
  name: "list_frameworks",
  description:
    "List all compliance frameworks available in your Vanta account (SOC 2, ISO 27001, HIPAA, GDPR, FedRAMP, PCI, etc.) along with completion status and progress metrics. Shows which frameworks you're actively pursuing and their current compliance state including status of controls, documents, and tests for each framework.",
  parameters: ListFrameworksInput,
};

const ListFrameworkControlsInput = z.object({
  frameworkId: z.string().describe(FRAMEWORK_ID_DESCRIPTION),
  pageSize: z.number().describe(PAGE_SIZE_DESCRIPTION).optional(),
  pageCursor: z.string().describe(PAGE_CURSOR_DESCRIPTION).optional(),
});

export const ListFrameworkControlsTool: Tool<typeof ListFrameworkControlsInput> =
  {
    name: "list_framework_controls",
    description:
      "Get the detailed CONTROL REQUIREMENTS for a specific framework (requires frameworkId). Use this when you need the specific control details, requirements, and implementation guidance for a known framework like 'soc2' or 'iso27001'. This returns the actual security controls and their descriptions, NOT the framework list. Use list_frameworks first if you need to see available frameworks.",
    parameters: ListFrameworkControlsInput,
  };

const GetFrameworkInput = z.object({
  frameworkId: z.string().describe(FRAMEWORK_ID_DESCRIPTION),
});

export const GetFrameworkTool: Tool<typeof GetFrameworkInput> = {
  name: "get_framework",
  description:
    "Get framework by ID. Retrieve detailed information about a specific compliance framework when its ID is known. The ID of a framework can be found from list_frameworks response. Returns complete framework details including name, description, completion status, progress metrics, and compliance state.",
  parameters: GetFrameworkInput,
};

export async function listFrameworkControls(
  args: z.infer<typeof ListFrameworkControlsInput>,
): Promise<CallToolResult> {
  const url = new URL(
    `/v1/frameworks/${args.frameworkId}/controls`,
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

export async function listFrameworks(
  args: z.infer<typeof ListFrameworksInput>,
): Promise<CallToolResult> {
  const url = new URL("/v1/frameworks", baseApiUrl());
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

export async function getFramework(
  args: z.infer<typeof GetFrameworkInput>,
): Promise<CallToolResult> {
  const url = new URL(`/v1/frameworks/${args.frameworkId}`, baseApiUrl());

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
