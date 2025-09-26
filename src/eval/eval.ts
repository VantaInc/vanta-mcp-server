import OpenAI from "openai";
import { zodToJsonSchema } from "zod-to-json-schema";
import {
  // Tests
  TestsTool,
  ListTestEntitiesTool,
  // Frameworks
  FrameworksTool,
  ListFrameworkControlsTool,
  // Controls
  ControlsTool,
  ListControlTestsTool,
  ListLibraryControlsTool,
  ListControlDocumentsTool,
  // Risks
  RisksTool,
  // Integrations
  IntegrationsTool,
  IntegrationResourcesTool,
  // Vendors
  VendorsTool,
  VendorComplianceTool,
  GetVendorSecurityReviewTool,
  ListVendorSecurityReviewDocumentsTool,
  // Documents
  DocumentsTool,
  DocumentResourcesTool,
  DownloadDocumentFileTool,
  // Policies
  PoliciesTool,
  // Discovered Vendors
  ListDiscoveredVendorsTool,
  ListDiscoveredVendorAccountsTool,
  // Groups
  GroupsTool,
  ListGroupPeopleTool,
  // People
  PeopleTool,
  // Vulnerabilities
  VulnerabilitiesTool,
  // Vulnerability Remediations
  ListVulnerabilityRemediationsTool,
  // Vulnerable Assets
  VulnerableAssetsTool,
  // Monitored Computers
  MonitoredComputersTool,
  // Vendor Risk Attributes
  ListVendorRiskAttributesTool,
  // Trust Centers
  GetTrustCenterTool,
  TrustCenterAccessRequestsTool,
  ListTrustCenterViewerActivityEventsTool,
  TrustCenterControlCategoriesTool,
  TrustCenterControlsTool,
  TrustCenterFaqsTool,
  ListTrustCenterResourcesTool,
  GetTrustCenterDocumentTool,
  GetTrustCenterResourceMediaTool,
  TrustCenterSubprocessorsTool,
  TrustCenterUpdatesTool,
  TrustCenterViewersTool,
  GetTrustCenterSubscriberTool,
  TrustCenterSubscriberGroupsTool,
  ListTrustCenterHistoricalAccessRequestsTool,
  ListTrustCenterSubscribersTool,
} from "../operations/index.js";

