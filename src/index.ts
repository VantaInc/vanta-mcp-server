#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  listTestEntities,
  ListTestEntitiesTool,
  listTests,
  ListTestsTool,
  getTest,
  GetTestTool,
} from "./operations/tests.js";
import {
  ListFrameworkControlsTool,
  ListFrameworksTool,
  GetFrameworkTool,
  listFrameworkControls,
  listFrameworks,
  getFramework,
} from "./operations/frameworks.js";
import {
  ListControlsTool,
  ListControlTestsTool,
  ListLibraryControlsTool,
  ListControlDocumentsTool,
  GetControlTool,
  listControls,
  listControlTests,
  listLibraryControls,
  listControlDocuments,
  getControl,
} from "./operations/controls.js";
import {
  listRisks,
  ListRisksTool,
  getRisk,
  GetRiskTool,
} from "./operations/risks.js";
import {
  listIntegrations,
  ListIntegrationsTool,
  getIntegration,
  GetIntegrationTool,
  listIntegrationResourceKinds,
  ListIntegrationResourceKindsTool,
  getIntegrationResourceKindDetails,
  GetIntegrationResourceKindDetailsTool,
  listIntegrationResources,
  ListIntegrationResourcesTool,
  getIntegrationResource,
  GetIntegrationResourceTool,
} from "./operations/integrations.js";
import {
  listVendors,
  ListVendorsTool,
  getVendor,
  GetVendorTool,
  listVendorDocuments,
  ListVendorDocumentsTool,
  listVendorFindings,
  ListVendorFindingsTool,
  listVendorSecurityReviews,
  ListVendorSecurityReviewsTool,
  getVendorSecurityReview,
  GetVendorSecurityReviewTool,
  listVendorSecurityReviewDocuments,
  ListVendorSecurityReviewDocumentsTool,
} from "./operations/vendors.js";
import {
  listDocuments,
  ListDocumentsTool,
  getDocument,
  GetDocumentTool,
  listDocumentControls,
  ListDocumentControlsTool,
  listDocumentLinks,
  ListDocumentLinksTool,
  listDocumentUploads,
  ListDocumentUploadsTool,
  downloadDocumentFile,
  DownloadDocumentFileTool,
} from "./operations/documents.js";
import {
  listPolicies,
  ListPoliciesTool,
  getPolicy,
  GetPolicyTool,
} from "./operations/policies.js";
import {
  listDiscoveredVendors,
  ListDiscoveredVendorsTool,
  listDiscoveredVendorAccounts,
  ListDiscoveredVendorAccountsTool,
} from "./operations/discovered-vendors.js";
import {
  listGroups,
  ListGroupsTool,
  getGroup,
  GetGroupTool,
  listGroupPeople,
  ListGroupPeopleTool,
} from "./operations/groups.js";
import {
  listPeople,
  ListPeopleTool,
  getPerson,
  GetPersonTool,
} from "./operations/people.js";
import {
  listVulnerabilities,
  ListVulnerabilitiesTool,
  getVulnerability,
  GetVulnerabilityTool,
} from "./operations/vulnerabilities.js";
import {
  listVulnerabilityRemediations,
  ListVulnerabilityRemediationsTool,
} from "./operations/vulnerability-remediations.js";
import {
  listVulnerableAssets,
  ListVulnerableAssetsTool,
  getVulnerableAsset,
  GetVulnerableAssetTool,
} from "./operations/vulnerable-assets.js";
import {
  listMonitoredComputers,
  ListMonitoredComputersTool,
  getMonitoredComputer,
  GetMonitoredComputerTool,
} from "./operations/monitored-computers.js";
import {
  listVendorRiskAttributes,
  ListVendorRiskAttributesTool,
} from "./operations/vendor-risk-attributes.js";
import {
  getTrustCenter,
  GetTrustCenterTool,
  getTrustCenterAccessRequests,
  GetTrustCenterAccessRequestsTool,
  getTrustCenterAccessRequest,
  GetTrustCenterAccessRequestTool,
  getTrustCenterViewerActivityEvents,
  GetTrustCenterViewerActivityEventsTool,
  getTrustCenterControlCategories,
  GetTrustCenterControlCategoriesTool,
  getTrustCenterControlCategory,
  GetTrustCenterControlCategoryTool,
  getTrustCenterControls,
  GetTrustCenterControlsTool,
  getTrustCenterControl,
  GetTrustCenterControlTool,
  getTrustCenterFaqs,
  GetTrustCenterFaqsTool,
  getTrustCenterFaq,
  GetTrustCenterFaqTool,
  getTrustCenterResources,
  GetTrustCenterResourcesTool,
  getTrustCenterDocument,
  GetTrustCenterDocumentTool,
} from "./operations/trust-centers.js";
import { initializeToken } from "./auth.js";

