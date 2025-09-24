import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { baseApiUrl } from "../api.js";
import { Tool } from "../types.js";
import { z } from "zod";
import { makeAuthenticatedRequest } from "./utils.js";
import {
  PAGE_SIZE_DESCRIPTION,
  PAGE_CURSOR_DESCRIPTION,
} from "./global-descriptions.js";

const ListVulnerabilitiesInput = z.object({
  pageSize: z.number().describe(PAGE_SIZE_DESCRIPTION).optional(),
  pageCursor: z.string().describe(PAGE_CURSOR_DESCRIPTION).optional(),
});

export const ListVulnerabilitiesTool: Tool<typeof ListVulnerabilitiesInput> = {
  name: "list_vulnerabilities",
  description:
    "Get vulnerabilities in your Vanta account. Returns vulnerability IDs, CVE information, severity levels, and affected assets for security monitoring and remediation. Use this to see all vulnerabilities detected across your infrastructure and applications.",
  parameters: ListVulnerabilitiesInput,
};

const GetVulnerabilityInput = z.object({
  vulnerabilityId: z
    .string()
    .describe(
      "Vulnerability ID to retrieve, e.g. 'vuln-123' or specific vulnerability identifier",
    ),
});

export const GetVulnerabilityTool: Tool<typeof GetVulnerabilityInput> =
  {
    name: "get_vulnerability",
    description:
      "Get vulnerability by ID. Retrieve detailed information about a specific vulnerability when its ID is known. The ID of a vulnerability can be found from list_vulnerabilities response. Returns complete vulnerability details including CVE information, severity, affected assets, and remediation status.",
    parameters: GetVulnerabilityInput,
  };

export async function listVulnerabilities(
  args: z.infer<typeof ListVulnerabilitiesInput>,
): Promise<CallToolResult> {
  const url = new URL("/v1/vulnerabilities", baseApiUrl());

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

export async function getVulnerability(
  args: z.infer<typeof GetVulnerabilityInput>,
): Promise<CallToolResult> {
  const url = new URL(
    `/v1/vulnerabilities/${args.vulnerabilityId}`,
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

  return {
    content: [
      { type: "text" as const, text: JSON.stringify(await response.json()) },
    ],
  };
}
