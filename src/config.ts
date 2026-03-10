const normalizeName = (name: string): string => name.trim().toLowerCase();

const defaultToolNames = [
  // Default set of tools enabled out of the box.
  // To enable additional tools, set the VANTA_MCP_ENABLED_TOOLS environment
  // variable to a comma-separated list of tool names (e.g.
  // "vendors,list_discovered_vendors"). These are merged with the defaults.
  //
  // To enable every tool, set VANTA_MCP_ENABLED_TOOLS=* or leave this array
  // empty and unset the environment variable.
  "tests",
  "list_test_entities",
  "people",
  "documents",
  "document_resources",
  "integrations",
  "integration_resources",
  "controls",
  "list_control_tests",
  "list_control_documents",
  "vulnerabilities",
  "frameworks",
  "list_framework_controls",
  "risks",
];

function resolveEnabledTools(): Set<string> {
  const envValue = process.env.VANTA_MCP_ENABLED_TOOLS?.trim();

  if (envValue === "*") {
    // Wildcard: enable every tool
    return new Set();
  }

  const names = [...defaultToolNames];

  if (envValue) {
    names.push(...envValue.split(","));
  }

  return new Set(names.map(normalizeName).filter(n => n.length > 0));
}

export const enabledTools = resolveEnabledTools();

export const hasEnabledToolFilter = enabledTools.size > 0;

export const isToolEnabled = (toolName: string): boolean => {
  if (!hasEnabledToolFilter) {
    return true;
  }
  return enabledTools.has(normalizeName(toolName));
};

export const getEnabledToolNames = (): string[] => [...enabledTools];
