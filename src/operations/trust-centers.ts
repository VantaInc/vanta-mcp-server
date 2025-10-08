// 1. Imports
import {
  CallToolResult,
  Tool,
  z,
  createIdSchema,
  createIdWithPaginationSchema,
  createTrustCenterConsolidatedSchema,
  makeGetByIdRequest,
  makeTrustCenterConsolidatedRequest,
  buildUrl,
  makeAuthenticatedRequest,
  handleApiResponse,
  SLUG_ID_DESCRIPTION,
} from "./common/imports.js";

// 2. Input Schemas
const GetTrustCenterInput = createIdSchema({
  paramName: "slugId",
  description: SLUG_ID_DESCRIPTION,
});

const TrustCenterAccessRequestsInput = createTrustCenterConsolidatedSchema({
  paramName: "accessRequestId",
  description:
    "Access request ID to retrieve, e.g. 'request-123' or specific access request identifier",
  resourceName: "access request",
});

const ListTrustCenterViewerActivityEventsInput = createIdWithPaginationSchema({
  paramName: "slugId",
  description: SLUG_ID_DESCRIPTION,
});

const TrustCenterControlCategoriesInput = createTrustCenterConsolidatedSchema({
  paramName: "controlCategoryId",
  description:
    "Control category ID to retrieve, e.g. 'category-123' or specific control category identifier",
  resourceName: "control category",
});

const TrustCenterControlsInput = createTrustCenterConsolidatedSchema({
  paramName: "trustCenterControlId",
  description:
    "Trust Center control ID to retrieve, e.g. 'tc-control-123' or specific Trust Center control identifier",
  resourceName: "control",
});

const TrustCenterFaqsInput = createTrustCenterConsolidatedSchema({
  paramName: "faqId",
  description: "FAQ ID to retrieve, e.g. 'faq-123' or specific FAQ identifier",
  resourceName: "FAQ",
});

const ListTrustCenterResourcesInput = createIdWithPaginationSchema({
  paramName: "slugId",
  description: SLUG_ID_DESCRIPTION,
});

const GetTrustCenterDocumentInput = z.object({
  slugId: z.string().describe(SLUG_ID_DESCRIPTION),
  resourceId: z
    .string()
    .describe(
      "Trust Center document ID to retrieve, e.g. 'tc-doc-123' or specific Trust Center document identifier",
    ),
});

const GetTrustCenterResourceMediaInput = z.object({
  slugId: z.string().describe(SLUG_ID_DESCRIPTION),
  resourceId: z
    .string()
    .describe(
      "Trust Center document/resource ID to download media for, e.g. 'tc-doc-123' or specific Trust Center document identifier",
    ),
});

const TrustCenterSubprocessorsInput = createTrustCenterConsolidatedSchema({
  paramName: "subprocessorId",
  description:
    "Subprocessor ID to retrieve, e.g. 'subprocessor-123' or specific subprocessor identifier",
  resourceName: "subprocessor",
});

const TrustCenterUpdatesInput = createTrustCenterConsolidatedSchema({
  paramName: "updateId",
  description:
    "Update ID to retrieve, e.g. 'update-123' or specific update identifier",
  resourceName: "update",
});

const TrustCenterViewersInput = createTrustCenterConsolidatedSchema({
  paramName: "viewerId",
  description:
    "Viewer ID to retrieve, e.g. 'viewer-123' or specific viewer identifier",
  resourceName: "viewer",
});

const GetTrustCenterSubscriberInput = z.object({
  slugId: z.string().describe(SLUG_ID_DESCRIPTION),
  subscriberId: z
    .string()
    .describe(
      "Subscriber ID to retrieve, e.g. 'subscriber-123' or specific subscriber identifier",
    ),
});

const TrustCenterSubscriberGroupsInput = createTrustCenterConsolidatedSchema({
  paramName: "subscriberGroupId",
  description:
    "Subscriber group ID to retrieve, e.g. 'group-123' or specific subscriber group identifier",
  resourceName: "subscriber group",
});

const ListTrustCenterHistoricalAccessRequestsInput =
  createIdWithPaginationSchema({
    paramName: "slugId",
    description: SLUG_ID_DESCRIPTION,
  });

const ListTrustCenterSubscribersInput = createIdWithPaginationSchema({
  paramName: "slugId",
  description: SLUG_ID_DESCRIPTION,
});

// 3. Tool Definitions
export const GetTrustCenterTool: Tool<typeof GetTrustCenterInput> = {
  name: "get_trust_center",
  description:
    "Get Trust Center information. Retrieve detailed information about a specific Trust Center including configuration, branding, and public visibility settings. Use this to access Trust Center details for compliance transparency and customer communication.",
  parameters: GetTrustCenterInput,
};

export const TrustCenterAccessRequestsTool: Tool<
  typeof TrustCenterAccessRequestsInput
