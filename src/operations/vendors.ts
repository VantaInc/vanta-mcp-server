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

const ListVendorsInput = z.object({
  pageSize: z.number().describe(PAGE_SIZE_DESCRIPTION).optional(),
  pageCursor: z.string().describe(PAGE_CURSOR_DESCRIPTION).optional(),
});

export const ListVendorsTool: Tool<typeof ListVendorsInput> = {
  name: "list_vendors",
  description:
    "List all vendors in your Vanta account. Returns vendor IDs, names, website URLs, and many other vendor attributes. Use this to see all existing vendors.",
  parameters: ListVendorsInput,
};

const GetVendorInput = z.object({
  vendorId: z.string().describe(VENDOR_ID_DESCRIPTION),
});

export const GetVendorTool: Tool<typeof GetVendorInput> = {
  name: "get_vendor",
  description:
    "Get vendor by ID. Retrieve detailed information about a specific vendor when its ID is known. The ID of a vendor can be found from get_vendors response. Returns complete vendor details including name, website URLs, contact information, and risk assessment status.",
  parameters: GetVendorInput,
};

const ListVendorDocumentsInput = z.object({
  vendorId: z.string().describe(VENDOR_ID_DESCRIPTION),
  pageSize: z.number().describe(PAGE_SIZE_DESCRIPTION).optional(),
  pageCursor: z.string().describe(PAGE_CURSOR_DESCRIPTION).optional(),
});

export const ListVendorDocumentsTool: Tool<typeof ListVendorDocumentsInput> = {
  name: "list_vendor_documents",
  description:
    "List vendor documents. Get all documents associated with a specific vendor for compliance and risk assessment purposes. Use this to see what documentation is available for vendor due diligence.",
  parameters: ListVendorDocumentsInput,
};

const ListVendorFindingsInput = z.object({
  vendorId: z.string().describe(VENDOR_ID_DESCRIPTION),
  pageSize: z.number().describe(PAGE_SIZE_DESCRIPTION).optional(),
  pageCursor: z.string().describe(PAGE_CURSOR_DESCRIPTION).optional(),
});

export const ListVendorFindingsTool: Tool<typeof ListVendorFindingsInput> = {
  name: "list_vendor_findings",
  description:
    "List vendor findings. Get all security findings and risk assessment results for a specific vendor. Use this to understand security concerns and compliance issues related to a vendor.",
  parameters: ListVendorFindingsInput,
};

const ListVendorSecurityReviewsInput = z.object({
  vendorId: z.string().describe(VENDOR_ID_DESCRIPTION),
  pageSize: z.number().describe(PAGE_SIZE_DESCRIPTION).optional(),
  pageCursor: z.string().describe(PAGE_CURSOR_DESCRIPTION).optional(),
});

export const ListVendorSecurityReviewsTool: Tool<
  typeof ListVendorSecurityReviewsInput
> = {
  name: "list_vendor_security_reviews",
  description:
    "Get security reviews by vendor ID. List all security reviews conducted for a specific vendor. Use this to see the history of security assessments and due diligence activities.",
  parameters: ListVendorSecurityReviewsInput,
};

const GetVendorSecurityReviewInput = z.object({
  vendorId: z.string().describe(VENDOR_ID_DESCRIPTION),
  securityReviewId: z
    .string()
    .describe(
      "Security review ID to get details for, e.g. 'security-review-456'",
    ),
});

export const GetVendorSecurityReviewTool: Tool<
  typeof GetVendorSecurityReviewInput
> = {
  name: "get_vendor_security_review",
  description:
    "Get security review by ID. Retrieve detailed information about a specific security review for a vendor. Use this to get complete details about a particular security assessment including findings, status, and recommendations.",
  parameters: GetVendorSecurityReviewInput,
};

const ListVendorSecurityReviewDocumentsInput = z.object({
  vendorId: z.string().describe(VENDOR_ID_DESCRIPTION),
  securityReviewId: z
    .string()
    .describe(
      "Security review ID to get documents for, e.g. 'security-review-456'",
    ),
  pageSize: z.number().describe(PAGE_SIZE_DESCRIPTION).optional(),
  pageCursor: z.string().describe(PAGE_CURSOR_DESCRIPTION).optional(),
});

export const ListVendorSecurityReviewDocumentsTool: Tool<
  typeof ListVendorSecurityReviewDocumentsInput
> = {
  name: "list_vendor_security_review_documents",
  description:
    "Get security review documents. List all documents associated with a specific vendor security review. Use this to access supporting documentation, evidence, and reports related to a security assessment.",
  parameters: ListVendorSecurityReviewDocumentsInput,
};

export async function listVendors(
  args: z.infer<typeof ListVendorsInput>,
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

export async function getVendor(
  args: z.infer<typeof GetVendorInput>,
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

export async function listVendorDocuments(
  args: z.infer<typeof ListVendorDocumentsInput>,
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

export async function listVendorFindings(
  args: z.infer<typeof ListVendorFindingsInput>,
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

export async function listVendorSecurityReviews(
  args: z.infer<typeof ListVendorSecurityReviewsInput>,
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

export async function getVendorSecurityReview(
  args: z.infer<typeof GetVendorSecurityReviewInput>,
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

export async function listVendorSecurityReviewDocuments(
  args: z.infer<typeof ListVendorSecurityReviewDocumentsInput>,
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
