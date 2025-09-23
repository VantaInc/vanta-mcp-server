import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { baseApiUrl } from "../api.js";
import { Tool } from "../types.js";
import { z } from "zod";
import { makeAuthenticatedRequest } from "./utils.js";
import {
  PAGE_SIZE_DESCRIPTION,
  PAGE_CURSOR_DESCRIPTION,
  SLUG_ID_DESCRIPTION,
} from "./global-descriptions.js";

const GetTrustCenterInput = z.object({
  slugId: z.string().describe(SLUG_ID_DESCRIPTION),
});

export const GetTrustCenterTool: Tool<typeof GetTrustCenterInput> = {
  name: "get_trust_center",
  description:
    "Get Trust Center information. Retrieve detailed information about a specific Trust Center including configuration, branding, and public visibility settings. Use this to access Trust Center details for compliance transparency and customer communication.",
  parameters: GetTrustCenterInput,
};

const GetTrustCenterAccessRequestsInput = z.object({
  slugId: z.string().describe(SLUG_ID_DESCRIPTION),
  pageSize: z.number().describe(PAGE_SIZE_DESCRIPTION).optional(),
  pageCursor: z.string().describe(PAGE_CURSOR_DESCRIPTION).optional(),
});

export const GetTrustCenterAccessRequestsTool: Tool<typeof GetTrustCenterAccessRequestsInput> = {
  name: "get_trust_center_access_requests",
  description:
    "List Trust Center access requests. Get all pending and processed access requests for a specific Trust Center. Use this to manage and review who is requesting access to your Trust Center content and compliance information.",
  parameters: GetTrustCenterAccessRequestsInput,
};

const GetTrustCenterAccessRequestInput = z.object({
  slugId: z.string().describe(SLUG_ID_DESCRIPTION),
  accessRequestId: z
    .string()
    .describe(
      "Access request ID to retrieve, e.g. 'request-123' or specific access request identifier",
    ),
});

export const GetTrustCenterAccessRequestTool: Tool<typeof GetTrustCenterAccessRequestInput> = {
  name: "get_trust_center_access_request",
  description:
    "Get Trust Center access request by ID. Retrieve detailed information about a specific access request including requester details, status, and request metadata. Use this to review individual access requests for approval or denial decisions.",
  parameters: GetTrustCenterAccessRequestInput,
};

const GetTrustCenterViewerActivityEventsInput = z.object({
  slugId: z.string().describe(SLUG_ID_DESCRIPTION),
  pageSize: z.number().describe(PAGE_SIZE_DESCRIPTION).optional(),
  pageCursor: z.string().describe(PAGE_CURSOR_DESCRIPTION).optional(),
});

export const GetTrustCenterViewerActivityEventsTool: Tool<typeof GetTrustCenterViewerActivityEventsInput> = {
  name: "get_trust_center_viewer_activity_events",
  description:
    "List Trust Center viewer activity events. Get all viewer activity and engagement events for a specific Trust Center including page views, document downloads, and user interactions. Use this to track Trust Center usage and engagement analytics.",
  parameters: GetTrustCenterViewerActivityEventsInput,
};

const GetTrustCenterControlCategoriesInput = z.object({
  slugId: z.string().describe(SLUG_ID_DESCRIPTION),
  pageSize: z.number().describe(PAGE_SIZE_DESCRIPTION).optional(),
  pageCursor: z.string().describe(PAGE_CURSOR_DESCRIPTION).optional(),
});

export const GetTrustCenterControlCategoriesTool: Tool<typeof GetTrustCenterControlCategoriesInput> = {
  name: "get_trust_center_control_categories",
  description:
    "List Trust Center control categories. Get all control categories configured for a specific Trust Center including category names, descriptions, and organization. Use this to understand how compliance controls are categorized and presented to Trust Center visitors.",
  parameters: GetTrustCenterControlCategoriesInput,
};

