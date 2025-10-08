// Common parameter descriptions used across operations
// This file provides centralized, consistent descriptions for commonly used parameters
// across all operations files, ensuring uniformity and maintainability.

export const PAGE_SIZE_DESCRIPTION = `Controls the maximum number of results returned in a single response.
Allowed values: 1–100. Default is 10.`;

export const PAGE_CURSOR_DESCRIPTION = `A marker or pointer telling the API where to start fetching items for the
subsequent page in a paginated response. Leave blank to start from the first page.`;

export const DOCUMENT_ID_DESCRIPTION =
  "Document ID to operate on, e.g. 'document-123' or specific document identifier";

export const SLUG_ID_DESCRIPTION =
  "Slug ID to operate on, e.g. 'my-trust-center' or specific slug identifier";

export const CONTROL_ID_DESCRIPTION =
  "Control ID to operate on, e.g. 'control-123' or specific control identifier";

export const FRAMEWORK_ID_DESCRIPTION =
  "Framework ID to operate on, e.g. 'framework-123' or specific framework identifier";

export const INTEGRATION_ID_DESCRIPTION =
  "Integration ID to operate on, e.g. 'integration-123' or specific integration identifier";

export const VENDOR_ID_DESCRIPTION =
  "Vendor ID to operate on, e.g. 'vendor-123' or specific vendor identifier";

export const DISCOVERED_VENDOR_ID_DESCRIPTION =
  "Discovered vendor ID to operate on, e.g. 'discovered-vendor-123' or specific discovered vendor identifier";
