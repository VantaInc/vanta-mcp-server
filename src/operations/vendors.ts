// 1. Imports
import {
  CallToolResult,
  Tool,
  z,
  createConsolidatedSchema,
  createIdWithPaginationSchema,
  makeConsolidatedRequest,
  buildUrl,
  makeAuthenticatedRequest,
  handleApiResponse,
  VENDOR_ID_DESCRIPTION,
} from "./common/imports.js";

// 2. Input Schemas
const VendorsInput = createConsolidatedSchema({
  paramName: "vendorId",
  description: VENDOR_ID_DESCRIPTION,
  resourceName: "vendor",
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
      "Security review ID to retrieve, e.g. 'review-123' or specific security review identifier",
    ),
});

const ListVendorSecurityReviewDocumentsInput = z.object({
  vendorId: z.string().describe(VENDOR_ID_DESCRIPTION),
  securityReviewId: z
    .string()
    .describe(
      "Security review ID to get documents for, e.g. 'review-123' or specific security review identifier",
    ),
  pageSize: z
    .number()
    .min(1)
    .max(100)
    .describe("Number of items to return per page (1-100)")
    .optional(),
  pageCursor: z
    .string()
    .describe("Cursor for pagination to get the next page of results")
    .optional(),
});

// 3. Tool Definitions
export const VendorsTool: Tool<typeof VendorsInput> = {
  name: "vendors",
  description:
    "Access vendors in your Vanta account. Provide vendorId to get a specific vendor, or omit to list all vendors. Returns vendor details, risk levels, and management status for third-party risk assessment.",
  parameters: VendorsInput,
};

export const ListVendorDocumentsTool: Tool<typeof ListVendorDocumentsInput> = {
  name: "list_vendor_documents",
  description:
    "List vendor's documents. Get all documents associated with a specific vendor for compliance and risk assessment.",
  parameters: ListVendorDocumentsInput,
};

export const ListVendorFindingsTool: Tool<typeof ListVendorFindingsInput> = {
  name: "list_vendor_findings",
  description:
    "List vendor's findings. Get all security findings and compliance issues identified for a specific vendor.",
  parameters: ListVendorFindingsInput,
};

export const ListVendorSecurityReviewsTool: Tool<
  typeof ListVendorSecurityReviewsInput
> = {
  name: "list_vendor_security_reviews",
  description:
    "List vendor's security reviews. Get all security assessments and reviews conducted for a specific vendor.",
  parameters: ListVendorSecurityReviewsInput,
};

export const GetVendorSecurityReviewTool: Tool<
  typeof GetVendorSecurityReviewInput
> = {
  name: "get_vendor_security_review",
  description:
    "Get vendor security review by ID. Retrieve detailed information about a specific security review for a vendor.",
  parameters: GetVendorSecurityReviewInput,
};

export const ListVendorSecurityReviewDocumentsTool: Tool<
  typeof ListVendorSecurityReviewDocumentsInput
> = {
  name: "list_vendor_security_review_documents",
  description:
    "List vendor security review's documents. Get all documents associated with a specific vendor security review.",
  parameters: ListVendorSecurityReviewDocumentsInput,
};

// 4. Implementation Functions
export async function vendors(
  args: z.infer<typeof VendorsInput>,
): Promise<CallToolResult> {
  return makeConsolidatedRequest("/v1/vendors", args, "vendorId");
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
    { tool: VendorsTool, handler: vendors },
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
