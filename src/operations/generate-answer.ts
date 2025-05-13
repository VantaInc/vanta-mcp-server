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

  const jsonResponse: unknown = await response.json();
  const parsedResponse = GeneratedAnswerSchema.parse(jsonResponse);
  return {
    content: [
      {
        type: "text" as const,
        text: parsedResponse.answer?.answer ?? "No answer found",
      },
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

const AnswerLibraryReferenceSchema = z.object({
  id: z.string(),
  question: z.string(),
  answer: z.string(),
  sourceUrl: z.string(),
  sourceName: z.string(),
  rank: z.number(),
});

const ResourceReferenceSchema = z.object({
  id: z.string(),
  text: z.string(),
  sourceUrl: z.string(),
  sourceName: z.string(),
  rank: z.number(),
});

export enum GeneratedAnswerOrigin {
  AI = "AI",
  ANSWER_LIBRARY = "ANSWER_LIBRARY",
}

const AnswerSchema = z.object({
  answer: z.string(),
  references: z.object({
    answerLibrary: z.array(AnswerLibraryReferenceSchema),
    resources: z.array(ResourceReferenceSchema),
  }),
  origin: z.nativeEnum(GeneratedAnswerOrigin),
});

export const GeneratedAnswerSchema = z.object({
  id: z.string(),
  question: z.string(),
  answer: z.nullable(AnswerSchema),
});
