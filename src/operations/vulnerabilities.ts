// 1. Imports
import {
  CallToolResult,
  Tool,
  z,
  createConsolidatedSchema,
  makeConsolidatedRequest,
} from "./common/imports.js";

// 2. Input Schemas
const VulnerabilitiesInput = createConsolidatedSchema(
  {
    paramName: "vulnerabilityId",
    description:
      "Vulnerability ID to retrieve, e.g. 'vulnerability-123' or specific vulnerability identifier. If provided, returns the specific vulnerability, and no other parameters may be provided. If omitted, lists all vulnerabilities with optional filtering and pagination.",
    resourceName: "vulnerability",
  },
  {
    externalVulnerabilityId: z
      .string()
      .describe(
        "Filter vulnerabilities by external vulnerability ID (e.g. CVE-2024-1234). Returns vulnerabilities that match the provided external vulnerability ID.",
      )
      .optional(),
    severity: z
      .string()
      .describe(
        "Filter vulnerabilities by severity. Possible values: LOW (Low severity), MEDIUM (Medium severity), HIGH (High severity), CRITICAL (Critical severity)",
      )
      .optional(),
    integrationId: z
      .string()
      .describe(
        "Filter vulnerabilities by integration ID. Returns vulnerabilities that are associated with the specified integration.",
      )
      .optional(),
    slaDeadlineAfter: z
      .string()
      .describe(
        "Filter vulnerabilities by SLA deadline after the specified date. Returns vulnerabilities that have an SLA deadline after the specified date. Date should be formatted as YYYY-MM-DD.",
      )
      .optional(),
    slaDeadlineBefore: z
      .string()
      .describe(
        "Filter vulnerabilities by SLA deadline before the specified date. Returns vulnerabilities that have an SLA deadline before the specified date. Date should be formatted as YYYY-MM-DD.",
      )
      .optional(),
  },
);

// 3. Tool Definitions
export const VulnerabilitiesTool: Tool<typeof VulnerabilitiesInput> = {
  name: "vulnerabilities",
  description:
    "Access vulnerabilities in your Vanta account. Provide vulnerabilityId to get a specific vulnerability, or omit to list all vulnerabilities. Returns vulnerability details, severity levels, and status for security monitoring.",
  parameters: VulnerabilitiesInput,
};

// 4. Implementation Functions
export async function vulnerabilities(
  args: z.infer<typeof VulnerabilitiesInput>,
): Promise<CallToolResult> {
  return makeConsolidatedRequest(
    "/v1/vulnerabilities",
    args,
    "vulnerabilityId",
  );
}

// Registry export for automated tool registration
export default {
  tools: [{ tool: VulnerabilitiesTool, handler: vulnerabilities }],
};
