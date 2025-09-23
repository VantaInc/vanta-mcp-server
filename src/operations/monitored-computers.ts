import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { baseApiUrl } from "../api.js";
import { Tool } from "../types.js";
import { z } from "zod";
import { makeAuthenticatedRequest } from "./utils.js";
import {
  PAGE_SIZE_DESCRIPTION,
  PAGE_CURSOR_DESCRIPTION,
} from "./global-descriptions.js";

const GetMonitoredComputersInput = z.object({
  pageSize: z.number().describe(PAGE_SIZE_DESCRIPTION).optional(),
  pageCursor: z.string().describe(PAGE_CURSOR_DESCRIPTION).optional(),
});

export const GetMonitoredComputersTool: Tool<typeof GetMonitoredComputersInput> = {
  name: "get_monitored_computers",
  description:
    "List monitored computers in your Vanta account. Returns computer IDs, hostnames, operating systems, and security status for endpoint security management. Use this to see all computers being monitored for compliance and security across your organization.",
  parameters: GetMonitoredComputersInput,
};

const GetMonitoredComputerByIdInput = z.object({
  computerId: z
    .string()
    .describe(
      "Computer ID to retrieve, e.g. 'computer-123' or specific computer identifier",
    ),
});

export const GetMonitoredComputerByIdTool: Tool<typeof GetMonitoredComputerByIdInput> = {
  name: "get_monitored_computer_by_id",
  description:
    "Get monitored computer by ID. Retrieve detailed information about a specific monitored computer when its ID is known. The ID of a computer can be found from get_monitored_computers response. Returns complete computer details including hostname, OS, security status, and compliance information.",
  parameters: GetMonitoredComputerByIdInput,
};

export async function getMonitoredComputers(
  args: z.infer<typeof GetMonitoredComputersInput>,
): Promise<CallToolResult> {
  const url = new URL("/v1/monitored-computers", baseApiUrl());

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

export async function getMonitoredComputerById(
  args: z.infer<typeof GetMonitoredComputerByIdInput>,
): Promise<CallToolResult> {
  const url = new URL(`/v1/monitored-computers/${args.computerId}`, baseApiUrl());

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
