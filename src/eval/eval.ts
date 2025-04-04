import OpenAI from "openai";
import { zodToJsonSchema } from "zod-to-json-schema";
import { GetTestsTool } from "../operations/tests.js";

// Format tool for OpenAI
const tool = {
  name: GetTestsTool.name,
  description: GetTestsTool.description,
  parameters: zodToJsonSchema(GetTestsTool.parameters),
  type: "function" as const,
  strict: false,
};

// Test inputs
const testCases = [
  "Tell me what the security findings are for my aws infrastructure", // Should call get_tests with aws and NEEDS_ATTENTION
  "I'm working on the /v1/users endpoint. What tests should I write?", // Shouldn't call get_tests
  "I want to gather evidence for a SOC2 compliance audit. What checks do I have running?", // Should call get_tests
];

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

for (const input of testCases) {
  const res = await openai.responses.create({
    model: "gpt-4o",
    input: [{ role: "user", content: input }],
    tools: [tool],
    tool_choice: "auto",
  });

  console.log("\n==== User Prompt ====");
  console.log(input);
  console.log("==== Result ====");
  console.dir(res.output);
}
