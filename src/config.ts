const normalizeName = (name: string): string => name.trim().toLowerCase();

const enabledToolNames = [
  // Add tool names here to restrict the server to a subset of tools.
  // Leave the array empty to enable every tool.
  // Example:
  // "tests",
  // "list_test_entities",
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
].map(normalizeName);

export const enabledTools = new Set<string>(enabledToolNames);

export const hasEnabledToolFilter = enabledTools.size > 0;

export const isToolEnabled = (toolName: string): boolean => {
  if (!hasEnabledToolFilter) {
    return true;
  }
  return enabledTools.has(normalizeName(toolName));
};

export const getEnabledToolNames = (): string[] => [...enabledTools];