const server = new McpServer({
  name: "vanta-mcp",
  version: "1.0.0",
  description:
    "Model Context Protocol server for Vanta's automated security compliance platform. Provides access to security tests, compliance frameworks, and security controls for SOC 2, ISO 27001, HIPAA, GDPR and other standards.",
});

server.tool(
  ListTestsTool.name,
  ListTestsTool.description,
  ListTestsTool.parameters.shape,
  listTests,
);

server.tool(
  GetTestTool.name,
  GetTestTool.description,
  GetTestTool.parameters.shape,
  getTest,
);

server.tool(
  ListTestEntitiesTool.name,
  ListTestEntitiesTool.description,
  ListTestEntitiesTool.parameters.shape,
  listTestEntities,
);

server.tool(
  ListFrameworksTool.name,
  ListFrameworksTool.description,
  ListFrameworksTool.parameters.shape,
  listFrameworks,
);

server.tool(
  ListFrameworkControlsTool.name,
  ListFrameworkControlsTool.description,
  ListFrameworkControlsTool.parameters.shape,
  listFrameworkControls,
);

server.tool(
  GetFrameworkTool.name,
  GetFrameworkTool.description,
  GetFrameworkTool.parameters.shape,
  getFramework,
);

server.tool(
  ListControlsTool.name,
  ListControlsTool.description,
  ListControlsTool.parameters.shape,
  listControls,
);

server.tool(
  ListControlTestsTool.name,
  ListControlTestsTool.description,
  ListControlTestsTool.parameters.shape,
  listControlTests,
);

server.tool(
  ListLibraryControlsTool.name,
  ListLibraryControlsTool.description,
  ListLibraryControlsTool.parameters.shape,
  listLibraryControls,
);

server.tool(
  ListControlDocumentsTool.name,
  ListControlDocumentsTool.description,
  ListControlDocumentsTool.parameters.shape,
  listControlDocuments,
);

server.tool(
  GetControlTool.name,
  GetControlTool.description,
  GetControlTool.parameters.shape,
  getControl,
);

server.tool(
  ListRisksTool.name,
  ListRisksTool.description,
  ListRisksTool.parameters.shape,
  listRisks,
);

server.tool(
  GetRiskTool.name,
  GetRiskTool.description,
  GetRiskTool.parameters.shape,
  getRisk,
);

server.tool(
  ListIntegrationsTool.name,
  ListIntegrationsTool.description,
  ListIntegrationsTool.parameters.shape,
  listIntegrations,
);

server.tool(
  GetIntegrationTool.name,
  GetIntegrationTool.description,
  GetIntegrationTool.parameters.shape,
  getIntegration,
);

server.tool(
  ListIntegrationResourceKindsTool.name,
  ListIntegrationResourceKindsTool.description,
  ListIntegrationResourceKindsTool.parameters.shape,
  listIntegrationResourceKinds,
);

server.tool(
  GetIntegrationResourceKindDetailsTool.name,
  GetIntegrationResourceKindDetailsTool.description,
  GetIntegrationResourceKindDetailsTool.parameters.shape,
  getIntegrationResourceKindDetails,
);

server.tool(
  ListIntegrationResourcesTool.name,
  ListIntegrationResourcesTool.description,
  ListIntegrationResourcesTool.parameters.shape,
  listIntegrationResources,
);

server.tool(
  GetIntegrationResourceTool.name,
  GetIntegrationResourceTool.description,
  GetIntegrationResourceTool.parameters.shape,
  getIntegrationResource,
);

