// 1. Imports
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { Tool } from "../types.js";
import { z } from "zod";
import {
  createPaginationSchema,
  createIdSchema,
  makePaginatedGetRequest,
  makeGetByIdRequest,
} from "./utils.js";

// 2. Input Schemas
const ListVulnerabilitiesInput = createPaginationSchema();

const GetVulnerabilityInput = createIdSchema({
  paramName: "vulnerabilityId",
  description:
    "Vulnerability ID to retrieve, e.g. 'vulnerability-123' or specific vulnerability identifier",
});

// 3. Tool Definitions
export const ListVulnerabilitiesTool: Tool<typeof ListVulnerabilitiesInput> = {
  name: "list_vulnerabilities",
  description:
    "List all vulnerabilities in your Vanta account. Returns vulnerability IDs, severity levels, affected systems, and remediation status. Use this to see all identified security vulnerabilities for risk management.",
  parameters: ListVulnerabilitiesInput,
};

export const GetVulnerabilityTool: Tool<typeof GetVulnerabilityInput> = {
  name: "get_vulnerability",
  description:
    "Get vulnerability by ID. Retrieve detailed information about a specific vulnerability when its ID is known. The ID of a vulnerability can be found from list_vulnerabilities response. Returns complete vulnerability details including description, CVSS scores, affected assets, and remediation guidance.",
  parameters: GetVulnerabilityInput,
};

// 4. Implementation Functions
export async function listVulnerabilities(
  args: z.infer<typeof ListVulnerabilitiesInput>,
): Promise<CallToolResult> {
  return makePaginatedGetRequest("/v1/vulnerabilities", args);
}

export async function getVulnerability(
  args: z.infer<typeof GetVulnerabilityInput>,
): Promise<CallToolResult> {
  return makeGetByIdRequest("/v1/vulnerabilities", args.vulnerabilityId);
}
