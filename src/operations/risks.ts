import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { baseApiUrl } from "../api.js";
import { Tool } from "../types.js";
import { z } from "zod";
import { makeAuthenticatedRequest } from "./utils.js";
import {
  PAGE_SIZE_DESCRIPTION,
  PAGE_CURSOR_DESCRIPTION,
} from "./global-descriptions.js";

const GetRisksInput = z.object({
  pageSize: z.number().describe(PAGE_SIZE_DESCRIPTION).optional(),
  pageCursor: z.string().describe(PAGE_CURSOR_DESCRIPTION).optional(),
  categoryMatchesAny: z
    .string()
    .optional()
    .describe(
      "Filter by risk category. Example: Access Control, Cryptography, Privacy, etc.",
    ),
});

export const GetRisksTool: Tool<typeof GetRisksInput> = {
  name: "get_risks",
  description: "List all risk scenarios in your Vanta risk register.",
  parameters: GetRisksInput,
};

const GetRiskByIdInput = z.object({
  riskId: z
    .string()
    .describe(
      "Risk scenario ID to retrieve, e.g. 'risk-scenario-123' or specific risk identifier",
    ),
});

export const GetRiskByIdTool: Tool<typeof GetRiskByIdInput> = {
  name: "get_risk_by_id",
  description:
    "Get risk scenario by ID. Retrieve detailed information about a specific risk scenario when its ID is known. The ID of a risk scenario can be found from get_risks response. Returns complete risk details including status, inherent & residual risk scores, treatment plan, and more.",
  parameters: GetRiskByIdInput,
};

export async function getRisks(
  args: z.infer<typeof GetRisksInput>,
): Promise<CallToolResult> {
  const url = new URL("/v1/risk-scenarios", baseApiUrl());
  if (args.pageSize !== undefined) {
    url.searchParams.append("pageSize", args.pageSize.toString());
  }
  if (args.pageCursor !== undefined) {
    url.searchParams.append("pageCursor", args.pageCursor);
  }
  if (args.categoryMatchesAny !== undefined) {
    url.searchParams.append("categoryMatchesAny", args.categoryMatchesAny);
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

export async function getRiskById(
  args: z.infer<typeof GetRiskByIdInput>,
): Promise<CallToolResult> {
  const url = new URL(`/v1/risk-scenarios/${args.riskId}`, baseApiUrl());

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
