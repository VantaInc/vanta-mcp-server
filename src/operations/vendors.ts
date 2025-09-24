// 1. Imports
import {
  CallToolResult,
  Tool,
  z,
  createPaginationSchema,
  createIdSchema,
  createIdWithPaginationSchema,
  makePaginatedGetRequest,
  makeGetByIdRequest,
  buildUrl,
  makeAuthenticatedRequest,
  handleApiResponse,
  VENDOR_ID_DESCRIPTION,
} from "./common/imports.js";

// 2. Input Schemas
const ListVendorsInput = createPaginationSchema();

const GetVendorInput = createIdSchema({
  paramName: "vendorId",
  description: VENDOR_ID_DESCRIPTION,
});

const ListVendorDocumentsInput = createIdWithPaginationSchema({
  paramName: "vendorId",
  description: VENDOR_ID_DESCRIPTION,
});

const ListVendorFindingsInput = createIdWithPaginationSchema({
  paramName: "vendorId",
  description: VENDOR_ID_DESCRIPTION,
});

const ListVendorSecurityReviewsInput = createIdWithPaginationSchema({
  paramName: "vendorId",
  description: VENDOR_ID_DESCRIPTION,
});

const GetVendorSecurityReviewInput = z.object({
  vendorId: z.string().describe(VENDOR_ID_DESCRIPTION),
  securityReviewId: z
    .string()
    .describe(
      "Security review ID to get details for, e.g. 'security-review-456'",
    ),
});

const ListVendorSecurityReviewDocumentsInput = z.object({
  vendorId: z.string().describe(VENDOR_ID_DESCRIPTION),
  securityReviewId: z
    .string()
    .describe(
      "Security review ID to get documents for, e.g. 'security-review-456'",
    ),
  ...createPaginationSchema().shape,
});

// 3. Tool Definitions
export const ListVendorsTool: Tool<typeof ListVendorsInput> = {
  name: "list_vendors",
  description:
    "List all vendors in your Vanta account. Returns vendor IDs, names, website URLs, and many other vendor attributes. Use this to see all existing vendors.",
  parameters: ListVendorsInput,
};

export const GetVendorTool: Tool<typeof GetVendorInput> = {
  name: "get_vendor",
  description:
    "Get vendor by ID. Retrieve detailed information about a specific vendor when its ID is known. The ID of a vendor can be found from get_vendors response. Returns complete vendor details including name, website URLs, contact information, and risk assessment status.",
  parameters: GetVendorInput,
};

export const ListVendorDocumentsTool: Tool<typeof ListVendorDocumentsInput> = {
  name: "list_vendor_documents",
  description:
    "List vendor documents. Get all documents associated with a specific vendor for compliance and risk assessment purposes. Use this to see what documentation is available for vendor due diligence.",
  parameters: ListVendorDocumentsInput,
};

export const ListVendorFindingsTool: Tool<typeof ListVendorFindingsInput> = {
  name: "list_vendor_findings",
  description:
    "List vendor findings. Get all security findings and risk assessment results for a specific vendor. Use this to understand security concerns and compliance issues related to a vendor.",
  parameters: ListVendorFindingsInput,
};

export const ListVendorSecurityReviewsTool: Tool<
  typeof ListVendorSecurityReviewsInput
> = {
  name: "list_vendor_security_reviews",
  description:
    "Get security reviews by vendor ID. List all security reviews conducted for a specific vendor. Use this to see the history of security assessments and due diligence activities.",
  parameters: ListVendorSecurityReviewsInput,
};

export const GetVendorSecurityReviewTool: Tool<
  typeof GetVendorSecurityReviewInput
> = {
  name: "get_vendor_security_review",
  description:
    "Get security review by ID. Retrieve detailed information about a specific security review for a vendor. Use this to get complete details about a particular security assessment including findings, status, and recommendations.",
  parameters: GetVendorSecurityReviewInput,
};

export const ListVendorSecurityReviewDocumentsTool: Tool<
  typeof ListVendorSecurityReviewDocumentsInput
> = {
  name: "list_vendor_security_review_documents",
  description:
    "Get security review documents. List all documents associated with a specific vendor security review. Use this to access supporting documentation, evidence, and reports related to a security assessment.",
  parameters: ListVendorSecurityReviewDocumentsInput,
};

// 4. Implementation Functions
export async function listVendors(
  args: z.infer<typeof ListVendorsInput>,
): Promise<CallToolResult> {
  return makePaginatedGetRequest("/v1/vendors", args);
}

export async function getVendor(
  args: z.infer<typeof GetVendorInput>,
): Promise<CallToolResult> {
  return makeGetByIdRequest("/v1/vendors", args.vendorId);
}

export async function listVendorDocuments(
  args: z.infer<typeof ListVendorDocumentsInput>,
): Promise<CallToolResult> {
  const { vendorId, ...params } = args;
  const url = buildUrl(`/v1/vendors/${String(vendorId)}/documents`, params);
  const response = await makeAuthenticatedRequest(url);
  return handleApiResponse(response);
}

export async function listVendorFindings(
  args: z.infer<typeof ListVendorFindingsInput>,
): Promise<CallToolResult> {
  const { vendorId, ...params } = args;
  const url = buildUrl(`/v1/vendors/${String(vendorId)}/findings`, params);
  const response = await makeAuthenticatedRequest(url);
  return handleApiResponse(response);
}

export async function listVendorSecurityReviews(
  args: z.infer<typeof ListVendorSecurityReviewsInput>,
): Promise<CallToolResult> {
  const { vendorId, ...params } = args;
  const url = buildUrl(
    `/v1/vendors/${String(vendorId)}/security-reviews`,
    params,
  );
  const response = await makeAuthenticatedRequest(url);
  return handleApiResponse(response);
}

export async function getVendorSecurityReview(
  args: z.infer<typeof GetVendorSecurityReviewInput>,
): Promise<CallToolResult> {
  const url = buildUrl(
    `/v1/vendors/${String(args.vendorId)}/security-reviews/${String(args.securityReviewId)}`,
  );
  const response = await makeAuthenticatedRequest(url);
  return handleApiResponse(response);
}

export async function listVendorSecurityReviewDocuments(
  args: z.infer<typeof ListVendorSecurityReviewDocumentsInput>,
): Promise<CallToolResult> {
  const { vendorId, securityReviewId, ...params } = args;
  const url = buildUrl(
    `/v1/vendors/${String(vendorId)}/security-reviews/${String(securityReviewId)}/documents`,
    params,
  );
  const response = await makeAuthenticatedRequest(url);
  return handleApiResponse(response);
}

// Registry export for automated tool registration
export default {
  tools: [
    { tool: ListVendorsTool, handler: listVendors },
    { tool: GetVendorTool, handler: getVendor },
    { tool: ListVendorDocumentsTool, handler: listVendorDocuments },
    { tool: ListVendorFindingsTool, handler: listVendorFindings },
    { tool: ListVendorSecurityReviewsTool, handler: listVendorSecurityReviews },
    { tool: GetVendorSecurityReviewTool, handler: getVendorSecurityReview },
    {
      tool: ListVendorSecurityReviewDocumentsTool,
      handler: listVendorSecurityReviewDocuments,
    },
  ],
};