server.tool(
  ListVendorsTool.name,
  ListVendorsTool.description,
  ListVendorsTool.parameters.shape,
  listVendors,
);

server.tool(
  GetVendorTool.name,
  GetVendorTool.description,
  GetVendorTool.parameters.shape,
  getVendor,
);

server.tool(
  ListVendorDocumentsTool.name,
  ListVendorDocumentsTool.description,
  ListVendorDocumentsTool.parameters.shape,
  listVendorDocuments,
);

server.tool(
  ListVendorFindingsTool.name,
  ListVendorFindingsTool.description,
  ListVendorFindingsTool.parameters.shape,
  listVendorFindings,
);

server.tool(
  ListVendorSecurityReviewsTool.name,
  ListVendorSecurityReviewsTool.description,
  ListVendorSecurityReviewsTool.parameters.shape,
  listVendorSecurityReviews,
);

server.tool(
  GetVendorSecurityReviewTool.name,
  GetVendorSecurityReviewTool.description,
  GetVendorSecurityReviewTool.parameters.shape,
  getVendorSecurityReview,
);

server.tool(
  ListVendorSecurityReviewDocumentsTool.name,
  ListVendorSecurityReviewDocumentsTool.description,
  ListVendorSecurityReviewDocumentsTool.parameters.shape,
  listVendorSecurityReviewDocuments,
);

server.tool(
  ListDocumentsTool.name,
  ListDocumentsTool.description,
  ListDocumentsTool.parameters.shape,
  listDocuments,
);

server.tool(
  GetDocumentTool.name,
  GetDocumentTool.description,
  GetDocumentTool.parameters.shape,
  getDocument,
);

server.tool(
  ListDocumentControlsTool.name,
  ListDocumentControlsTool.description,
  ListDocumentControlsTool.parameters.shape,
  listDocumentControls,
);

server.tool(
  ListDocumentLinksTool.name,
  ListDocumentLinksTool.description,
  ListDocumentLinksTool.parameters.shape,
  listDocumentLinks,
);

server.tool(
  ListDocumentUploadsTool.name,
  ListDocumentUploadsTool.description,
  ListDocumentUploadsTool.parameters.shape,
  listDocumentUploads,
);

server.tool(
  DownloadDocumentFileTool.name,
  DownloadDocumentFileTool.description,
  DownloadDocumentFileTool.parameters.shape,
  downloadDocumentFile,
);

server.tool(
  ListPoliciesTool.name,
  ListPoliciesTool.description,
  ListPoliciesTool.parameters.shape,
  listPolicies,
);

server.tool(
  GetPolicyTool.name,
  GetPolicyTool.description,
  GetPolicyTool.parameters.shape,
  getPolicy,
);

server.tool(
  ListDiscoveredVendorsTool.name,
  ListDiscoveredVendorsTool.description,
  ListDiscoveredVendorsTool.parameters.shape,
  listDiscoveredVendors,
);

server.tool(
  ListDiscoveredVendorAccountsTool.name,
  ListDiscoveredVendorAccountsTool.description,
  ListDiscoveredVendorAccountsTool.parameters.shape,
  listDiscoveredVendorAccounts,
);

server.tool(
  ListGroupsTool.name,
  ListGroupsTool.description,
  ListGroupsTool.parameters.shape,
  listGroups,
);

server.tool(
  GetGroupTool.name,
  GetGroupTool.description,
  GetGroupTool.parameters.shape,
  getGroup,
);

server.tool(
  ListGroupPeopleTool.name,
  ListGroupPeopleTool.description,
  ListGroupPeopleTool.parameters.shape,
  listGroupPeople,
);

server.tool(
  ListPeopleTool.name,
  ListPeopleTool.description,
  ListPeopleTool.parameters.shape,
  listPeople,
);

server.tool(
  GetPersonTool.name,
  GetPersonTool.description,
  GetPersonTool.parameters.shape,
  getPerson,
);

server.tool(
  ListVulnerabilitiesTool.name,
  ListVulnerabilitiesTool.description,
  ListVulnerabilitiesTool.parameters.shape,
  listVulnerabilities,
);

