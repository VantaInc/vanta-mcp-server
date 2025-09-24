import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { baseApiUrl } from "../api.js";
import { Tool } from "../types.js";
import { z } from "zod";
import { makeAuthenticatedRequest } from "./utils.js";
import {
  PAGE_SIZE_DESCRIPTION,
  PAGE_CURSOR_DESCRIPTION,
  VENDOR_ID_DESCRIPTION,
} from "./global-descriptions.js";

const GetVendorsInput = z.object({
  pageSize: z.number().describe(PAGE_SIZE_DESCRIPTION).optional(),
  pageCursor: z.string().describe(PAGE_CURSOR_DESCRIPTION).optional(),
});

export const GetVendorsTool: Tool<typeof GetVendorsInput> = {
  name: "get_vendors",
  description:
    "List all vendors in your Vanta account. Returns vendor IDs, names, website URLs, and many other vendor attributes. Use this to see all existing vendors.",
  parameters: GetVendorsInput,
};

const GetVendorByIdInput = z.object({
  vendorId: z.string().describe(VENDOR_ID_DESCRIPTION),
});

export const GetVendorByIdTool: Tool<typeof GetVendorByIdInput> = {
  name: "get_vendor_by_id",
  description:
    "Get vendor by ID. Retrieve detailed information about a specific vendor when its ID is known. The ID of a vendor can be found from get_vendors response. Returns complete vendor details including name, website URLs, contact information, and risk assessment status.",
  parameters: GetVendorByIdInput,
};

const GetVendorDocumentsInput = z.object({
  vendorId: z.string().describe(VENDOR_ID_DESCRIPTION),
  pageSize: z.number().describe(PAGE_SIZE_DESCRIPTION).optional(),
  pageCursor: z.string().describe(PAGE_CURSOR_DESCRIPTION).optional(),
});

export const GetVendorDocumentsTool: Tool<typeof GetVendorDocumentsInput> = {
  name: "get_vendor_documents",
  description:
    "List vendor documents. Get all documents associated with a specific vendor for compliance and risk assessment purposes. Use this to see what documentation is available for vendor due diligence.",
  parameters: GetVendorDocumentsInput,
};

const GetVendorFindingsInput = z.object({
  vendorId: z.string().describe(VENDOR_ID_DESCRIPTION),
  pageSize: z.number().describe(PAGE_SIZE_DESCRIPTION).optional(),
  pageCursor: z.string().describe(PAGE_CURSOR_DESCRIPTION).optional(),
});

export const GetVendorFindingsTool: Tool<typeof GetVendorFindingsInput> = {
  name: "get_vendor_findings",
  description:
    "List vendor findings. Get all security findings and risk assessment results for a specific vendor. Use this to understand security concerns and compliance issues related to a vendor.",
  parameters: GetVendorFindingsInput,
};

const GetVendorSecurityReviewsInput = z.object({
  vendorId: z.string().describe(VENDOR_ID_DESCRIPTION),
  pageSize: z.number().describe(PAGE_SIZE_DESCRIPTION).optional(),
  pageCursor: z.string().describe(PAGE_CURSOR_DESCRIPTION).optional(),
});

export const GetVendorSecurityReviewsTool: Tool<
  typeof GetVendorSecurityReviewsInput
> = {
  name: "get_vendor_security_reviews",
  description:
    "Get security reviews by vendor ID. List all security reviews conducted for a specific vendor. Use this to see the history of security assessments and due diligence activities.",
  parameters: GetVendorSecurityReviewsInput,
};

const GetVendorSecurityReviewByIdInput = z.object({
  vendorId: z.string().describe(VENDOR_ID_DESCRIPTION),
  securityReviewId: z
    .string()
    .describe(
      "Security review ID to get details for, e.g. 'security-review-456'",
    ),
});

export const GetVendorSecurityReviewByIdTool: Tool<
  typeof GetVendorSecurityReviewByIdInput
> = {
  name: "get_vendor_security_review_by_id",
  description:
    "Get security review by ID. Retrieve detailed information about a specific security review for a vendor. Use this to get complete details about a particular security assessment including findings, status, and recommendations.",
  parameters: GetVendorSecurityReviewByIdInput,
};

const GetVendorSecurityReviewDocumentsInput = z.object({
  vendorId: z.string().describe(VENDOR_ID_DESCRIPTION),
  securityReviewId: z
    .string()
    .describe(
      "Security review ID to get documents for, e.g. 'security-review-456'",
    ),
  pageSize: z.number().describe(PAGE_SIZE_DESCRIPTION).optional(),
  pageCursor: z.string().describe(PAGE_CURSOR_DESCRIPTION).optional(),
});

export const GetVendorSecurityReviewDocumentsTool: Tool<
  typeof GetVendorSecurityReviewDocumentsInput
> = {
  name: "get_vendor_security_review_documents",
  description:
    "Get security review documents. List all documents associated with a specific vendor security review. Use this to access supporting documentation, evidence, and reports related to a security assessment.",
  parameters: GetVendorSecurityReviewDocumentsInput,
};

