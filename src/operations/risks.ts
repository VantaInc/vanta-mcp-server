import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { baseApiUrl } from "../api.js";
import { Tool } from "../types.js";
import { z } from "zod";
import { makeAuthenticatedRequest } from "./utils.js";

const GetRisksInput = z.object({
  pageSize: z
    .number()
    .optional()
    .describe(
      "Controls the maximum number of risks returned in a single response. Allowed values: 1–100. Default is 10.",
    ),
  pageCursor: z
    .string()
    .optional()
    .describe("Used for pagination. Leave blank to start from the first page."),
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
