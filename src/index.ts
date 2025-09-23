#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  getTestEntities,
  GetTestEntitiesTool,
  getTests,
  GetTestsTool,
  getTestById,
  GetTestByIdTool,
} from "./operations/tests.js";
import {
  GetFrameworkControlsTool,
  GetFrameworksTool,
  GetFrameworkByIdTool,
  getFrameworkControls,
  getFrameworks,
  getFrameworkById,
} from "./operations/frameworks.js";
import {
  GetControlsTool,
  GetControlTestsTool,
  GetLibraryControlsTool,
  GetControlDocumentsTool,
  GetControlByIdTool,
  getControls,
  getControlTests,
  getLibraryControls,
  getControlDocuments,
  getControlById,
} from "./operations/controls.js";
import { getRisks, GetRisksTool, getRiskById, GetRiskByIdTool } from "./operations/risks.js";
import {
  getIntegrations,
  GetIntegrationsTool,
  getIntegrationById,
  GetIntegrationByIdTool,
  getIntegrationResourceKinds,
  GetIntegrationResourceKindsTool,
  getIntegrationResourceKindDetails,
  GetIntegrationResourceKindDetailsTool,
  getIntegrationResources,
  GetIntegrationResourcesTool,
  getIntegrationResourceById,
  GetIntegrationResourceByIdTool,
} from "./operations/integrations.js";
import {
  getVendors,
  GetVendorsTool,
  getVendorById,
  GetVendorByIdTool,
  getVendorDocuments,
  GetVendorDocumentsTool,
  getVendorFindings,
  GetVendorFindingsTool,
  getVendorSecurityReviews,
  GetVendorSecurityReviewsTool,
  getVendorSecurityReviewById,
  GetVendorSecurityReviewByIdTool,
  getVendorSecurityReviewDocuments,
  GetVendorSecurityReviewDocumentsTool,
} from "./operations/vendors.js";
import { initializeToken } from "./auth.js";

const server = new McpServer({
  name: "vanta-mcp",
  version: "1.0.0",
  description:
    "Model Context Protocol server for Vanta's automated security compliance platform. Provides access to security tests, compliance frameworks, and security controls for SOC 2, ISO 27001, HIPAA, GDPR and other standards.",
});

server.tool(
  GetTestsTool.name,
  GetTestsTool.description,
  GetTestsTool.parameters.shape,
  getTests,
);

server.tool(
  GetTestByIdTool.name,
  GetTestByIdTool.description,
  GetTestByIdTool.parameters.shape,
  getTestById,
);

server.tool(
  GetTestEntitiesTool.name,
  GetTestEntitiesTool.description,
  GetTestEntitiesTool.parameters.shape,
  getTestEntities,
);

server.tool(
  GetFrameworksTool.name,
  GetFrameworksTool.description,
  GetFrameworksTool.parameters.shape,
  getFrameworks,
);

server.tool(
  GetFrameworkControlsTool.name,
  GetFrameworkControlsTool.description,
  GetFrameworkControlsTool.parameters.shape,
  getFrameworkControls,
);

server.tool(
  GetFrameworkByIdTool.name,
  GetFrameworkByIdTool.description,
  GetFrameworkByIdTool.parameters.shape,
  getFrameworkById,
);

server.tool(
  GetControlsTool.name,
  GetControlsTool.description,
  GetControlsTool.parameters.shape,
  getControls,
);

server.tool(
  GetControlTestsTool.name,
  GetControlTestsTool.description,
  GetControlTestsTool.parameters.shape,
  getControlTests,
);

server.tool(
  GetLibraryControlsTool.name,
  GetLibraryControlsTool.description,
  GetLibraryControlsTool.parameters.shape,
  getLibraryControls,
);

server.tool(
  GetControlDocumentsTool.name,
  GetControlDocumentsTool.description,
  GetControlDocumentsTool.parameters.shape,
  getControlDocuments,
);

server.tool(
  GetControlByIdTool.name,
  GetControlByIdTool.description,
  GetControlByIdTool.parameters.shape,
  getControlById,
);

server.tool(
  GetRisksTool.name,
  GetRisksTool.description,
  GetRisksTool.parameters.shape,
  getRisks,
);

server.tool(
  GetRiskByIdTool.name,
  GetRiskByIdTool.description,
  GetRiskByIdTool.parameters.shape,
  getRiskById,
);

server.tool(
  GetIntegrationsTool.name,
  GetIntegrationsTool.description,
  GetIntegrationsTool.parameters.shape,
  getIntegrations,
);

server.tool(
  GetIntegrationByIdTool.name,
  GetIntegrationByIdTool.description,
  GetIntegrationByIdTool.parameters.shape,
  getIntegrationById,
);

server.tool(
  GetIntegrationResourceKindsTool.name,
  GetIntegrationResourceKindsTool.description,
  GetIntegrationResourceKindsTool.parameters.shape,
  getIntegrationResourceKinds,
);

server.tool(
  GetIntegrationResourceKindDetailsTool.name,
  GetIntegrationResourceKindDetailsTool.description,
  GetIntegrationResourceKindDetailsTool.parameters.shape,
  getIntegrationResourceKindDetails,
);

server.tool(
  GetIntegrationResourcesTool.name,
  GetIntegrationResourcesTool.description,
  GetIntegrationResourcesTool.parameters.shape,
  getIntegrationResources,
);

server.tool(
  GetIntegrationResourceByIdTool.name,
  GetIntegrationResourceByIdTool.description,
  GetIntegrationResourceByIdTool.parameters.shape,
  getIntegrationResourceById,
);

server.tool(
  GetVendorsTool.name,
  GetVendorsTool.description,
  GetVendorsTool.parameters.shape,
  getVendors,
);

server.tool(
  GetVendorByIdTool.name,
  GetVendorByIdTool.description,
  GetVendorByIdTool.parameters.shape,
  getVendorById,
);

server.tool(
  GetVendorDocumentsTool.name,
  GetVendorDocumentsTool.description,
  GetVendorDocumentsTool.parameters.shape,
  getVendorDocuments,
);

server.tool(
  GetVendorFindingsTool.name,
  GetVendorFindingsTool.description,
  GetVendorFindingsTool.parameters.shape,
  getVendorFindings,
);

server.tool(
  GetVendorSecurityReviewsTool.name,
  GetVendorSecurityReviewsTool.description,
  GetVendorSecurityReviewsTool.parameters.shape,
  getVendorSecurityReviews,
);

server.tool(
  GetVendorSecurityReviewByIdTool.name,
  GetVendorSecurityReviewByIdTool.description,
  GetVendorSecurityReviewByIdTool.parameters.shape,
  getVendorSecurityReviewById,
);

server.tool(
  GetVendorSecurityReviewDocumentsTool.name,
  GetVendorSecurityReviewDocumentsTool.description,
  GetVendorSecurityReviewDocumentsTool.parameters.shape,
  getVendorSecurityReviewDocuments,
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
