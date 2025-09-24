// 1. Imports
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { Tool } from "../types.js";
import { z } from "zod";
import {
  createFilterSchema,
  createIdSchema,
  makePaginatedGetRequest,
  makeGetByIdRequest,
} from "./utils.js";

// 2. Input Schemas
const ListRisksInput = createFilterSchema({
  categoryMatchesAny: z
    .string()
    .optional()
    .describe(
      "Filter by risk category. Example: Access Control, Cryptography, Privacy, etc.",
    ),
});

const GetRiskInput = createIdSchema({
  paramName: "riskId",
  description:
    "Risk scenario ID to retrieve, e.g. 'risk-scenario-123' or specific risk identifier",
});

// 3. Tool Definitions
export const ListRisksTool: Tool<typeof ListRisksInput> = {
  name: "list_risks",
  description: "List all risk scenarios in your Vanta risk register.",
  parameters: ListRisksInput,
};

export const GetRiskTool: Tool<typeof GetRiskInput> = {
  name: "get_risk",
  description:
    "Get risk scenario by ID. Retrieve detailed information about a specific risk scenario when its ID is known. The ID of a risk scenario can be found from list_risks response. Returns complete risk details including status, inherent & residual risk scores, treatment plan, and more.",
  parameters: GetRiskInput,
};

// 4. Implementation Functions
export async function listRisks(
  args: z.infer<typeof ListRisksInput>,
): Promise<CallToolResult> {
  return makePaginatedGetRequest("/v1/risk-scenarios", args);
}

export async function getRisk(
  args: z.infer<typeof GetRiskInput>,
): Promise<CallToolResult> {
  return makeGetByIdRequest("/v1/risk-scenarios", args.riskId);
}

// Registry export for automated tool registration
export default {
  tools: [
    { tool: ListRisksTool, handler: listRisks },
    { tool: GetRiskTool, handler: getRisk },
  ],
};
