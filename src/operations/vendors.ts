// 1. Imports
import {
  CallToolResult,
  Tool,
  z,
  createConsolidatedSchema,
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

const VendorComplianceInput = z.object({
  vendorId: z.string().describe(VENDOR_ID_DESCRIPTION),
  complianceType: z
    .enum(["documents", "findings", "security_reviews"])
    .describe(
      "Type of vendor compliance data: 'documents' for compliance documentation, 'findings' for security findings, 'security_reviews' for security assessments",
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

export const VendorComplianceTool: Tool<typeof VendorComplianceInput> = {
  name: "vendor_compliance",
  description:
    "Access vendor compliance data including documents, findings, and security reviews. Specify complianceType to get the specific type of compliance information for a vendor. Use this to explore vendor compliance documentation, security findings, and assessment history.",
  parameters: VendorComplianceInput,
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

export async function vendorCompliance(
  args: z.infer<typeof VendorComplianceInput>,
): Promise<CallToolResult> {
  const { vendorId, complianceType, ...params } = args;

  const endpoints = {
    documents: `/v1/vendors/${String(vendorId)}/documents`,
    findings: `/v1/vendors/${String(vendorId)}/findings`,
    security_reviews: `/v1/vendors/${String(vendorId)}/security-reviews`,
  };

  const endpoint = endpoints[complianceType];
  if (!endpoint) {
    return {
      content: [
        {
          type: "text",
          text: `Error: Invalid complianceType '${complianceType}'. Must be one of: documents, findings, security_reviews`,
        },
      ],
      isError: true,
    };
  }

  const url = buildUrl(endpoint, params);
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
    { tool: VendorComplianceTool, handler: vendorCompliance },
    { tool: GetVendorSecurityReviewTool, handler: getVendorSecurityReview },
    {
      tool: ListVendorSecurityReviewDocumentsTool,
      handler: listVendorSecurityReviewDocuments,
    },
  ],
};
