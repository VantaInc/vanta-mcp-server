import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { baseApiUrl } from "../api.js";
import { Tool } from "../types.js";
import { z } from "zod";
import { makeAuthenticatedRequest } from "./utils.js";
import {
  PAGE_SIZE_DESCRIPTION,
  PAGE_CURSOR_DESCRIPTION,
} from "../global-descriptions.js";

const GetFrameworksInput = z.object({
  pageSize: z.number().describe(PAGE_SIZE_DESCRIPTION).optional(),
  pageCursor: z.string().describe(PAGE_CURSOR_DESCRIPTION).optional(),
});

export const GetFrameworksTool: Tool<typeof GetFrameworksInput> = {
  name: "get_frameworks",
  description:
    "List all compliance frameworks available in your Vanta account (SOC 2, ISO 27001, HIPAA, GDPR, FedRAMP, PCI, etc.) along with completion status and progress metrics. Shows which frameworks you're actively pursuing and their current compliance state including status of controls, documents, and tests for each framework.",
  parameters: GetFrameworksInput,
};

const GetFrameworkControlsInput = z.object({
  frameworkId: z.string(),
  pageSize: z.number().describe(PAGE_SIZE_DESCRIPTION).optional(),
  pageCursor: z.string().describe(PAGE_CURSOR_DESCRIPTION).optional(),
});

export const GetFrameworkControlsTool: Tool<typeof GetFrameworkControlsInput> =
  {
    name: "get_framework_controls",
    description:
      "Get the detailed CONTROL REQUIREMENTS for a specific framework (requires frameworkId). Use this when you need the specific control details, requirements, and implementation guidance for a known framework like 'soc2' or 'iso27001'. This returns the actual security controls and their descriptions, NOT the framework list. Use get_frameworks first if you need to see available frameworks.",
    parameters: GetFrameworkControlsInput,
  };

const GetFrameworkByIdInput = z.object({
  frameworkId: z
    .string()
    .describe(
      "Framework ID to retrieve, e.g. 'soc2', 'iso27001', 'hipaa', 'gdpr'",
    ),
});

export const GetFrameworkByIdTool: Tool<typeof GetFrameworkByIdInput> = {
  name: "get_framework_by_id",
  description:
    "Get framework by ID. Retrieve detailed information about a specific compliance framework when its ID is known. The ID of a framework can be found from get_frameworks response. Returns complete framework details including name, description, completion status, progress metrics, and compliance state.",
  parameters: GetFrameworkByIdInput,
};

export async function getFrameworkControls(
  args: z.infer<typeof GetFrameworkControlsInput>,
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

export async function getFrameworks(
  args: z.infer<typeof GetFrameworksInput>,
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

export async function getFrameworkById(
  args: z.infer<typeof GetFrameworkByIdInput>,
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