// Format all tools for OpenAI
const tools = [
  {
    type: "function" as const,
    function: {
      name: TestsTool.name,
      description: TestsTool.description,
      parameters: zodToJsonSchema(TestsTool.parameters),
    },
  },
  {
    type: "function" as const,
    function: {
      name: ListTestEntitiesTool.name,
      description: ListTestEntitiesTool.description,
      parameters: zodToJsonSchema(ListTestEntitiesTool.parameters),
    },
  },
  {
    type: "function" as const,
    function: {
      name: FrameworksTool.name,
      description: FrameworksTool.description,
      parameters: zodToJsonSchema(FrameworksTool.parameters),
    },
  },
  {
    type: "function" as const,
    function: {
      name: ListFrameworkControlsTool.name,
      description: ListFrameworkControlsTool.description,
      parameters: zodToJsonSchema(ListFrameworkControlsTool.parameters),
    },
  },
  {
    type: "function" as const,
    function: {
      name: ControlsTool.name,
      description: ControlsTool.description,
      parameters: zodToJsonSchema(ControlsTool.parameters),
    },
  },
  {
    type: "function" as const,
    function: {
      name: ListControlTestsTool.name,
      description: ListControlTestsTool.description,
      parameters: zodToJsonSchema(ListControlTestsTool.parameters),
    },
  },
  {
    type: "function" as const,
    function: {
      name: ListLibraryControlsTool.name,
      description: ListLibraryControlsTool.description,
      parameters: zodToJsonSchema(ListLibraryControlsTool.parameters),
    },
  },
  {
    type: "function" as const,
    function: {
      name: ListControlDocumentsTool.name,
      description: ListControlDocumentsTool.description,
      parameters: zodToJsonSchema(ListControlDocumentsTool.parameters),
    },
  },
  {
    type: "function" as const,
    function: {
      name: RisksTool.name,
      description: RisksTool.description,
      parameters: zodToJsonSchema(RisksTool.parameters),
    },
  },
  {
    type: "function" as const,
    function: {
      name: IntegrationsTool.name,
      description: IntegrationsTool.description,
      parameters: zodToJsonSchema(IntegrationsTool.parameters),
    },
  },
  {
    type: "function" as const,
    function: {
      name: IntegrationResourcesTool.name,
      description: IntegrationResourcesTool.description,
      parameters: zodToJsonSchema(IntegrationResourcesTool.parameters),
    },
  },
  {
    type: "function" as const,
    function: {
      name: VendorsTool.name,
      description: VendorsTool.description,
      parameters: zodToJsonSchema(VendorsTool.parameters),
    },
  },
  {
    type: "function" as const,
    function: {
      name: VendorComplianceTool.name,
      description: VendorComplianceTool.description,
      parameters: zodToJsonSchema(VendorComplianceTool.parameters),
    },
  },
  {
    type: "function" as const,
    function: {
      name: GetVendorSecurityReviewTool.name,
      description: GetVendorSecurityReviewTool.description,
      parameters: zodToJsonSchema(GetVendorSecurityReviewTool.parameters),
    },
  },
  {
    type: "function" as const,
    function: {
      name: ListVendorSecurityReviewDocumentsTool.name,
      description: ListVendorSecurityReviewDocumentsTool.description,
      parameters: zodToJsonSchema(
        ListVendorSecurityReviewDocumentsTool.parameters,
      ),
    },
  },
  {
    type: "function" as const,
    function: {
      name: DocumentsTool.name,
      description: DocumentsTool.description,
      parameters: zodToJsonSchema(DocumentsTool.parameters),
    },
  },
  {
    type: "function" as const,
    function: {
      name: DocumentResourcesTool.name,
      description: DocumentResourcesTool.description,
      parameters: zodToJsonSchema(DocumentResourcesTool.parameters),
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
      name: PoliciesTool.name,
      description: PoliciesTool.description,
      parameters: zodToJsonSchema(PoliciesTool.parameters),
    },
  },
  {
    type: "function" as const,
    function: {
      name: ListDiscoveredVendorsTool.name,
      description: ListDiscoveredVendorsTool.description,
      parameters: zodToJsonSchema(ListDiscoveredVendorsTool.parameters),
    },
  },
  {
    type: "function" as const,
    function: {
      name: ListDiscoveredVendorAccountsTool.name,
      description: ListDiscoveredVendorAccountsTool.description,
      parameters: zodToJsonSchema(ListDiscoveredVendorAccountsTool.parameters),
    },
  },
  {
    type: "function" as const,
    function: {
      name: GroupsTool.name,
      description: GroupsTool.description,
      parameters: zodToJsonSchema(GroupsTool.parameters),
    },
  },
  {
    type: "function" as const,
    function: {
      name: ListGroupPeopleTool.name,
      description: ListGroupPeopleTool.description,
      parameters: zodToJsonSchema(ListGroupPeopleTool.parameters),
    },
  },
  {
    type: "function" as const,
    function: {
      name: PeopleTool.name,
      description: PeopleTool.description,
      parameters: zodToJsonSchema(PeopleTool.parameters),
    },
  },
  {
    type: "function" as const,
    function: {
      name: VulnerabilitiesTool.name,
      description: VulnerabilitiesTool.description,
      parameters: zodToJsonSchema(VulnerabilitiesTool.parameters),
    },
  },
  {
    type: "function" as const,
    function: {
      name: ListVulnerabilityRemediationsTool.name,
      description: ListVulnerabilityRemediationsTool.description,
      parameters: zodToJsonSchema(ListVulnerabilityRemediationsTool.parameters),
    },
  },
  {
    type: "function" as const,
    function: {
      name: VulnerableAssetsTool.name,
      description: VulnerableAssetsTool.description,
      parameters: zodToJsonSchema(VulnerableAssetsTool.parameters),
    },
  },
  {
    type: "function" as const,
    function: {
      name: MonitoredComputersTool.name,
      description: MonitoredComputersTool.description,
      parameters: zodToJsonSchema(MonitoredComputersTool.parameters),
    },
  },
  {
    type: "function" as const,
    function: {
      name: ListVendorRiskAttributesTool.name,
      description: ListVendorRiskAttributesTool.description,
      parameters: zodToJsonSchema(ListVendorRiskAttributesTool.parameters),
    },
  },
  {
    type: "function" as const,
    function: {
      name: GetTrustCenterTool.name,
      description: GetTrustCenterTool.description,
      parameters: zodToJsonSchema(GetTrustCenterTool.parameters),
    },
  },
  {
    type: "function" as const,
    function: {
      name: TrustCenterAccessRequestsTool.name,
      description: TrustCenterAccessRequestsTool.description,
      parameters: zodToJsonSchema(TrustCenterAccessRequestsTool.parameters),
    },
  },
  {
    type: "function" as const,
    function: {
      name: ListTrustCenterViewerActivityEventsTool.name,
      description: ListTrustCenterViewerActivityEventsTool.description,
      parameters: zodToJsonSchema(
        ListTrustCenterViewerActivityEventsTool.parameters,
      ),
    },
  },
  {
    type: "function" as const,
    function: {
      name: TrustCenterControlCategoriesTool.name,
      description: TrustCenterControlCategoriesTool.description,
      parameters: zodToJsonSchema(TrustCenterControlCategoriesTool.parameters),
    },
  },
  {
    type: "function" as const,
    function: {
      name: TrustCenterControlsTool.name,
      description: TrustCenterControlsTool.description,
      parameters: zodToJsonSchema(TrustCenterControlsTool.parameters),
    },
  },
  {
    type: "function" as const,
    function: {
      name: TrustCenterFaqsTool.name,
      description: TrustCenterFaqsTool.description,
      parameters: zodToJsonSchema(TrustCenterFaqsTool.parameters),
    },
  },
  {
    type: "function" as const,
    function: {
      name: ListTrustCenterResourcesTool.name,
      description: ListTrustCenterResourcesTool.description,
      parameters: zodToJsonSchema(ListTrustCenterResourcesTool.parameters),
    },
  },
  {
    type: "function" as const,
    function: {
      name: GetTrustCenterDocumentTool.name,
      description: GetTrustCenterDocumentTool.description,
      parameters: zodToJsonSchema(GetTrustCenterDocumentTool.parameters),
    },
  },
  {
    type: "function" as const,
    function: {
      name: GetTrustCenterResourceMediaTool.name,
      description: GetTrustCenterResourceMediaTool.description,
      parameters: zodToJsonSchema(GetTrustCenterResourceMediaTool.parameters),
    },
  },
  {
    type: "function" as const,
    function: {
      name: TrustCenterSubprocessorsTool.name,
      description: TrustCenterSubprocessorsTool.description,
      parameters: zodToJsonSchema(TrustCenterSubprocessorsTool.parameters),
    },
  },
  {
    type: "function" as const,
    function: {
      name: TrustCenterUpdatesTool.name,
      description: TrustCenterUpdatesTool.description,
      parameters: zodToJsonSchema(TrustCenterUpdatesTool.parameters),
    },
  },
  {
    type: "function" as const,
    function: {
      name: TrustCenterViewersTool.name,
      description: TrustCenterViewersTool.description,
      parameters: zodToJsonSchema(TrustCenterViewersTool.parameters),
    },
  },
  {
    type: "function" as const,
    function: {
      name: GetTrustCenterSubscriberTool.name,
      description: GetTrustCenterSubscriberTool.description,
      parameters: zodToJsonSchema(GetTrustCenterSubscriberTool.parameters),
    },
  },
  {
    type: "function" as const,
    function: {
      name: TrustCenterSubscriberGroupsTool.name,
      description: TrustCenterSubscriberGroupsTool.description,
      parameters: zodToJsonSchema(TrustCenterSubscriberGroupsTool.parameters),
    },
  },
  {
    type: "function" as const,
    function: {
      name: ListTrustCenterHistoricalAccessRequestsTool.name,
      description: ListTrustCenterHistoricalAccessRequestsTool.description,
      parameters: zodToJsonSchema(
        ListTrustCenterHistoricalAccessRequestsTool.parameters,
      ),
    },
  },
  {
    type: "function" as const,
    function: {
      name: ListTrustCenterSubscribersTool.name,
      description: ListTrustCenterSubscribersTool.description,
      parameters: zodToJsonSchema(ListTrustCenterSubscribersTool.parameters),
    },
  },
];