const GetTrustCenterControlCategoryInput = z.object({
  slugId: z.string().describe(SLUG_ID_DESCRIPTION),
  controlCategoryId: z
    .string()
    .describe(
      "Control category ID to retrieve, e.g. 'category-123' or specific control category identifier",
    ),
});

export const GetTrustCenterControlCategoryTool: Tool<typeof GetTrustCenterControlCategoryInput> = {
  name: "get_trust_center_control_category",
  description:
    "Get Trust Center control category by ID. Retrieve detailed information about a specific control category including its configuration, associated controls, and display settings. Use this to access specific control category details for Trust Center management.",
  parameters: GetTrustCenterControlCategoryInput,
};

const GetTrustCenterControlsInput = z.object({
  slugId: z.string().describe(SLUG_ID_DESCRIPTION),
  pageSize: z.number().describe(PAGE_SIZE_DESCRIPTION).optional(),
  pageCursor: z.string().describe(PAGE_CURSOR_DESCRIPTION).optional(),
});

export const GetTrustCenterControlsTool: Tool<typeof GetTrustCenterControlsInput> = {
  name: "get_trust_center_controls",
  description:
    "List Trust Center controls. Get all compliance controls published in a specific Trust Center including control descriptions, implementation status, and evidence. Use this to see which controls are publicly visible to Trust Center visitors.",
  parameters: GetTrustCenterControlsInput,
};

const GetTrustCenterControlInput = z.object({
  slugId: z.string().describe(SLUG_ID_DESCRIPTION),
  trustCenterControlId: z
    .string()
    .describe(
      "Trust Center control ID to retrieve, e.g. 'tc-control-123' or specific Trust Center control identifier",
    ),
});

export const GetTrustCenterControlTool: Tool<typeof GetTrustCenterControlInput> = {
  name: "get_trust_center_control",
  description:
    "Get Trust Center control by ID. Retrieve detailed information about a specific control published in the Trust Center including implementation details, evidence, and compliance status. Use this to access individual control information for Trust Center transparency.",
  parameters: GetTrustCenterControlInput,
};

const GetTrustCenterFaqsInput = z.object({
  slugId: z.string().describe(SLUG_ID_DESCRIPTION),
  pageSize: z.number().describe(PAGE_SIZE_DESCRIPTION).optional(),
  pageCursor: z.string().describe(PAGE_CURSOR_DESCRIPTION).optional(),
});

export const GetTrustCenterFaqsTool: Tool<typeof GetTrustCenterFaqsInput> = {
  name: "get_trust_center_faqs",
  description:
    "List Trust Center FAQs. Get all frequently asked questions configured for a specific Trust Center including questions, answers, and organization. Use this to see what information is provided to Trust Center visitors through the FAQ section.",
  parameters: GetTrustCenterFaqsInput,
};

const GetTrustCenterFaqInput = z.object({
  slugId: z.string().describe(SLUG_ID_DESCRIPTION),
  faqId: z
    .string()
    .describe(
      "FAQ ID to retrieve, e.g. 'faq-123' or specific FAQ identifier",
    ),
});

export const GetTrustCenterFaqTool: Tool<typeof GetTrustCenterFaqInput> = {
  name: "get_trust_center_faq",
  description:
    "Get Trust Center FAQ by ID. Retrieve detailed information about a specific FAQ including the question, answer, and display settings. Use this to access individual FAQ content for Trust Center management and customer communication.",
  parameters: GetTrustCenterFaqInput,
};

const GetTrustCenterResourcesInput = z.object({
  slugId: z.string().describe(SLUG_ID_DESCRIPTION),
  pageSize: z.number().describe(PAGE_SIZE_DESCRIPTION).optional(),
  pageCursor: z.string().describe(PAGE_CURSOR_DESCRIPTION).optional(),
});

export const GetTrustCenterResourcesTool: Tool<typeof GetTrustCenterResourcesInput> = {
  name: "get_trust_center_resources",
  description:
    "List Trust Center resources. Get all resources and documents available in a specific Trust Center including compliance documents, certifications, and downloadable materials. Use this to see what resources are publicly available to Trust Center visitors.",
  parameters: GetTrustCenterResourcesInput,
};