> = {
  name: "trust_center_access_requests",
  description:
    "Access Trust Center access requests. Provide accessRequestId to get a specific access request, or omit to list all access requests. Use this to manage and review Trust Center access requests including requester details, status, and approval workflow.",
  parameters: TrustCenterAccessRequestsInput,
};

export const ListTrustCenterViewerActivityEventsTool: Tool<
  typeof ListTrustCenterViewerActivityEventsInput
> = {
  name: "list_trust_center_viewer_activity_events",
  description:
    "List Trust Center viewer activity events. Get all viewing and interaction events for a specific Trust Center to understand usage patterns and engagement. Use this for analytics and compliance tracking.",
  parameters: ListTrustCenterViewerActivityEventsInput,
};

export const TrustCenterControlCategoriesTool: Tool<
  typeof TrustCenterControlCategoriesInput
> = {
  name: "trust_center_control_categories",
  description:
    "Access Trust Center control categories. Provide controlCategoryId to get a specific control category, or omit to list all categories. Use this to understand how compliance controls are organized and categorized for public display.",
  parameters: TrustCenterControlCategoriesInput,
};

export const TrustCenterControlsTool: Tool<typeof TrustCenterControlsInput> = {
  name: "trust_center_controls",
  description:
    "Access Trust Center controls. Provide trustCenterControlId to get a specific control, or omit to list all controls. Use this to see compliance controls displayed publicly to demonstrate your compliance posture.",
  parameters: TrustCenterControlsInput,
};

export const TrustCenterFaqsTool: Tool<typeof TrustCenterFaqsInput> = {
  name: "trust_center_faqs",
  description:
    "Access Trust Center FAQs. Provide faqId to get a specific FAQ, or omit to list all FAQs. Use this to see frequently asked questions and answers published for customers regarding compliance and security practices.",
  parameters: TrustCenterFaqsInput,
};

export const ListTrustCenterResourcesTool: Tool<
  typeof ListTrustCenterResourcesInput
> = {
  name: "list_trust_center_resources",
  description:
    "List Trust Center resources. Get all downloadable resources and documents available in a specific Trust Center. Use this to see what compliance materials are provided to customers and prospects.",
  parameters: ListTrustCenterResourcesInput,
};

export const GetTrustCenterDocumentTool: Tool<
  typeof GetTrustCenterDocumentInput
> = {
  name: "get_trust_center_document",
  description:
    "Get Trust Center document by ID. Retrieve detailed information about a specific document available in a Trust Center. Use this to access compliance certifications, policies, and other public-facing documentation.",
  parameters: GetTrustCenterDocumentInput,
};

export const GetTrustCenterResourceMediaTool: Tool<
  typeof GetTrustCenterResourceMediaInput
> = {
  name: "get_trust_center_resource_media",
  description:
    "Download Trust Center document media. Get the actual uploaded document/media file for a Trust Center resource. Intelligently handles different MIME types: returns text content for readable files (text/*, JSON, XML, CSV, JavaScript) and metadata information for binary files (images, videos, PDFs, etc.). Use this to download compliance documents, certifications, and other materials for review or audit purposes.",
  parameters: GetTrustCenterResourceMediaInput,
};

export const TrustCenterSubprocessorsTool: Tool<
  typeof TrustCenterSubprocessorsInput
> = {
  name: "trust_center_subprocessors",
  description:
    "Access Trust Center subprocessors. Provide subprocessorId to get a specific subprocessor, or omit to list all subprocessors. Use this to see third-party service providers and their compliance information for transparency.",
  parameters: TrustCenterSubprocessorsInput,
};

export const TrustCenterUpdatesTool: Tool<typeof TrustCenterUpdatesInput> = {
  name: "trust_center_updates",
  description:
    "Access Trust Center updates. Provide updateId to get a specific update, or omit to list all updates. Use this to see compliance status changes, security updates, and important notifications published in the Trust Center.",
  parameters: TrustCenterUpdatesInput,
};

export const TrustCenterViewersTool: Tool<typeof TrustCenterViewersInput> = {
  name: "trust_center_viewers",
  description:
    "Access Trust Center viewers. Provide viewerId to get a specific viewer, or omit to list all viewers. Use this for access management and audit purposes to see who can view the Trust Center.",
  parameters: TrustCenterViewersInput,
};

export const GetTrustCenterSubscriberTool: Tool<
  typeof GetTrustCenterSubscriberInput
> = {
  name: "get_trust_center_subscriber",
  description:
    "Get Trust Center subscriber by ID. Retrieve detailed information about a specific subscriber including subscription preferences and notification settings.",
  parameters: GetTrustCenterSubscriberInput,
};

export const TrustCenterSubscriberGroupsTool: Tool<
  typeof TrustCenterSubscriberGroupsInput
