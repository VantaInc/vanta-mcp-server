import { baseApiUrl } from "./api.js";
import { z } from "zod";

export async function getTests(
  args: z.infer<typeof GetTestsInput>
) {
    const url = new URL('/v1/tests', baseApiUrl());
    
    if (args.pageSize) {
        url.searchParams.append('pageSize', args.pageSize.toString());
    }
    if (args.statusFilter) {
        url.searchParams.append('statusFilter', args.statusFilter);
    }
    if (args.integrationFilter) {
        url.searchParams.append('integrationFilter', args.integrationFilter);
    }
    if (args.categoryFilter) {
        url.searchParams.append('categoryFilter', args.categoryFilter);
    }

    let headers: Record<string, string> = {};
    if (process.env.VANTA_API_KEY) {
      headers["Authorization"] = `Bearer ${process.env.VANTA_API_KEY}`;
    }
    const response = await fetch(url.toString(), {
      headers,
    });
  
    if (!response.ok) {
      return {
        content: [{ type: "text" as const, text: `Url: ${url.toString()}, Error: ${response.statusText}` }],
      };
    }
  
    return {
      content: [{ type: "text" as const, text: JSON.stringify(await response.json()) }],
    };
}

export const GetTestsInput = z.object({
    pageSize: z.number().optional(),
    statusFilter: z.string().optional(),
    integrationFilter: z.string().optional(), 
    categoryFilter: z.string().optional()
});
  