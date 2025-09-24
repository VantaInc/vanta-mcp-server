// Barrel export for all Vanta MCP operations
// This file provides a single entry point for importing any operation tools
// from the Vanta MCP Server operations module.

// Individual operation modules
export * from "./tests.js";
export * from "./frameworks.js";
export * from "./controls.js";
export * from "./risks.js";
export * from "./integrations.js";
export * from "./vendors.js";
export * from "./documents.js";
export * from "./policies.js";
export * from "./discovered-vendors.js";
export * from "./groups.js";
export * from "./people.js";
export * from "./vulnerabilities.js";
export * from "./vulnerability-remediations.js";
export * from "./vulnerable-assets.js";
export * from "./monitored-computers.js";
export * from "./vendor-risk-attributes.js";
export * from "./trust-centers.js";

// Common utilities and shared resources
export * from "./common/utils.js";
export * from "./common/descriptions.js";
export * from "./common/imports.js";