const GetTrustCenterDocumentInput = z.object({
  slugId: z.string().describe(SLUG_ID_DESCRIPTION),
  trustCenterDocumentId: z
    .string()
    .describe(
      "Trust Center document ID to retrieve, e.g. 'tc-doc-123' or specific Trust Center document identifier",
    ),
});

export const GetTrustCenterDocumentTool: Tool<typeof GetTrustCenterDocumentInput> = {
  name: "get_trust_center_document",
  description:
    "Get Trust Center document by ID. Retrieve detailed information about a specific document published in the Trust Center including metadata, content, and access settings. Use this to access individual document details for Trust Center content management.",
  parameters: GetTrustCenterDocumentInput,
};

// Implementation functions
export async function getTrustCenter(
  args: z.infer<typeof GetTrustCenterInput>,
): Promise<CallToolResult> {
  const url = new URL(`/v1/trust-centers/${args.slugId}`, baseApiUrl());

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

export async function getTrustCenterAccessRequests(
  args: z.infer<typeof GetTrustCenterAccessRequestsInput>,
): Promise<CallToolResult> {
  const url = new URL(`/v1/trust-centers/${args.slugId}/access-requests`, baseApiUrl());

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

export async function getTrustCenterAccessRequest(
  args: z.infer<typeof GetTrustCenterAccessRequestInput>,
): Promise<CallToolResult> {
  const url = new URL(`/v1/trust-centers/${args.slugId}/access-requests/${args.accessRequestId}`, baseApiUrl());

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

export async function getTrustCenterViewerActivityEvents(
  args: z.infer<typeof GetTrustCenterViewerActivityEventsInput>,
): Promise<CallToolResult> {
  const url = new URL(`/v1/trust-centers/${args.slugId}/viewer-activity-events`, baseApiUrl());

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

export async function getTrustCenterControlCategories(
  args: z.infer<typeof GetTrustCenterControlCategoriesInput>,
): Promise<CallToolResult> {
  const url = new URL(`/v1/trust-centers/${args.slugId}/control-categories`, baseApiUrl());

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

export async function getTrustCenterControlCategory(
  args: z.infer<typeof GetTrustCenterControlCategoryInput>,
): Promise<CallToolResult> {
  const url = new URL(`/v1/trust-centers/${args.slugId}/control-categories/${args.controlCategoryId}`, baseApiUrl());

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

export async function getTrustCenterControls(
  args: z.infer<typeof GetTrustCenterControlsInput>,
): Promise<CallToolResult> {
  const url = new URL(`/v1/trust-centers/${args.slugId}/controls`, baseApiUrl());

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

export async function getTrustCenterControl(
  args: z.infer<typeof GetTrustCenterControlInput>,
): Promise<CallToolResult> {
  const url = new URL(`/v1/trust-centers/${args.slugId}/controls/${args.trustCenterControlId}`, baseApiUrl());

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

export async function getTrustCenterFaqs(
  args: z.infer<typeof GetTrustCenterFaqsInput>,
): Promise<CallToolResult> {
  const url = new URL(`/v1/trust-centers/${args.slugId}/faqs`, baseApiUrl());

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

export async function getTrustCenterFaq(
  args: z.infer<typeof GetTrustCenterFaqInput>,
): Promise<CallToolResult> {
  const url = new URL(`/v1/trust-centers/${args.slugId}/faqs/${args.faqId}`, baseApiUrl());

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

export async function getTrustCenterResources(
  args: z.infer<typeof GetTrustCenterResourcesInput>,
): Promise<CallToolResult> {
  const url = new URL(`/v1/trust-centers/${args.slugId}/resources`, baseApiUrl());

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

export async function getTrustCenterDocument(
  args: z.infer<typeof GetTrustCenterDocumentInput>,
): Promise<CallToolResult> {
  const url = new URL(`/v1/trust-centers/${args.slugId}/documents/${args.trustCenterDocumentId}`, baseApiUrl());

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
