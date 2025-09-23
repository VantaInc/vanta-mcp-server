import OpenAI from "openai";
import { zodToJsonSchema } from "zod-to-json-schema";
import { GetTestsTool, GetTestEntitiesTool } from "../operations/tests.js";
import {
  GetFrameworksTool,
  GetFrameworkControlsTool,
  GetFrameworkByIdTool,
} from "../operations/frameworks.js";
import {
  GetControlsTool,
  GetControlTestsTool,
  GetLibraryControlsTool,
  GetControlDocumentsTool,
  GetControlByIdTool,
} from "../operations/controls.js";
import { GetRisksTool, GetRiskByIdTool } from "../operations/risks.js";
import {
  GetIntegrationsTool,
  GetIntegrationByIdTool,
} from "../operations/integrations.js";
import {
  GetVendorsTool,
  GetVendorByIdTool,
} from "../operations/vendors.js";
import {
  GetDocumentsTool,
  GetDocumentByIdTool,
  GetDocumentControlsTool,
  GetDocumentLinksTool,
  GetDocumentUploadsTool,
  DownloadDocumentFileTool,
} from "../operations/documents.js";
import {
  GetPoliciesTool,
  GetPolicyByIdTool,
} from "../operations/policies.js";
import {
  GetDiscoveredVendorsTool,
  GetDiscoveredVendorAccountsTool,
} from "../operations/discovered-vendors.js";

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
      name: GetLibraryControlsTool.name,
      description: GetLibraryControlsTool.description,
      parameters: zodToJsonSchema(GetLibraryControlsTool.parameters),
    },
  },
  {
    type: "function" as const,
    function: {
      name: GetControlDocumentsTool.name,
      description: GetControlDocumentsTool.description,
      parameters: zodToJsonSchema(GetControlDocumentsTool.parameters),
    },
  },
  {
    type: "function" as const,
    function: {
      name: GetControlByIdTool.name,
      description: GetControlByIdTool.description,
      parameters: zodToJsonSchema(GetControlByIdTool.parameters),
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
  {
    type: "function" as const,
    function: {
      name: GetRiskByIdTool.name,
      description: GetRiskByIdTool.description,
      parameters: zodToJsonSchema(GetRiskByIdTool.parameters),
    },
  },
  {
    type: "function" as const,
    function: {
      name: GetFrameworkByIdTool.name,
      description: GetFrameworkByIdTool.description,
      parameters: zodToJsonSchema(GetFrameworkByIdTool.parameters),
    },
  },
  {
    type: "function" as const,
    function: {
      name: GetIntegrationsTool.name,
      description: GetIntegrationsTool.description,
      parameters: zodToJsonSchema(GetIntegrationsTool.parameters),
    },
  },
  {
    type: "function" as const,
    function: {
      name: GetIntegrationByIdTool.name,
      description: GetIntegrationByIdTool.description,
      parameters: zodToJsonSchema(GetIntegrationByIdTool.parameters),
    },
  },
  {
    type: "function" as const,
    function: {
      name: GetVendorsTool.name,
      description: GetVendorsTool.description,
      parameters: zodToJsonSchema(GetVendorsTool.parameters),
    },
  },
  {
    type: "function" as const,
    function: {
      name: GetVendorByIdTool.name,
      description: GetVendorByIdTool.description,
      parameters: zodToJsonSchema(GetVendorByIdTool.parameters),
    },
  },
  {
    type: "function" as const,
    function: {
      name: GetDocumentsTool.name,
      description: GetDocumentsTool.description,
      parameters: zodToJsonSchema(GetDocumentsTool.parameters),
    },
  },
  {
    type: "function" as const,
    function: {
      name: GetDocumentByIdTool.name,
      description: GetDocumentByIdTool.description,
      parameters: zodToJsonSchema(GetDocumentByIdTool.parameters),
    },
  },
  {
    type: "function" as const,
    function: {
      name: GetDocumentControlsTool.name,
      description: GetDocumentControlsTool.description,
      parameters: zodToJsonSchema(GetDocumentControlsTool.parameters),
    },
  },
  {
    type: "function" as const,
    function: {
      name: GetDocumentLinksTool.name,
      description: GetDocumentLinksTool.description,
      parameters: zodToJsonSchema(GetDocumentLinksTool.parameters),
    },
  },
  {
    type: "function" as const,
    function: {
      name: GetDocumentUploadsTool.name,
      description: GetDocumentUploadsTool.description,
      parameters: zodToJsonSchema(GetDocumentUploadsTool.parameters),
    },
  },
  {
    type: "function" as const,
    function: {
      name: DownloadDocumentFileTool.name,
      description: DownloadDocumentFileTool.description,
      parameters: zodToJsonSchema(DownloadDocumentFileTool.parameters),
    },
  },
  {
    type: "function" as const,
    function: {
      name: GetPoliciesTool.name,
      description: GetPoliciesTool.description,
      parameters: zodToJsonSchema(GetPoliciesTool.parameters),
    },
  },
  {
    type: "function" as const,
    function: {
      name: GetPolicyByIdTool.name,
      description: GetPolicyByIdTool.description,
      parameters: zodToJsonSchema(GetPolicyByIdTool.parameters),
    },
  },
  {
    type: "function" as const,
    function: {
      name: GetDiscoveredVendorsTool.name,
      description: GetDiscoveredVendorsTool.description,
      parameters: zodToJsonSchema(GetDiscoveredVendorsTool.parameters),
    },
  },
  {
    type: "function" as const,
    function: {
      name: GetDiscoveredVendorAccountsTool.name,
      description: GetDiscoveredVendorAccountsTool.description,
      parameters: zodToJsonSchema(GetDiscoveredVendorAccountsTool.parameters),
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
    prompt: "Show me the details of test ID aws-security-groups-open-to-world",
    expectedTool: "get_test_by_id",
    expectedParams: { testId: "aws-security-groups-open-to-world" },
    description: "Should call get_test_by_id for specific test details",
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
    prompt: "What controls are available in the Vanta library that I can add?",
    expectedTool: "get_library_controls",
    expectedParams: {},
    description: "Should call get_library_controls to list available library controls",
  },
  {
    prompt: "Show me the documents for control ID access-control-1",
    expectedTool: "get_control_documents",
    expectedParams: { controlId: "access-control-1" },
    description: "Should call get_control_documents for specific control",
  },
  {
    prompt: "Get details for control ID data-protection-2",
    expectedTool: "get_control_by_id",
    expectedParams: { controlId: "data-protection-2" },
    description: "Should call get_control_by_id for specific control details",
  },
  {
    prompt: "Show me details for framework ID soc2",
    expectedTool: "get_framework_by_id",
    expectedParams: { frameworkId: "soc2" },
    description: "Should call get_framework_by_id for specific framework details",
  },
  {
    prompt: "Get details for risk scenario ID risk-scenario-123",
    expectedTool: "get_risk_by_id",
    expectedParams: { riskId: "risk-scenario-123" },
    description: "Should call get_risk_by_id for specific risk scenario details",
  },
  {
    prompt: "What integrations are connected to my Vanta account?",
    expectedTool: "get_integrations",
    expectedParams: {},
    description: "Should call get_integrations to list all connected integrations",
  },
  {
    prompt: "Show me details for integration ID aws",
    expectedTool: "get_integration_by_id",
    expectedParams: { integrationId: "aws" },
    description: "Should call get_integration_by_id for specific integration details",
  },
  {
    prompt: "List all vendors in my Vanta account",
    expectedTool: "get_vendors",
    expectedParams: {},
    description: "Should call get_vendors to list all vendors",
  },
  {
    prompt: "Get details for vendor ID vendor-123",
    expectedTool: "get_vendor_by_id",
    expectedParams: { vendorId: "vendor-123" },
    description: "Should call get_vendor_by_id for specific vendor details",
  },
  {
    prompt: "Show me all the documents we have uploaded to Vanta for compliance purposes.",
    expectedTool: "get_documents",
    expectedParams: {},
    description: "Should call get_documents to list all compliance documents",
  },
  {
    prompt: "I need to see the details of document DOC-12345 including its metadata and compliance mappings.",
    expectedTool: "get_document_by_id",
    expectedParams: { documentId: "DOC-12345" },
    description: "Should call get_document_by_id for specific document details",
  },
  {
    prompt: "Which security controls are mapped to document DOC-789?",
    expectedTool: "get_document_controls",
    expectedParams: { documentId: "DOC-789" },
    description: "Should call get_document_controls to find controls associated with document",
  },
  {
    prompt: "What external links and references are attached to document POLICY-456?",
    expectedTool: "get_document_links",
    expectedParams: { documentId: "POLICY-456" },
    description: "Should call get_document_links to get external references for document",
  },
  {
    prompt: "List all the files uploaded to document SEC-123.",
    expectedTool: "get_document_uploads",
    expectedParams: { documentId: "SEC-123" },
    description: "Should call get_document_uploads to list file uploads for document",
  },
  {
    prompt: "I need to download the file with uploaded file ID FILE-456 from document DOC-789.",
    expectedTool: "download_document_file",
    expectedParams: { documentId: "DOC-789", uploadedFileId: "FILE-456" },
    description: "Should call download_document_file to download specific file from document",
  },
  {
    prompt: "Show me all the policies we have established for our organization.",
    expectedTool: "get_policies",
    expectedParams: {},
    description: "Should call get_policies to list all organizational policies",
  },
  {
    prompt: "I need to review the details of our data retention policy with ID POLICY-789.",
    expectedTool: "get_policy_by_id",
    expectedParams: { policyId: "POLICY-789" },
    description: "Should call get_policy_by_id for specific policy details",
  },
  {
    prompt: "Show me all the vendors that have been discovered through our integrations but aren't yet managed.",
    expectedTool: "get_discovered_vendors",
    expectedParams: {},
    description: "Should call get_discovered_vendors to list automatically discovered vendors",
  },
  {
    prompt: "I need detailed account information for all discovered vendor accounts from our integrations.",
    expectedTool: "get_discovered_vendor_accounts",
    expectedParams: {},
    description: "Should call get_discovered_vendor_accounts to get detailed vendor account information",
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
