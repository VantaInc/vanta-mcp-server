import { baseApiUrl } from "./api.js";
import { z } from "zod";
import type { CallToolResult } from "@modelcontextprotocol/sdk/types.d.ts";
import { env } from "node:process";

export async function getTests(
  args: z.infer<typeof GetTestsInput>,
): Promise<CallToolResult> {
  const url = new URL("/v1/tests", baseApiUrl());

  if (args.pageSize !== undefined) {
    url.searchParams.append("pageSize", args.pageSize.toString());
  }
  if (args.statusFilter !== undefined) {
    url.searchParams.append("statusFilter", args.statusFilter);
  }
  if (args.integrationFilter !== undefined) {
    url.searchParams.append("integrationFilter", args.integrationFilter);
  }
  if (args.categoryFilter !== undefined) {
    url.searchParams.append("categoryFilter", args.categoryFilter);
  }

  let headers: Record<string, string> = {};

  if (env.VANTA_API_KEY != null) {
    headers.Authorization = `Bearer ${env.VANTA_API_KEY}`;
  }
  const response = await fetch(url.toString(), {
    headers,
  });

  if (!response.ok) {
    return {
      content: [
        {
          type: "text" as const,
          text: `Url: ${url.toString()}, Error: ${response.statusText}`,
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

export const GetTestsInput = z.object({
  pageSize: z.number().optional(),
  statusFilter: z.string().optional(),
  integrationFilter: z.string().optional(),
  categoryFilter: z.string().optional(),
});
