import OpenAI from "openai";
import { zodToJsonSchema } from "zod-to-json-schema";
import { ListTestsTool, ListTestEntitiesTool } from "../operations/tests.js";
import {
  ListFrameworksTool,
  ListFrameworkControlsTool,
  GetFrameworkTool,
} from "../operations/frameworks.js";
import {
  ListControlsTool,
  ListControlTestsTool,
  ListLibraryControlsTool,
  ListControlDocumentsTool,
  GetControlTool,
} from "../operations/controls.js";
import { ListRisksTool, GetRiskTool } from "../operations/risks.js";
import {
  ListIntegrationsTool,
  GetIntegrationTool,
} from "../operations/integrations.js";
import { ListVendorsTool, GetVendorTool } from "../operations/vendors.js";
import {
  ListDocumentsTool,
  GetDocumentTool,
  ListDocumentControlsTool,
  ListDocumentLinksTool,
  ListDocumentUploadsTool,
  DownloadDocumentFileTool,
} from "../operations/documents.js";
import { ListPoliciesTool, GetPolicyTool } from "../operations/policies.js";
import {
  ListDiscoveredVendorsTool,
  ListDiscoveredVendorAccountsTool,
} from "../operations/discovered-vendors.js";
import {
  ListGroupsTool,
  GetGroupTool,
  ListGroupPeopleTool,
} from "../operations/groups.js";
import { ListPeopleTool, GetPersonTool } from "../operations/people.js";
import {
  ListVulnerabilitiesTool,
  GetVulnerabilityTool,
} from "../operations/vulnerabilities.js";
import { ListVulnerabilityRemediationsTool } from "../operations/vulnerability-remediations.js";
import {
  ListVulnerableAssetsTool,
  GetVulnerableAssetTool,
} from "../operations/vulnerable-assets.js";
import {
  ListMonitoredComputersTool,
  GetMonitoredComputerTool,
} from "../operations/monitored-computers.js";
import { ListVendorRiskAttributesTool } from "../operations/vendor-risk-attributes.js";
import {
  GetTrustCenterTool,
  ListTrustCenterAccessRequestsTool,
  GetTrustCenterAccessRequestTool,
  ListTrustCenterViewerActivityEventsTool,
  ListTrustCenterControlCategoriesTool,
  GetTrustCenterControlCategoryTool,
  ListTrustCenterControlsTool,
  GetTrustCenterControlTool,
  ListTrustCenterFaqsTool,
  GetTrustCenterFaqTool,
  ListTrustCenterResourcesTool,
  GetTrustCenterDocumentTool,
  GetTrustCenterResourceMediaTool,
  ListTrustCenterSubprocessorsTool,
  GetTrustCenterSubprocessorTool,
  ListTrustCenterUpdatesTool,
  GetTrustCenterUpdateTool,
  ListTrustCenterViewersTool,
  GetTrustCenterViewerTool,
  GetTrustCenterSubscriberTool,
  GetTrustCenterSubscriberGroupTool,
  ListTrustCenterSubscriberGroupsTool,
  ListTrustCenterHistoricalAccessRequestsTool,
  ListTrustCenterSubscribersTool,
} from "../operations/trust-centers.js";

