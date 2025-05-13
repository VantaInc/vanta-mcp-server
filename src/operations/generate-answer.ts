import { baseApiUrl } from "../api.js";
import { z } from "zod";
import { env } from "node:process";
import { Tool } from "../types.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";

export async function generateAnswer(
  args: z.infer<typeof GenerateAnswerInput>,
): Promise<CallToolResult> {
  const url = new URL("/v1/questionnaire-generated-answers", baseApiUrl());

  let headers: Record<string, string> = {
    "Accept": "application/json",
    "Content-Type": "application/json",
  };

  if (env.VANTA_API_KEY != null) {
    headers.Authorization = `Bearer ${env.VANTA_API_KEY}`;
  }
  console.log({ headers });
  const response = await fetch(url.toString(), {
    method: "POST",
    headers,
    body: JSON.stringify({
      question: args.question,
    }),
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
export const GenerateAnswerInput = z.object({
  question: z.string().describe("The question to be answered."),
});

export const GenerateAnswerTool: Tool<typeof GenerateAnswerInput> = {
  name: "generate_answer",
  description: `Generate an answer to a question via RAG.`,
  parameters: GenerateAnswerInput,
};
