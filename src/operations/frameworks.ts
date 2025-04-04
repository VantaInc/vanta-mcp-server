import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { env } from "process";
import { baseApiUrl } from "../api.js";
import { Tool } from "../types.js";
import { z } from "zod";

const GetFrameworksInput = z.object({
    pageSize: z.number().optional(),
    pageCursor: z.string().optional(),
});

export const GetFrameworksTool: Tool<typeof GetFrameworksInput> = {
  name: "get_frameworks",
  description: "Lists frameworks and the status of controls, documents, and tests for each framework.",
  parameters: GetFrameworksInput,
};

const GetFrameworkControlsInput = z.object({
    frameworkId: z.string(),
    pageSize: z.number().optional(),
    pageCursor: z.string().optional(),
});

export const GetFrameworkControlsTool: Tool<typeof GetFrameworkControlsInput> = {
    name: "get_framework_controls",
    description: "Lists a framework's controls.",
    parameters: GetFrameworkControlsInput,
};

export async function getFrameworkControls(args: z.infer<typeof GetFrameworkControlsInput>): Promise<CallToolResult> {
    const url = new URL(`/v1/frameworks/${args.frameworkId}/controls`, baseApiUrl());
    if (args.pageSize !== undefined) {
        url.searchParams.append("pageSize", args.pageSize.toString());
    }
    if (args.pageCursor !== undefined) {
        url.searchParams.append("pageCursor", args.pageCursor);
    }

    const response = await fetch(url.toString(), {
        headers: {
            "Authorization": `Bearer ${env.VANTA_API_KEY}`
        }
    
    });
    if (!response.ok) {
        return {
            content: [{ type: "text" as const, text: `Error: ${response.statusText}` }],
        };
    }

    return {
        content: [{ type: "text" as const, text: JSON.stringify(await response.json()) }],
    };
}

export async function getFrameworks(args: z.infer<typeof GetFrameworksInput>): Promise<CallToolResult> {
    const url = new URL("/v1/frameworks", baseApiUrl());
    if (args.pageSize !== undefined) {
        url.searchParams.append("pageSize", args.pageSize.toString());
    }
    if (args.pageCursor !== undefined) {
        url.searchParams.append("pageCursor", args.pageCursor);
    }

    const response = await fetch(url.toString(), {
        headers: {
            "Authorization": `Bearer ${env.VANTA_API_KEY}`
        }
    });

    if (!response.ok) {
        return {
            content: [{ type: "text" as const, text: `Error: ${response.statusText}` }],
        };
    }

    return {
        content: [{ type: "text" as const, text: JSON.stringify(await response.json()) }],
    };
}