// Format all tools for OpenAI
const tools = [
  {
    type: "function" as const,
    function: {
      name: ListTestsTool.name,
      description: ListTestsTool.description,
      parameters: zodToJsonSchema(ListTestsTool.parameters),
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
      name: ListFrameworksTool.name,
      description: ListFrameworksTool.description,
      parameters: zodToJsonSchema(ListFrameworksTool.parameters),
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
      name: ListControlsTool.name,
      description: ListControlsTool.description,
      parameters: zodToJsonSchema(ListControlsTool.parameters),
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
      name: GetControlTool.name,
      description: GetControlTool.description,
      parameters: zodToJsonSchema(GetControlTool.parameters),
    },
  },
  {
    type: "function" as const,
    function: {
      name: ListRisksTool.name,
      description: ListRisksTool.description,
      parameters: zodToJsonSchema(ListRisksTool.parameters),
    },
  },
  {
    type: "function" as const,
    function: {
      name: GetRiskTool.name,
      description: GetRiskTool.description,
      parameters: zodToJsonSchema(GetRiskTool.parameters),
    },
  },
  {
    type: "function" as const,
    function: {
      name: GetFrameworkTool.name,
      description: GetFrameworkTool.description,
      parameters: zodToJsonSchema(GetFrameworkTool.parameters),
    },
  },
  {
    type: "function" as const,
    function: {
      name: ListIntegrationsTool.name,
      description: ListIntegrationsTool.description,
      parameters: zodToJsonSchema(ListIntegrationsTool.parameters),
    },
  },
  {
    type: "function" as const,
    function: {
      name: GetIntegrationTool.name,
      description: GetIntegrationTool.description,
      parameters: zodToJsonSchema(GetIntegrationTool.parameters),
    },
  },
  {
    type: "function" as const,
    function: {
      name: ListVendorsTool.name,
      description: ListVendorsTool.description,
      parameters: zodToJsonSchema(ListVendorsTool.parameters),
    },
  },
  {
    type: "function" as const,
    function: {
      name: GetVendorTool.name,
      description: GetVendorTool.description,
      parameters: zodToJsonSchema(GetVendorTool.parameters),
    },
  },
  {
    type: "function" as const,
    function: {
      name: ListDocumentsTool.name,
      description: ListDocumentsTool.description,
      parameters: zodToJsonSchema(ListDocumentsTool.parameters),
    },
  },
  {
    type: "function" as const,
    function: {
      name: GetDocumentTool.name,
      description: GetDocumentTool.description,
      parameters: zodToJsonSchema(GetDocumentTool.parameters),
    },
  },
  {
    type: "function" as const,
    function: {
      name: ListDocumentControlsTool.name,
      description: ListDocumentControlsTool.description,
      parameters: zodToJsonSchema(ListDocumentControlsTool.parameters),
    },
  },
  {
    type: "function" as const,
    function: {
      name: ListDocumentLinksTool.name,
      description: ListDocumentLinksTool.description,
      parameters: zodToJsonSchema(ListDocumentLinksTool.parameters),
    },
  },
  {
    type: "function" as const,
    function: {
      name: ListDocumentUploadsTool.name,
      description: ListDocumentUploadsTool.description,
      parameters: zodToJsonSchema(ListDocumentUploadsTool.parameters),
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
      name: ListPoliciesTool.name,
      description: ListPoliciesTool.description,
      parameters: zodToJsonSchema(ListPoliciesTool.parameters),
    },
  },
  {
    type: "function" as const,
    function: {
      name: GetPolicyTool.name,
      description: GetPolicyTool.description,
      parameters: zodToJsonSchema(GetPolicyTool.parameters),
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
      name: ListGroupsTool.name,
      description: ListGroupsTool.description,
      parameters: zodToJsonSchema(ListGroupsTool.parameters),
    },
  },
  {
    type: "function" as const,
    function: {
      name: GetGroupTool.name,
      description: GetGroupTool.description,
      parameters: zodToJsonSchema(GetGroupTool.parameters),
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
      name: ListPeopleTool.name,
      description: ListPeopleTool.description,
      parameters: zodToJsonSchema(ListPeopleTool.parameters),
    },
  },
  {
    type: "function" as const,
    function: {
      name: GetPersonTool.name,
      description: GetPersonTool.description,
      parameters: zodToJsonSchema(GetPersonTool.parameters),
    },
  },
  {
    type: "function" as const,
    function: {
      name: ListVulnerabilitiesTool.name,
      description: ListVulnerabilitiesTool.description,
      parameters: zodToJsonSchema(ListVulnerabilitiesTool.parameters),
    },
  },
  {
    type: "function" as const,
    function: {
      name: GetVulnerabilityTool.name,
      description: GetVulnerabilityTool.description,
      parameters: zodToJsonSchema(GetVulnerabilityTool.parameters),
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
      name: ListVulnerableAssetsTool.name,
      description: ListVulnerableAssetsTool.description,
      parameters: zodToJsonSchema(ListVulnerableAssetsTool.parameters),
    },
  },
  {
    type: "function" as const,
    function: {
      name: GetVulnerableAssetTool.name,
      description: GetVulnerableAssetTool.description,
      parameters: zodToJsonSchema(GetVulnerableAssetTool.parameters),
    },
  },
  {
    type: "function" as const,
    function: {
      name: ListMonitoredComputersTool.name,
      description: ListMonitoredComputersTool.description,
      parameters: zodToJsonSchema(ListMonitoredComputersTool.parameters),
    },
  },
  {
    type: "function" as const,
    function: {
      name: GetMonitoredComputerTool.name,
      description: GetMonitoredComputerTool.description,
      parameters: zodToJsonSchema(GetMonitoredComputerTool.parameters),
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
      name: ListTrustCenterAccessRequestsTool.name,
      description: ListTrustCenterAccessRequestsTool.description,
      parameters: zodToJsonSchema(ListTrustCenterAccessRequestsTool.parameters),
    },
  },
  {
    type: "function" as const,
    function: {
      name: GetTrustCenterAccessRequestTool.name,
      description: GetTrustCenterAccessRequestTool.description,
      parameters: zodToJsonSchema(GetTrustCenterAccessRequestTool.parameters),
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
      name: ListTrustCenterControlCategoriesTool.name,
      description: ListTrustCenterControlCategoriesTool.description,
      parameters: zodToJsonSchema(
        ListTrustCenterControlCategoriesTool.parameters,
      ),
    },
  },
  {
    type: "function" as const,
    function: {
      name: GetTrustCenterControlCategoryTool.name,
      description: GetTrustCenterControlCategoryTool.description,
      parameters: zodToJsonSchema(GetTrustCenterControlCategoryTool.parameters),
    },
  },
  {
    type: "function" as const,
    function: {
      name: ListTrustCenterControlsTool.name,
      description: ListTrustCenterControlsTool.description,
      parameters: zodToJsonSchema(ListTrustCenterControlsTool.parameters),
    },
  },
  {
    type: "function" as const,
    function: {
      name: GetTrustCenterControlTool.name,
      description: GetTrustCenterControlTool.description,
      parameters: zodToJsonSchema(GetTrustCenterControlTool.parameters),
    },
  },
  {
    type: "function" as const,
    function: {
      name: ListTrustCenterFaqsTool.name,
      description: ListTrustCenterFaqsTool.description,
      parameters: zodToJsonSchema(ListTrustCenterFaqsTool.parameters),
    },
  },
  {
    type: "function" as const,
    function: {
      name: GetTrustCenterFaqTool.name,
      description: GetTrustCenterFaqTool.description,
      parameters: zodToJsonSchema(GetTrustCenterFaqTool.parameters),
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
      name: ListTrustCenterSubprocessorsTool.name,
      description: ListTrustCenterSubprocessorsTool.description,
      parameters: zodToJsonSchema(ListTrustCenterSubprocessorsTool.parameters),
    },
  },
  {
    type: "function" as const,
    function: {
      name: GetTrustCenterSubprocessorTool.name,
      description: GetTrustCenterSubprocessorTool.description,
      parameters: zodToJsonSchema(GetTrustCenterSubprocessorTool.parameters),
    },
  },
  {
    type: "function" as const,
    function: {
      name: ListTrustCenterUpdatesTool.name,
      description: ListTrustCenterUpdatesTool.description,
      parameters: zodToJsonSchema(ListTrustCenterUpdatesTool.parameters),
    },
  },
  {
    type: "function" as const,
    function: {
      name: GetTrustCenterUpdateTool.name,
      description: GetTrustCenterUpdateTool.description,
      parameters: zodToJsonSchema(GetTrustCenterUpdateTool.parameters),
    },
  },
  {
    type: "function" as const,
    function: {
      name: ListTrustCenterViewersTool.name,
      description: ListTrustCenterViewersTool.description,
      parameters: zodToJsonSchema(ListTrustCenterViewersTool.parameters),
    },
  },
  {
    type: "function" as const,
    function: {
      name: GetTrustCenterViewerTool.name,
      description: GetTrustCenterViewerTool.description,
      parameters: zodToJsonSchema(GetTrustCenterViewerTool.parameters),
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
      name: GetTrustCenterSubscriberGroupTool.name,
      description: GetTrustCenterSubscriberGroupTool.description,
      parameters: zodToJsonSchema(GetTrustCenterSubscriberGroupTool.parameters),
    },
  },
  {
    type: "function" as const,
    function: {
      name: ListTrustCenterSubscriberGroupsTool.name,
      description: ListTrustCenterSubscriberGroupsTool.description,
      parameters: zodToJsonSchema(
        ListTrustCenterSubscriberGroupsTool.parameters,
      ),
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
    expectedTool: "list_tests",
    expectedParams: {
      statusFilter: "NEEDS_ATTENTION",
      integrationFilter: "aws",
    },
    description:
      "Should call get_tests with AWS filter and NEEDS_ATTENTION status",
  },
  {
    prompt: "Show me all my SOC2 compliance tests that are failing",
    expectedTool: "list_tests",
    expectedParams: {
      frameworkFilter: "soc2",
      statusFilter: "NEEDS_ATTENTION",
    },
    description: "Should call get_tests with SOC2 framework filter",
  },
  {
    prompt:
      "Show me the specific failing entities for test ID aws-security-groups-open-to-world",
    expectedTool: "list_test_entities",
    expectedParams: { testId: "aws-security-groups-open-to-world" },
    description: "Should call get_test_entities for specific test details",
  },
  {
    prompt: "Show me the details of test ID aws-security-groups-open-to-world",
    expectedTool: "get_test",
    expectedParams: { testId: "aws-security-groups-open-to-world" },
    description: "Should call get_test_by_id for specific test details",
  },
  {
    prompt: "What compliance frameworks are we tracking?",
    expectedTool: "list_frameworks",
    expectedParams: {},
    description: "Should call get_frameworks to list available frameworks",
  },
  {
    prompt: "Get the control requirements for framework ID soc2",
    expectedTool: "list_framework_controls",
    expectedParams: { frameworkId: "soc2" },
    description: "Should call get_framework_controls for SOC2",
  },
  {
    prompt: "What is the current % status of my SOC 2?",
    expectedTool: "list_frameworks",
    expectedParams: {},
    description: "Should call get_frameworks to get SOC2 completion percentage",
  },
  {
    prompt: "List all security controls in my Vanta account",
    expectedTool: "list_controls",
    expectedParams: {},
    description: "Should call get_controls to list all available controls",
  },
  {
    prompt: "Show me the tests for control ID access-control-1",
    expectedTool: "list_control_tests",
    expectedParams: { controlId: "access-control-1" },
    description: "Should call get_control_tests for specific control",
  },
  {
    prompt: "What controls are available in the Vanta library that I can add?",
    expectedTool: "list_library_controls",
    expectedParams: {},
    description:
      "Should call get_library_controls to list available library controls",
  },
  {
    prompt: "Show me the documents for control ID access-control-1",
    expectedTool: "list_control_documents",
    expectedParams: { controlId: "access-control-1" },
    description: "Should call get_control_documents for specific control",
  },
  {
    prompt: "Get details for control ID data-protection-2",
    expectedTool: "get_control",
    expectedParams: { controlId: "data-protection-2" },
    description: "Should call get_control_by_id for specific control details",
  },
  {
    prompt: "Show me details for framework ID soc2",
    expectedTool: "get_framework",
    expectedParams: { frameworkId: "soc2" },
    description:
      "Should call get_framework_by_id for specific framework details",
  },
  {
    prompt: "Get details for risk scenario ID risk-scenario-123",
    expectedTool: "get_risk",
    expectedParams: { riskId: "risk-scenario-123" },
    description:
      "Should call get_risk_by_id for specific risk scenario details",
  },
  {
    prompt: "What integrations are connected to my Vanta account?",
    expectedTool: "list_integrations",
    expectedParams: {},
    description:
      "Should call get_integrations to list all connected integrations",
  },
  {
    prompt: "Show me details for integration ID aws",
    expectedTool: "get_integration",
    expectedParams: { integrationId: "aws" },
    description:
      "Should call get_integration_by_id for specific integration details",
  },
  {
    prompt: "List all vendors in my Vanta account",
    expectedTool: "list_vendors",
    expectedParams: {},
    description: "Should call get_vendors to list all vendors",
  },
  {
    prompt: "Get details for vendor ID vendor-123",
    expectedTool: "get_vendor",
    expectedParams: { vendorId: "vendor-123" },
    description: "Should call get_vendor_by_id for specific vendor details",
  },
  {
    prompt:
      "Show me all the documents we have uploaded to Vanta for compliance purposes.",
    expectedTool: "list_documents",
    expectedParams: {},
    description: "Should call get_documents to list all compliance documents",
  },
  {
    prompt:
      "I need to see the details of document DOC-12345 including its metadata and compliance mappings.",
    expectedTool: "get_document",
    expectedParams: { documentId: "DOC-12345" },
    description: "Should call get_document_by_id for specific document details",
  },
  {
    prompt: "Which security controls are mapped to document DOC-789?",
    expectedTool: "list_document_controls",
    expectedParams: { documentId: "DOC-789" },
    description:
      "Should call get_document_controls to find controls associated with document",
  },
  {
    prompt:
      "What external links and references are attached to document POLICY-456?",
    expectedTool: "list_document_links",
    expectedParams: { documentId: "POLICY-456" },
    description:
      "Should call get_document_links to get external references for document",
  },
  {
    prompt: "List all the files uploaded to document SEC-123.",
    expectedTool: "list_document_uploads",
    expectedParams: { documentId: "SEC-123" },
    description:
      "Should call get_document_uploads to list file uploads for document",
  },
  {
    prompt:
      "I need to download the file with uploaded file ID FILE-456 from document DOC-789.",
    expectedTool: "download_document_file",
    expectedParams: { documentId: "DOC-789", uploadedFileId: "FILE-456" },
    description:
      "Should call download_document_file to download specific file from document",
  },
  {
    prompt:
      "Show me all the policies we have established for our organization.",
    expectedTool: "list_policies",
    expectedParams: {},
    description: "Should call get_policies to list all organizational policies",
  },
  {
    prompt:
      "I need to review the details of our data retention policy with ID POLICY-789.",
    expectedTool: "get_policy",
    expectedParams: { policyId: "POLICY-789" },
    description: "Should call get_policy_by_id for specific policy details",
  },
  {
    prompt:
      "Show me all the vendors that have been discovered through our integrations but aren't yet managed.",
    expectedTool: "list_discovered_vendors",
    expectedParams: {},
    description:
      "Should call get_discovered_vendors to list automatically discovered vendors",
  },
  {
    prompt:
      "I need detailed account information for all discovered vendor accounts from our integrations.",
    expectedTool: "list_discovered_vendor_accounts",
    expectedParams: {},
    description:
      "Should call get_discovered_vendor_accounts to get detailed vendor account information",
  },
  {
    prompt:
      "Show me all the organizational groups we have set up for access management.",
    expectedTool: "list_groups",
    expectedParams: {},
    description: "Should call get_groups to list all organizational groups",
  },
  {
    prompt: "I need details about the Engineering group with ID GROUP-456.",
    expectedTool: "get_group",
    expectedParams: { groupId: "GROUP-456" },
    description: "Should call get_group_by_id for specific group details",
  },
  {
    prompt: "Who are all the members of the Security team group?",
    expectedTool: "list_group_people",
    expectedParams: { groupId: "Security team" },
    description:
      "Should call get_group_people to list people in a specific group",
  },
  {
    prompt: "List all people in our organization for the compliance audit.",
    expectedTool: "list_people",
    expectedParams: {},
    description:
      "Should call get_people to list all people in the organization",
  },
  {
    prompt: "Get me the details for employee PERSON-789.",
    expectedTool: "get_person",
    expectedParams: { personId: "PERSON-789" },
    description: "Should call get_person_by_id for specific person details",
  },
  {
    prompt:
      "Show me all the security vulnerabilities detected in our infrastructure.",
    expectedTool: "list_vulnerabilities",
    expectedParams: {},
    description:
      "Should call get_vulnerabilities to list all detected vulnerabilities",
  },
  {
    prompt:
      "I need detailed information about vulnerability VULN-456 including its CVE data.",
    expectedTool: "get_vulnerability",
    expectedParams: { vulnerabilityId: "VULN-456" },
    description:
      "Should call get_vulnerability_by_id for specific vulnerability details",
  },
  {
    prompt: "What vulnerability remediations are currently in progress?",
    expectedTool: "list_vulnerability_remediations",
    expectedParams: {},
    description:
      "Should call get_vulnerability_remediations to track remediation efforts",
  },
  {
    prompt:
      "List all assets that are affected by vulnerabilities for our security review.",
    expectedTool: "list_vulnerable_assets",
    expectedParams: {},
    description:
      "Should call get_vulnerable_assets to identify affected infrastructure",
  },
  {
    prompt:
      "Get details about vulnerable asset ASSET-789 and its security status.",
    expectedTool: "get_vulnerable_asset",
    expectedParams: { vulnerableAssetId: "ASSET-789" },
    description:
      "Should call get_vulnerable_asset_by_id for specific asset vulnerability details",
  },
  {
    prompt:
      "Show me all the computers being monitored for compliance across our organization.",
    expectedTool: "list_monitored_computers",
    expectedParams: {},
    description:
      "Should call get_monitored_computers to list all monitored computers",
  },
  {
    prompt: "I need details about the monitored computer with ID COMP-456.",
    expectedTool: "get_monitored_computer",
    expectedParams: { computerId: "COMP-456" },
    description:
      "Should call get_monitored_computer_by_id for specific computer details",
  },
  {
    prompt:
      "What vendor risk attributes are available for evaluating our vendors?",
    expectedTool: "list_vendor_risk_attributes",
    expectedParams: {},
    description:
      "Should call get_vendor_risk_attributes to list available risk assessment criteria",
  },
  {
    prompt:
      "Show me the configuration and settings for our Trust Center 'acme-security'.",
    expectedTool: "get_trust_center",
    expectedParams: { slugId: "acme-security" },
    description:
      "Should call get_trust_center to get Trust Center configuration details",
  },
  {
    prompt: "List all pending access requests for our Trust Center.",
    expectedTool: "list_trust_center_access_requests",
    expectedParams: { slugId: "our-trust-center" },
    description:
      "Should call get_trust_center_access_requests to review access requests",
  },
  {
    prompt: "Get details about Trust Center access request REQ-789.",
    expectedTool: "get_trust_center_access_request",
    expectedParams: { slugId: "trust-center", accessRequestId: "REQ-789" },
    description:
      "Should call get_trust_center_access_request for specific request details",
  },
  {
    prompt: "What viewer activity has occurred on our Trust Center this month?",
    expectedTool: "list_trust_center_viewer_activity_events",
    expectedParams: { slugId: "our-trust-center" },
    description:
      "Should call get_trust_center_viewer_activity_events to track engagement analytics",
  },
  {
    prompt: "Show me all the control categories in our Trust Center.",
    expectedTool: "list_trust_center_control_categories",
    expectedParams: { slugId: "trust-center" },
    description:
      "Should call get_trust_center_control_categories to list control organization",
  },
  {
    prompt: "Get details about Trust Center control category CAT-456.",
    expectedTool: "get_trust_center_control_category",
    expectedParams: { slugId: "trust-center", controlCategoryId: "CAT-456" },
    description:
      "Should call get_trust_center_control_category for specific category details",
  },
  {
    prompt: "List all the controls published in our public Trust Center.",
    expectedTool: "list_trust_center_controls",
    expectedParams: { slugId: "public-trust-center" },
    description:
      "Should call get_trust_center_controls to see published compliance controls",
  },
  {
    prompt: "Get implementation details for Trust Center control TC-CTRL-123.",
    expectedTool: "get_trust_center_control",
    expectedParams: {
      slugId: "trust-center",
      trustCenterControlId: "TC-CTRL-123",
    },
    description:
      "Should call get_trust_center_control for specific control implementation details",
  },
  {
    prompt: "What FAQs are available on our Trust Center for customers?",
    expectedTool: "list_trust_center_faqs",
    expectedParams: { slugId: "customer-trust-center" },
    description:
      "Should call get_trust_center_faqs to list customer information",
  },
  {
    prompt: "Show me the details of FAQ FAQ-789 from our Trust Center.",
    expectedTool: "get_trust_center_faq",
    expectedParams: { slugId: "trust-center", faqId: "FAQ-789" },
    description: "Should call get_trust_center_faq for specific FAQ content",
  },
  {
    prompt:
      "What compliance documents and resources are available for download on our Trust Center?",
    expectedTool: "list_trust_center_resources",
    expectedParams: { slugId: "compliance-center" },
    description:
      "Should call get_trust_center_resources to list downloadable materials",
  },
  {
    prompt:
      "Get details about the SOC2 report document DOC-456 on our Trust Center.",
    expectedTool: "get_trust_center_document",
    expectedParams: {
      slugId: "trust-center",
      resourceId: "DOC-456",
    },
    description:
      "Should call get_trust_center_document for specific document details",
  },
  {
    prompt:
      "Download the actual compliance certificate file CERT-123 from our Trust Center.",
    expectedTool: "get_trust_center_resource_media",
    expectedParams: { slugId: "trust-center", resourceId: "CERT-123" },
    description:
      "Should call get_trust_center_resource_media to download document media",
  },
  {
    prompt:
      "List all subprocessors displayed on our Trust Center for customer transparency.",
    expectedTool: "list_trust_center_subprocessors",
    expectedParams: { slugId: "customer-trust-center" },
    description:
      "Should call list_trust_center_subprocessors to list third-party service providers",
  },
  {
    prompt:
      "Get details about subprocessor SUBPROC-789 listed on our Trust Center.",
    expectedTool: "get_trust_center_subprocessor",
    expectedParams: { slugId: "trust-center", subprocessorId: "SUBPROC-789" },
    description:
      "Should call get_trust_center_subprocessor for specific subprocessor information",
  },
  {
    prompt:
      "Show me all the recent updates and announcements on our Trust Center.",
    expectedTool: "list_trust_center_updates",
    expectedParams: { slugId: "company-trust-center" },
    description:
      "Should call list_trust_center_updates to see compliance notifications",
  },
  {
    prompt:
      "Get the details of Trust Center update UPDATE-456 about SOC2 compliance.",
    expectedTool: "get_trust_center_update",
    expectedParams: { slugId: "trust-center", updateId: "UPDATE-456" },
    description:
      "Should call get_trust_center_update for specific update content",
  },
  {
    prompt: "Who has access to view our Trust Center? List all viewers.",
    expectedTool: "list_trust_center_viewers",
    expectedParams: { slugId: "private-trust-center" },
    description: "Should call list_trust_center_viewers for access management",
  },
  {
    prompt: "Get access details for Trust Center viewer USER-123.",
    expectedTool: "get_trust_center_viewer",
    expectedParams: { slugId: "trust-center", viewerId: "USER-123" },
    description:
      "Should call get_trust_center_viewer for specific viewer information",
  },
  {
    prompt: "Get notification preferences for Trust Center subscriber SUB-789.",
    expectedTool: "get_trust_center_subscriber",
    expectedParams: { slugId: "trust-center", subscriberId: "SUB-789" },
    description:
      "Should call get_trust_center_subscriber for subscriber settings",
  },
  {
    prompt: "Show me details about Trust Center subscriber group GROUP-456.",
    expectedTool: "get_trust_center_subscriber_group",
    expectedParams: { slugId: "trust-center", subscriberGroupId: "GROUP-456" },
    description:
      "Should call get_trust_center_subscriber_group for group information",
  },
  {
    prompt: "List all notification groups configured for our Trust Center.",
    expectedTool: "list_trust_center_subscriber_groups",
    expectedParams: { slugId: "notification-center" },
    description:
      "Should call list_trust_center_subscriber_groups for group management",
  },
  {
    prompt:
      "Show me all historical access requests for our Trust Center from last year.",
    expectedTool: "list_trust_center_historical_access_requests",
    expectedParams: { slugId: "audit-trust-center" },
    description:
      "Should call list_trust_center_historical_access_requests for audit tracking",
  },
  {
    prompt: "List everyone subscribed to updates from our Trust Center.",
    expectedTool: "list_trust_center_subscribers",
    expectedParams: { slugId: "update-center" },
    description:
      "Should call list_trust_center_subscribers for communication management",
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