server.tool(
  GetVulnerabilityTool.name,
  GetVulnerabilityTool.description,
  GetVulnerabilityTool.parameters.shape,
  getVulnerability,
);

server.tool(
  ListVulnerabilityRemediationsTool.name,
  ListVulnerabilityRemediationsTool.description,
  ListVulnerabilityRemediationsTool.parameters.shape,
  listVulnerabilityRemediations,
);

server.tool(
  ListVulnerableAssetsTool.name,
  ListVulnerableAssetsTool.description,
  ListVulnerableAssetsTool.parameters.shape,
  listVulnerableAssets,
);

server.tool(
  GetVulnerableAssetTool.name,
  GetVulnerableAssetTool.description,
  GetVulnerableAssetTool.parameters.shape,
  getVulnerableAsset,
);

server.tool(
  ListMonitoredComputersTool.name,
  ListMonitoredComputersTool.description,
  ListMonitoredComputersTool.parameters.shape,
  listMonitoredComputers,
);

server.tool(
  GetMonitoredComputerTool.name,
  GetMonitoredComputerTool.description,
  GetMonitoredComputerTool.parameters.shape,
  getMonitoredComputer,
);

server.tool(
  ListVendorRiskAttributesTool.name,
  ListVendorRiskAttributesTool.description,
  ListVendorRiskAttributesTool.parameters.shape,
  listVendorRiskAttributes,
);

server.tool(
  GetTrustCenterTool.name,
  GetTrustCenterTool.description,
  GetTrustCenterTool.parameters.shape,
  getTrustCenter,
);

server.tool(
  GetTrustCenterAccessRequestsTool.name,
  GetTrustCenterAccessRequestsTool.description,
  GetTrustCenterAccessRequestsTool.parameters.shape,
  getTrustCenterAccessRequests,
);

server.tool(
  GetTrustCenterAccessRequestTool.name,
  GetTrustCenterAccessRequestTool.description,
  GetTrustCenterAccessRequestTool.parameters.shape,
  getTrustCenterAccessRequest,
);

server.tool(
  GetTrustCenterViewerActivityEventsTool.name,
  GetTrustCenterViewerActivityEventsTool.description,
  GetTrustCenterViewerActivityEventsTool.parameters.shape,
  getTrustCenterViewerActivityEvents,
);

server.tool(
  GetTrustCenterControlCategoriesTool.name,
  GetTrustCenterControlCategoriesTool.description,
  GetTrustCenterControlCategoriesTool.parameters.shape,
  getTrustCenterControlCategories,
);

server.tool(
  GetTrustCenterControlCategoryTool.name,
  GetTrustCenterControlCategoryTool.description,
  GetTrustCenterControlCategoryTool.parameters.shape,
  getTrustCenterControlCategory,
);

server.tool(
  GetTrustCenterControlsTool.name,
  GetTrustCenterControlsTool.description,
  GetTrustCenterControlsTool.parameters.shape,
  getTrustCenterControls,
);

server.tool(
  GetTrustCenterControlTool.name,
  GetTrustCenterControlTool.description,
  GetTrustCenterControlTool.parameters.shape,
  getTrustCenterControl,
);

server.tool(
  GetTrustCenterFaqsTool.name,
  GetTrustCenterFaqsTool.description,
  GetTrustCenterFaqsTool.parameters.shape,
  getTrustCenterFaqs,
);

server.tool(
  GetTrustCenterFaqTool.name,
  GetTrustCenterFaqTool.description,
  GetTrustCenterFaqTool.parameters.shape,
  getTrustCenterFaq,
);

server.tool(
  GetTrustCenterResourcesTool.name,
  GetTrustCenterResourcesTool.description,
  GetTrustCenterResourcesTool.parameters.shape,
  getTrustCenterResources,
);

server.tool(
  GetTrustCenterDocumentTool.name,
  GetTrustCenterDocumentTool.description,
  GetTrustCenterDocumentTool.parameters.shape,
  getTrustCenterDocument,
);

async function main() {
  try {
    await initializeToken();
    console.error("Token initialized successfully");
  } catch (error) {
    console.error("Failed to initialize token:", error);
    process.exit(1);
  }

  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch(error => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