> = {
  name: "trust_center_subscriber_groups",
  description:
    "Access Trust Center subscriber groups. Provide subscriberGroupId to get a specific subscriber group, or omit to list all subscriber groups. Use this for managing access permissions and organizing subscribers.",
  parameters: TrustCenterSubscriberGroupsInput,
};

export const ListTrustCenterHistoricalAccessRequestsTool: Tool<
  typeof ListTrustCenterHistoricalAccessRequestsInput
> = {
  name: "list_trust_center_historical_access_requests",
  description:
    "List Trust Center historical access requests. Get all historical access requests for a specific Trust Center for auditing and compliance tracking. Use this to review past access patterns and requests.",
  parameters: ListTrustCenterHistoricalAccessRequestsInput,
};

export const ListTrustCenterSubscribersTool: Tool<
  typeof ListTrustCenterSubscribersInput
> = {
  name: "list_trust_center_subscribers",
  description:
    "List Trust Center subscribers. Get all subscribers for a specific Trust Center. Use this to manage notifications and communication with stakeholders.",
  parameters: ListTrustCenterSubscribersInput,
};

// 4. Implementation Functions
export async function getTrustCenter(
  args: z.infer<typeof GetTrustCenterInput>,
): Promise<CallToolResult> {
  return makeGetByIdRequest("/v1/trust-centers", String(args.slugId));
}

export async function trustCenterAccessRequests(
  args: z.infer<typeof TrustCenterAccessRequestsInput>,
): Promise<CallToolResult> {
  return makeTrustCenterConsolidatedRequest(
    "/v1/trust-centers",
    args,
    "accessRequestId",
    "access-requests",
  );
}

export async function listTrustCenterViewerActivityEvents(
  args: z.infer<typeof ListTrustCenterViewerActivityEventsInput>,
): Promise<CallToolResult> {
  const { slugId, ...params } = args;
  const url = buildUrl(`/v1/trust-centers/${String(slugId)}/activity`, params);
  const response = await makeAuthenticatedRequest(url);
  return handleApiResponse(response);
}

export async function trustCenterControlCategories(
  args: z.infer<typeof TrustCenterControlCategoriesInput>,
): Promise<CallToolResult> {
  return makeTrustCenterConsolidatedRequest(
    "/v1/trust-centers",
    args,
    "controlCategoryId",
    "control-categories",
  );
}

export async function trustCenterControls(
  args: z.infer<typeof TrustCenterControlsInput>,
): Promise<CallToolResult> {
  return makeTrustCenterConsolidatedRequest(
    "/v1/trust-centers",
    args,
    "trustCenterControlId",
    "controls",
  );
}

export async function trustCenterFaqs(
  args: z.infer<typeof TrustCenterFaqsInput>,
): Promise<CallToolResult> {
  return makeTrustCenterConsolidatedRequest(
    "/v1/trust-centers",
    args,
    "faqId",
    "faqs",
  );
}

export async function listTrustCenterResources(
  args: z.infer<typeof ListTrustCenterResourcesInput>,
): Promise<CallToolResult> {
  const { slugId, ...params } = args;
  const url = buildUrl(`/v1/trust-centers/${String(slugId)}/resources`, params);
  const response = await makeAuthenticatedRequest(url);
  return handleApiResponse(response);
}

export async function getTrustCenterDocument(
  args: z.infer<typeof GetTrustCenterDocumentInput>,
): Promise<CallToolResult> {
  const url = buildUrl(
    `/v1/trust-centers/${String(args.slugId)}/resources/${String(args.resourceId)}`,
  );
  const response = await makeAuthenticatedRequest(url);
  return handleApiResponse(response);
}

export async function getTrustCenterResourceMedia(
  args: z.infer<typeof GetTrustCenterResourceMediaInput>,
): Promise<CallToolResult> {
  const url = buildUrl(
    `/v1/trust-centers/${String(args.slugId)}/resources/${String(args.resourceId)}/media`,
  );
  const response = await makeAuthenticatedRequest(url);

  if (!response.ok) {
    return handleApiResponse(response);
  }

  // Get the content type from the response headers
  const contentType =
    response.headers.get("content-type") ?? "application/octet-stream";
  const contentLength = response.headers.get("content-length");

  // Handle text-based MIME types - return content that LLMs can process
  if (
    contentType.startsWith("text/") ||
    contentType.includes("application/json") ||
    contentType.includes("application/xml") ||
    contentType.includes("application/javascript") ||
    contentType.includes("application/csv") ||
    contentType.includes("text/csv")
  ) {
    try {
      const textContent = await response.text();
      return {
        content: [
          {
            type: "text" as const,
            text: `Trust Center Resource Media Content (${contentType}):\n\n${textContent}`,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text" as const,
            text: `Error reading text content: ${error instanceof Error ? error.message : "Unknown error"}`,
          },
        ],
        isError: true,
      };
    }
  }

  // For binary files, return metadata about the file
  return {
    content: [
      {
        type: "text" as const,
        text: `Trust Center Resource Media File Information:
- Content Type: ${contentType}
- Content Length: ${contentLength ? `${contentLength} bytes` : "Unknown"}
- File Type: ${contentType.startsWith("image/") ? "Image" : contentType.startsWith("video/") ? "Video" : contentType.startsWith("audio/") ? "Audio" : contentType.startsWith("application/pdf") ? "PDF Document" : "Binary File"}
- Resource ID: ${String(args.resourceId)}
- Trust Center: ${String(args.slugId)}

Note: This is a binary file. Use appropriate tools to download and process the actual file content.`,
      },
    ],
  };
}

