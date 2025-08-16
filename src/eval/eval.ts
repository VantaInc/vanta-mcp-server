import OpenAI from "openai";
import { zodToJsonSchema } from "zod-to-json-schema";
import { GetTestsTool, GetTestEntitiesTool } from "../operations/tests.js";
import {
  GetFrameworksTool,
  GetFrameworkControlsTool,
} from "../operations/frameworks.js";
import {
  GetControlsTool,
  GetControlTestsTool,
} from "../operations/controls.js";
import { GetRisksTool } from "../operations/risks.js";

// Format all tools for OpenAI
const tools = [
  {
    type: "function" as const,
    function: {
      name: GetTestsTool.name,
      description: GetTestsTool.description,
      parameters: zodToJsonSchema(GetTestsTool.parameters),
    },
  },
  {
    type: "function" as const,
    function: {
      name: GetTestEntitiesTool.name,
      description: GetTestEntitiesTool.description,
      parameters: zodToJsonSchema(GetTestEntitiesTool.parameters),
    },
  },
  {
    type: "function" as const,
    function: {
      name: GetFrameworksTool.name,
      description: GetFrameworksTool.description,
      parameters: zodToJsonSchema(GetFrameworksTool.parameters),
    },
  },
  {
    type: "function" as const,
    function: {
      name: GetFrameworkControlsTool.name,
      description: GetFrameworkControlsTool.description,
      parameters: zodToJsonSchema(GetFrameworkControlsTool.parameters),
    },
  },
  {
    type: "function" as const,
    function: {
      name: GetControlsTool.name,
      description: GetControlsTool.description,
      parameters: zodToJsonSchema(GetControlsTool.parameters),
    },
  },
  {
    type: "function" as const,
    function: {
      name: GetControlTestsTool.name,
      description: GetControlTestsTool.description,
      parameters: zodToJsonSchema(GetControlTestsTool.parameters),
    },
  },
  {
    type: "function" as const,
    function: {
      name: GetRisksTool.name,
      description: GetRisksTool.description,
      parameters: zodToJsonSchema(GetRisksTool.parameters),
    },
  },
];

// Test cases with expected tool calls
interface TestCase {
  prompt: string;
  expectedTool: string;
  expectedParams?: Record<string, unknown>;
  description: string;
}

const testCases: TestCase[] = [
  {
    prompt: "What security issues do I have in my AWS infrastructure?",
    expectedTool: "get_tests",
    expectedParams: {
      statusFilter: "NEEDS_ATTENTION",
      integrationFilter: "aws",
    },
    description:
      "Should call get_tests with AWS filter and NEEDS_ATTENTION status",
  },
  {
    prompt: "Show me all my SOC2 compliance tests that are failing",
    expectedTool: "get_tests",
    expectedParams: {
      frameworkFilter: "soc2",
      statusFilter: "NEEDS_ATTENTION",
    },
    description: "Should call get_tests with SOC2 framework filter",
  },
  {
    prompt:
      "Show me the specific failing entities for test ID aws-security-groups-open-to-world",
    expectedTool: "get_test_entities",
    expectedParams: { testId: "aws-security-groups-open-to-world" },
    description: "Should call get_test_entities for specific test details",
  },
  {
    prompt: "What compliance frameworks are we tracking?",
    expectedTool: "get_frameworks",
    expectedParams: {},
    description: "Should call get_frameworks to list available frameworks",
  },
  {
    prompt: "Get the control requirements for framework ID soc2",
    expectedTool: "get_framework_controls",
    expectedParams: { frameworkId: "soc2" },
    description: "Should call get_framework_controls for SOC2",
  },
  {
    prompt: "What is the current % status of my SOC 2?",
    expectedTool: "get_frameworks",
    expectedParams: {},
    description: "Should call get_frameworks to get SOC2 completion percentage",
  },
  {
    prompt: "List all security controls in my Vanta account",
    expectedTool: "get_controls",
    expectedParams: {},
    description: "Should call get_controls to list all available controls",
  },
  {
    prompt: "Show me the tests for control ID access-control-1",
    expectedTool: "get_control_tests",
    expectedParams: { controlId: "access-control-1" },
    description: "Should call get_control_tests for specific control",
  },
  {
    prompt: "What programming tests should I write for my API?",
    expectedTool: "none",
    expectedParams: {},
    description:
      "Should NOT call any Vanta tools - this is about code testing, not compliance",
  },
  {
    prompt: "Help me debug this JavaScript function",
    expectedTool: "none",
    expectedParams: {},
    description:
      "Should NOT call any Vanta tools - this is about code debugging",
  },
];

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

console.log("🧪 Vanta MCP Server Tool Evaluation");
console.log("====================================\n");

let passedTests = 0;
let totalTests = testCases.length;

for (const testCase of testCases) {
  console.log(`📝 Test: ${testCase.description}`);
  console.log(`💬 Prompt: "${testCase.prompt}"`);
  console.log(`🎯 Expected Tool: ${testCase.expectedTool}`);

  try {
    const res = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: testCase.prompt }],
      tools: tools,
      tool_choice: "auto",
    });

    const toolCalls = res.choices[0]?.message?.tool_calls;

    if (testCase.expectedTool === "none") {
      if (!toolCalls || toolCalls.length === 0) {
        console.log("✅ PASS: Correctly did not call any tools");
        passedTests++;
      } else {
        console.log(
          `❌ FAIL: Should not have called tools, but called: ${toolCalls.map(tc => tc.function.name).join(", ")}`,
        );
      }
    } else {
      if (toolCalls && toolCalls.length > 0) {
        const calledTool = toolCalls[0].function.name;
        const calledParams = JSON.parse(
          toolCalls[0].function.arguments,
        ) as Record<string, unknown>;

        if (calledTool === testCase.expectedTool) {
          console.log(`✅ PASS: Correctly called ${calledTool}`);

          // Check specific parameters if provided
          if (
            testCase.expectedParams &&
            Object.keys(testCase.expectedParams).length > 0
          ) {
            let paramsMatch = true;
            for (const [key, value] of Object.entries(
              testCase.expectedParams,
            )) {
              if (calledParams[key] !== value) {
                paramsMatch = false;
                break;
              }
            }
            if (paramsMatch) {
              console.log("✅ Parameters match expected values");
            } else {
              console.log(
                `⚠️  Parameters don't fully match. Expected: ${JSON.stringify(testCase.expectedParams)}, Got: ${JSON.stringify(calledParams)}`,
              );
            }
          }

          console.log(
            `📋 Called with: ${JSON.stringify(calledParams, null, 2)}`,
          );
          passedTests++;
        } else {
          console.log(
            `❌ FAIL: Expected ${testCase.expectedTool}, but called ${calledTool}`,
          );
        }
      } else {
        console.log(
          `❌ FAIL: Expected to call ${testCase.expectedTool}, but no tools were called`,
        );
      }
    }
  } catch (error) {
    console.log(`❌ ERROR: ${String(error)}`);
  }

  console.log(""); // Empty line for spacing
}

console.log("📊 Final Results");
console.log("================");
console.log(
  `✅ Passed: ${passedTests.toString()}/${totalTests.toString()} tests`,
);
console.log(
  `❌ Failed: ${(totalTests - passedTests).toString()}/${totalTests.toString()} tests`,
);
console.log(
  `📈 Success Rate: ${Math.round((passedTests / totalTests) * 100).toString()}%`,
);

if (passedTests === totalTests) {
  console.log(
    "🎉 All tests passed! Tool calling behavior is working correctly.",
  );
} else {
  console.log(
    "⚠️  Some tests failed. Review the tool descriptions or test cases.",
  );
}