export async function getVendors(
  args: z.infer<typeof GetVendorsInput>,
): Promise<CallToolResult> {
  const url = new URL("/v1/vendors", baseApiUrl());

  if (args.pageSize !== undefined) {
    url.searchParams.append("pageSize", args.pageSize.toString());
  }
  if (args.pageCursor !== undefined) {
    url.searchParams.append("pageCursor", args.pageCursor);
  }

  const response = await makeAuthenticatedRequest(url.toString());

  if (!response.ok) {
    return {
      content: [
        {
          type: "text" as const,
          text: `Error: ${response.statusText}`,
        },
      ],
    };
  }

  return {
    content: [
      { type: "text" as const, text: JSON.stringify(await response.json()) },
    ],
  };
}

export async function getVendorById(
  args: z.infer<typeof GetVendorByIdInput>,
): Promise<CallToolResult> {
  const url = new URL(`/v1/vendors/${args.vendorId}`, baseApiUrl());

  const response = await makeAuthenticatedRequest(url.toString());

  if (!response.ok) {
    return {
      content: [
        {
          type: "text" as const,
          text: `Error: ${response.statusText}`,
        },
      ],
    };
  }

  return {
    content: [
      { type: "text" as const, text: JSON.stringify(await response.json()) },
    ],
  };
}

export async function getVendorDocuments(
  args: z.infer<typeof GetVendorDocumentsInput>,
): Promise<CallToolResult> {
  const url = new URL(`/v1/vendors/${args.vendorId}/documents`, baseApiUrl());

  if (args.pageSize !== undefined) {
    url.searchParams.append("pageSize", args.pageSize.toString());
  }
  if (args.pageCursor !== undefined) {
    url.searchParams.append("pageCursor", args.pageCursor);
  }

  const response = await makeAuthenticatedRequest(url.toString());

  if (!response.ok) {
    return {
      content: [
        {
          type: "text" as const,
          text: `Error: ${response.statusText}`,
        },
      ],
    };
  }

  return {
    content: [
      { type: "text" as const, text: JSON.stringify(await response.json()) },
    ],
  };
}

export async function getVendorFindings(
  args: z.infer<typeof GetVendorFindingsInput>,
): Promise<CallToolResult> {
  const url = new URL(`/v1/vendors/${args.vendorId}/findings`, baseApiUrl());

  if (args.pageSize !== undefined) {
    url.searchParams.append("pageSize", args.pageSize.toString());
  }
  if (args.pageCursor !== undefined) {
    url.searchParams.append("pageCursor", args.pageCursor);
  }

  const response = await makeAuthenticatedRequest(url.toString());

  if (!response.ok) {
    return {
      content: [
        {
          type: "text" as const,
          text: `Error: ${response.statusText}`,
        },
      ],
    };
  }

  return {
    content: [
      { type: "text" as const, text: JSON.stringify(await response.json()) },
    ],
  };
}

export async function getVendorSecurityReviews(
  args: z.infer<typeof GetVendorSecurityReviewsInput>,
): Promise<CallToolResult> {
  const url = new URL(
    `/v1/vendors/${args.vendorId}/security-reviews`,
    baseApiUrl(),
  );

  if (args.pageSize !== undefined) {
    url.searchParams.append("pageSize", args.pageSize.toString());
  }
  if (args.pageCursor !== undefined) {
    url.searchParams.append("pageCursor", args.pageCursor);
  }

  const response = await makeAuthenticatedRequest(url.toString());

  if (!response.ok) {
    return {
      content: [
        {
          type: "text" as const,
          text: `Error: ${response.statusText}`,
        },
      ],
    };
  }

  return {
    content: [
      { type: "text" as const, text: JSON.stringify(await response.json()) },
    ],
  };
}

export async function getVendorSecurityReviewById(
  args: z.infer<typeof GetVendorSecurityReviewByIdInput>,
): Promise<CallToolResult> {
  const url = new URL(
    `/v1/vendors/${args.vendorId}/security-reviews/${args.securityReviewId}`,
    baseApiUrl(),
  );

  const response = await makeAuthenticatedRequest(url.toString());

  if (!response.ok) {
    return {
      content: [
        {
          type: "text" as const,
          text: `Error: ${response.statusText}`,
        },
      ],
    };
  }

  return {
    content: [
      { type: "text" as const, text: JSON.stringify(await response.json()) },
    ],
  };
}

export async function getVendorSecurityReviewDocuments(
  args: z.infer<typeof GetVendorSecurityReviewDocumentsInput>,
): Promise<CallToolResult> {
  const url = new URL(
    `/v1/vendors/${args.vendorId}/security-reviews/${args.securityReviewId}/documents`,
    baseApiUrl(),
  );

  if (args.pageSize !== undefined) {
    url.searchParams.append("pageSize", args.pageSize.toString());
  }
  if (args.pageCursor !== undefined) {
    url.searchParams.append("pageCursor", args.pageCursor);
  }

  const response = await makeAuthenticatedRequest(url.toString());

  if (!response.ok) {
    return {
      content: [
        {
          type: "text" as const,
          text: `Error: ${response.statusText}`,
        },
      ],
    };
  }

  return {
    content: [
      { type: "text" as const, text: JSON.stringify(await response.json()) },
    ],
  };
}