export async function trustCenterSubprocessors(
  args: z.infer<typeof TrustCenterSubprocessorsInput>,
): Promise<CallToolResult> {
  return makeTrustCenterConsolidatedRequest(
    "/v1/trust-centers",
    args,
    "subprocessorId",
    "subprocessors",
  );
}

export async function trustCenterUpdates(
  args: z.infer<typeof TrustCenterUpdatesInput>,
): Promise<CallToolResult> {
  return makeTrustCenterConsolidatedRequest(
    "/v1/trust-centers",
    args,
    "updateId",
    "updates",
  );
}

export async function trustCenterViewers(
  args: z.infer<typeof TrustCenterViewersInput>,
): Promise<CallToolResult> {
  return makeTrustCenterConsolidatedRequest(
    "/v1/trust-centers",
    args,
    "viewerId",
    "viewers",
  );
}

export async function getTrustCenterSubscriber(
  args: z.infer<typeof GetTrustCenterSubscriberInput>,
): Promise<CallToolResult> {
  const url = buildUrl(
    `/v1/trust-centers/${String(args.slugId)}/subscribers/${String(args.subscriberId)}`,
  );
  const response = await makeAuthenticatedRequest(url);
  return handleApiResponse(response);
}

export async function trustCenterSubscriberGroups(
  args: z.infer<typeof TrustCenterSubscriberGroupsInput>,
): Promise<CallToolResult> {
  return makeTrustCenterConsolidatedRequest(
    "/v1/trust-centers",
    args,
    "subscriberGroupId",
    "subscriber-groups",
  );
}

export async function listTrustCenterHistoricalAccessRequests(
  args: z.infer<typeof ListTrustCenterHistoricalAccessRequestsInput>,
): Promise<CallToolResult> {
  const { slugId, ...params } = args;
  const url = buildUrl(
    `/v1/trust-centers/${String(slugId)}/historical-access-requests`,
    params,
  );
  const response = await makeAuthenticatedRequest(url);
  return handleApiResponse(response);
}

export async function listTrustCenterSubscribers(
  args: z.infer<typeof ListTrustCenterSubscribersInput>,
): Promise<CallToolResult> {
  const { slugId, ...params } = args;
  const url = buildUrl(
    `/v1/trust-centers/${String(slugId)}/subscribers`,
    params,
  );
  const response = await makeAuthenticatedRequest(url);
  return handleApiResponse(response);
}

// Registry export for automated tool registration
export default {
  tools: [
    { tool: GetTrustCenterTool, handler: getTrustCenter },
    { tool: TrustCenterAccessRequestsTool, handler: trustCenterAccessRequests },
    {
      tool: ListTrustCenterViewerActivityEventsTool,
      handler: listTrustCenterViewerActivityEvents,
    },
    {
      tool: TrustCenterControlCategoriesTool,
      handler: trustCenterControlCategories,
    },
    { tool: TrustCenterControlsTool, handler: trustCenterControls },
    { tool: TrustCenterFaqsTool, handler: trustCenterFaqs },
    { tool: ListTrustCenterResourcesTool, handler: listTrustCenterResources },
    { tool: GetTrustCenterDocumentTool, handler: getTrustCenterDocument },
    {
      tool: GetTrustCenterResourceMediaTool,
      handler: getTrustCenterResourceMedia,
    },
    { tool: TrustCenterSubprocessorsTool, handler: trustCenterSubprocessors },
    { tool: TrustCenterUpdatesTool, handler: trustCenterUpdates },
    { tool: TrustCenterViewersTool, handler: trustCenterViewers },
    { tool: GetTrustCenterSubscriberTool, handler: getTrustCenterSubscriber },
    {
      tool: TrustCenterSubscriberGroupsTool,
      handler: trustCenterSubscriberGroups,
    },
    {
      tool: ListTrustCenterHistoricalAccessRequestsTool,
      handler: listTrustCenterHistoricalAccessRequests,
    },
    {
      tool: ListTrustCenterSubscribersTool,
      handler: listTrustCenterSubscribers,
    },
  ],
};