// Test cases for the LLM evaluation
export const testCases = [
  {
    prompt: "What compliance frameworks are we tracking?",
    expectedTool: "frameworks",
    expectedParams: {},
    description: "Should call frameworks to list available frameworks",
  },
  {
    prompt:
      "Show me all discovered vendors flagged by Vanta's discovery engine",
    expectedTool: "list_discovered_vendors",
    expectedParams: {},
    description:
      "Should call list_discovered_vendors to list all discovered vendors",
  },
  {
    prompt:
      "Show the accounts associated with discovered vendor discovered-vendor-123",
    expectedTool: "list_discovered_vendor_accounts",
    expectedParams: { discoveredVendorId: "discovered-vendor-123" },
    description:
      "Should call list_discovered_vendor_accounts with discoveredVendorId for vendor accounts",
  },
  {
    prompt: "What is the current % status of my SOC 2?",
    expectedTool: "frameworks",
    expectedParams: {},
    description: "Should call frameworks to get SOC2 completion percentage",
  },
  {
    prompt: "List all security controls in my Vanta account",
    expectedTool: "controls",
    expectedParams: {},
    description: "Should call controls to list all available controls",
  },
  {
    prompt:
      "Show me all automated tests for the access-control-user-provisioning control",
    expectedTool: "list_control_tests",
    expectedParams: { controlId: "access-control-user-provisioning" },
    description:
      "Should call list_control_tests to get tests for specific control",
  },
  {
    prompt: "Get details for control ID data-protection-2",
    expectedTool: "controls",
    expectedParams: { controlId: "data-protection-2" },
    description:
      "Should call controls with controlId for specific control details",
  },
  {
    prompt: "Show me details for framework ID soc2",
    expectedTool: "frameworks",
    expectedParams: { frameworkId: "soc2" },
    description:
      "Should call frameworks with frameworkId for SOC2 framework details",
  },
  {
    prompt: "What controls does the SOC 2 framework require?",
    expectedTool: "list_framework_controls",
    expectedParams: { frameworkId: "soc2" },
    description:
      "Should call list_framework_controls to get SOC2 framework requirements",
  },
  {
    prompt: "Get details for risk scenario ID risk-scenario-123",
    expectedTool: "risks",
    expectedParams: { riskId: "risk-scenario-123" },
    description:
      "Should call risks with riskId for specific risk scenario details",
  },
  {
    prompt: "Show me all risk scenarios categorized as Access Control",
    expectedTool: "risks",
    expectedParams: { categoryMatchesAny: "Access Control" },
    description:
      "Should call risks with category filter for Access Control risks",
  },
  {
    prompt: "What integrations are connected to my Vanta account?",
    expectedTool: "integrations",
    expectedParams: {},
    description: "Should call integrations to list all connected integrations",
  },
  {
    prompt: "Show me details for integration ID aws",
    expectedTool: "integrations",
    expectedParams: { integrationId: "aws" },
    description:
      "Should call integrations with integrationId for AWS integration details",
  },
  {
    prompt: "List all vendors in my Vanta account",
    expectedTool: "vendors",
    expectedParams: {},
    description: "Should call vendors to list all vendors",
  },
  {
    prompt: "Get details for vendor ID vendor-123",
    expectedTool: "vendors",
    expectedParams: { vendorId: "vendor-123" },
    description:
      "Should call vendors with vendorId for specific vendor details",
  },
  {
    prompt:
      "Show me all the documents we have uploaded to Vanta for compliance purposes.",
    expectedTool: "documents",
    expectedParams: {},
    description: "Should call documents to list all compliance documents",
  },
  {
    prompt:
      "I need to see the details of document DOC-12345 including its metadata and compliance mappings.",
    expectedTool: "documents",
    expectedParams: { documentId: "DOC-12345" },
    description:
      "Should call documents with documentId for specific document details",
  },
  {
    prompt:
      "I need to review the details of our data retention policy with ID POLICY-789.",
    expectedTool: "policies",
    expectedParams: { policyId: "POLICY-789" },
    description:
      "Should call policies with policyId for specific policy details",
  },
  {
    prompt:
      "Show me all the organizational groups we have set up for access management.",
    expectedTool: "groups",
    expectedParams: {},
    description: "Should call groups to list all organizational groups",
  },
  {
    prompt: "I need details about the Engineering group with ID GROUP-456.",
    expectedTool: "groups",
    expectedParams: { groupId: "GROUP-456" },
    description: "Should call groups with groupId for specific group details",
  },
  {
    prompt: "List all people in our organization for the compliance audit.",
    expectedTool: "people",
    expectedParams: {},
    description: "Should call people to list all people in the organization",
  },
  {
    prompt: "Get me the details for employee PERSON-789.",
    expectedTool: "people",
    expectedParams: { personId: "PERSON-789" },
    description: "Should call people with personId for specific person details",
  },
  {
    prompt:
      "Show me all the security vulnerabilities detected in our infrastructure.",
    expectedTool: "vulnerabilities",
    expectedParams: {},
    description:
      "Should call vulnerabilities to list all detected vulnerabilities",
  },
  {
    prompt:
      "I need detailed information about vulnerability VULN-456 including its CVE data.",
    expectedTool: "vulnerabilities",
    expectedParams: { vulnerabilityId: "VULN-456" },
    description:
      "Should call vulnerabilities with vulnerabilityId for specific vulnerability details",
  },
  {
    prompt:
      "List all assets that are affected by vulnerabilities for our security review.",
    expectedTool: "vulnerable_assets",
    expectedParams: {},
    description:
      "Should call vulnerable_assets to list all assets affected by vulnerabilities",
  },
  {
    prompt:
      "Get details about vulnerable asset ASSET-789 and its security status.",
    expectedTool: "vulnerable_assets",
    expectedParams: { vulnerableAssetId: "ASSET-789" },
    description:
      "Should call vulnerable_assets with vulnerableAssetId for specific asset details",
  },
  {
    prompt:
      "Show me all the computers being monitored for compliance across our organization.",
    expectedTool: "monitored_computers",
    expectedParams: {},
    description:
      "Should call monitored_computers to list all monitored computers",
  },
  {
    prompt: "I need details about the monitored computer with ID COMP-456.",
    expectedTool: "monitored_computers",
    expectedParams: { computerId: "COMP-456" },
    description:
      "Should call monitored_computers with computerId for specific computer details",
  },
  {
    prompt: "What are all the security tests currently running in Vanta?",
    expectedTool: "tests",
    expectedParams: {},
    description: "Should call tests to list all security tests",
  },
  {
    prompt: "Show me details for test ID TEST-789.",
    expectedTool: "tests",
    expectedParams: { testId: "TEST-789" },
    description: "Should call tests with testId for specific test details",
  },
  {
    prompt:
      "What entities are being tested by the test with ID aws-ec2-security-groups?",
    expectedTool: "list_test_entities",
    expectedParams: { testId: "aws-ec2-security-groups" },
    description:
      "Should call list_test_entities to get entities for specific test",
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
          if (Object.keys(testCase.expectedParams).length > 0) {
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

export { tools };
