// 1. Imports
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { Tool } from "../types.js";
import { z } from "zod";
import {
  createIdSchema,
  createIdWithPaginationSchema,
  makeGetByIdRequest,
  buildUrl,
  makeAuthenticatedRequest,
  handleApiResponse,
} from "./utils.js";
import { SLUG_ID_DESCRIPTION } from "./global-descriptions.js";

// 2. Input Schemas
const GetTrustCenterInput = createIdSchema({
  paramName: "slugId",
  description: SLUG_ID_DESCRIPTION,
});

const ListTrustCenterAccessRequestsInput = createIdWithPaginationSchema({
  paramName: "slugId",
  description: SLUG_ID_DESCRIPTION,
});

const GetTrustCenterAccessRequestInput = z.object({
  slugId: z.string().describe(SLUG_ID_DESCRIPTION),
  accessRequestId: z
    .string()
    .describe(
      "Access request ID to retrieve, e.g. 'request-123' or specific access request identifier",
    ),
});

const ListTrustCenterViewerActivityEventsInput = createIdWithPaginationSchema({
  paramName: "slugId",
  description: SLUG_ID_DESCRIPTION,
});

const ListTrustCenterControlCategoriesInput = createIdWithPaginationSchema({
  paramName: "slugId",
  description: SLUG_ID_DESCRIPTION,
});

const GetTrustCenterControlCategoryInput = z.object({
  slugId: z.string().describe(SLUG_ID_DESCRIPTION),
  controlCategoryId: z
    .string()
    .describe(
      "Control category ID to retrieve, e.g. 'category-123' or specific control category identifier",
    ),
});

const ListTrustCenterControlsInput = createIdWithPaginationSchema({
  paramName: "slugId",
  description: SLUG_ID_DESCRIPTION,
});

const GetTrustCenterControlInput = z.object({
  slugId: z.string().describe(SLUG_ID_DESCRIPTION),
  trustCenterControlId: z
    .string()
    .describe(
      "Trust Center control ID to retrieve, e.g. 'tc-control-123' or specific Trust Center control identifier",
    ),
});

const ListTrustCenterFaqsInput = createIdWithPaginationSchema({
  paramName: "slugId",
  description: SLUG_ID_DESCRIPTION,
});

const GetTrustCenterFaqInput = z.object({
  slugId: z.string().describe(SLUG_ID_DESCRIPTION),
  faqId: z
    .string()
    .describe("FAQ ID to retrieve, e.g. 'faq-123' or specific FAQ identifier"),
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

const ListTrustCenterSubprocessorsInput = createIdWithPaginationSchema({
  paramName: "slugId",
  description: SLUG_ID_DESCRIPTION,
});

const GetTrustCenterSubprocessorInput = z.object({
  slugId: z.string().describe(SLUG_ID_DESCRIPTION),
  subprocessorId: z
    .string()
    .describe(
      "Subprocessor ID to retrieve, e.g. 'subprocessor-123' or specific subprocessor identifier",
    ),
});

const ListTrustCenterUpdatesInput = createIdWithPaginationSchema({
  paramName: "slugId",
  description: SLUG_ID_DESCRIPTION,
});

const GetTrustCenterUpdateInput = z.object({
  slugId: z.string().describe(SLUG_ID_DESCRIPTION),
  updateId: z
    .string()
    .describe(
      "Update ID to retrieve, e.g. 'update-123' or specific update identifier",
    ),
});

const ListTrustCenterViewersInput = createIdWithPaginationSchema({
  paramName: "slugId",
  description: SLUG_ID_DESCRIPTION,
});

const GetTrustCenterViewerInput = z.object({
  slugId: z.string().describe(SLUG_ID_DESCRIPTION),
  viewerId: z
    .string()
    .describe(
      "Viewer ID to retrieve, e.g. 'viewer-123' or specific viewer identifier",
    ),
});

const GetTrustCenterSubscriberInput = z.object({
  slugId: z.string().describe(SLUG_ID_DESCRIPTION),
  subscriberId: z
    .string()
    .describe(
      "Subscriber ID to retrieve, e.g. 'subscriber-123' or specific subscriber identifier",
    ),
});

const GetTrustCenterSubscriberGroupInput = z.object({
  slugId: z.string().describe(SLUG_ID_DESCRIPTION),
  subscriberGroupId: z
    .string()
    .describe(
      "Subscriber group ID to retrieve, e.g. 'group-123' or specific subscriber group identifier",
    ),
});

const ListTrustCenterSubscriberGroupsInput = createIdWithPaginationSchema({
  paramName: "slugId",
  description: SLUG_ID_DESCRIPTION,
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

export const ListTrustCenterAccessRequestsTool: Tool<
  typeof ListTrustCenterAccessRequestsInput
> = {
  name: "list_trust_center_access_requests",
  description:
    "List Trust Center access requests. Get all pending and processed access requests for a specific Trust Center. Use this to manage and review who is requesting access to your Trust Center content and compliance information.",
  parameters: ListTrustCenterAccessRequestsInput,
};

export const GetTrustCenterAccessRequestTool: Tool<
  typeof GetTrustCenterAccessRequestInput
> = {
  name: "get_trust_center_access_request",
  description:
    "Get Trust Center access request by ID. Retrieve detailed information about a specific access request to a Trust Center. Use this to review individual access requests including requester details, status, and approval workflow.",
  parameters: GetTrustCenterAccessRequestInput,
};

export const ListTrustCenterViewerActivityEventsTool: Tool<
  typeof ListTrustCenterViewerActivityEventsInput
> = {
  name: "list_trust_center_viewer_activity_events",
  description:
    "List Trust Center viewer activity events. Get all viewing and interaction events for a specific Trust Center to understand usage patterns and engagement. Use this for analytics and compliance tracking.",
  parameters: ListTrustCenterViewerActivityEventsInput,
};

export const ListTrustCenterControlCategoriesTool: Tool<
  typeof ListTrustCenterControlCategoriesInput
> = {
  name: "list_trust_center_control_categories",
  description:
    "List Trust Center control categories. Get all available control categories displayed in a specific Trust Center. Use this to understand how compliance controls are organized and presented to your customers.",
  parameters: ListTrustCenterControlCategoriesInput,
};

export const GetTrustCenterControlCategoryTool: Tool<
  typeof GetTrustCenterControlCategoryInput
> = {
  name: "get_trust_center_control_category",
  description:
    "Get Trust Center control category by ID. Retrieve detailed information about a specific control category in a Trust Center. Use this to get category details, descriptions, and associated controls.",
  parameters: GetTrustCenterControlCategoryInput,
};

export const ListTrustCenterControlsTool: Tool<
  typeof ListTrustCenterControlsInput
> = {
  name: "list_trust_center_controls",
  description:
    "List Trust Center controls. Get all compliance controls visible in a specific Trust Center. Use this to see what security controls are publicly displayed to demonstrate your compliance posture.",
  parameters: ListTrustCenterControlsInput,
};

export const GetTrustCenterControlTool: Tool<
  typeof GetTrustCenterControlInput
> = {
  name: "get_trust_center_control",
  description:
    "Get Trust Center control by ID. Retrieve detailed information about a specific control displayed in a Trust Center. Use this to get control implementation details, evidence, and public-facing descriptions.",
  parameters: GetTrustCenterControlInput,
};

export const ListTrustCenterFaqsTool: Tool<typeof ListTrustCenterFaqsInput> = {
  name: "list_trust_center_faqs",
  description:
    "List Trust Center FAQs. Get all frequently asked questions published in a specific Trust Center. Use this to review customer-facing compliance and security information.",
  parameters: ListTrustCenterFaqsInput,
};

export const GetTrustCenterFaqTool: Tool<typeof GetTrustCenterFaqInput> = {
  name: "get_trust_center_faq",
  description:
    "Get Trust Center FAQ by ID. Retrieve detailed information about a specific FAQ item in a Trust Center. Use this to get the full question, answer, and any supporting documentation.",
  parameters: GetTrustCenterFaqInput,
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
    "Download Trust Center document media. Get the actual uploaded document/media file for a Trust Center resource. Use this to download compliance documents, certifications, and other materials for review or audit purposes.",
  parameters: GetTrustCenterResourceMediaInput,
};

export const ListTrustCenterSubprocessorsTool: Tool<
  typeof ListTrustCenterSubprocessorsInput
> = {
  name: "list_trust_center_subprocessors",
  description:
    "List Trust Center subprocessors. Get all subprocessors displayed in a specific Trust Center. Use this to see third-party service providers and their compliance information for transparency.",
  parameters: ListTrustCenterSubprocessorsInput,
};

export const GetTrustCenterSubprocessorTool: Tool<
  typeof GetTrustCenterSubprocessorInput
> = {
  name: "get_trust_center_subprocessor",
  description:
    "Get Trust Center subprocessor by ID. Retrieve detailed information about a specific subprocessor including compliance details, certifications, and data processing information.",
  parameters: GetTrustCenterSubprocessorInput,
};

export const ListTrustCenterUpdatesTool: Tool<
  typeof ListTrustCenterUpdatesInput
> = {
  name: "list_trust_center_updates",
  description:
    "List Trust Center updates. Get all updates and announcements published in a specific Trust Center. Use this to see compliance status changes, security updates, and important notifications.",
  parameters: ListTrustCenterUpdatesInput,
};

export const GetTrustCenterUpdateTool: Tool<typeof GetTrustCenterUpdateInput> =
  {
    name: "get_trust_center_update",
    description:
      "Get Trust Center update by ID. Retrieve detailed information about a specific update including content, publication date, and impact on compliance status.",
    parameters: GetTrustCenterUpdateInput,
  };

export const ListTrustCenterViewersTool: Tool<
  typeof ListTrustCenterViewersInput
> = {
  name: "list_trust_center_viewers",
  description:
    "List Trust Center viewers. Get all users who have access to view a specific Trust Center. Use this for access management and audit purposes.",
  parameters: ListTrustCenterViewersInput,
};

export const GetTrustCenterViewerTool: Tool<typeof GetTrustCenterViewerInput> =
  {
    name: "get_trust_center_viewer",
    description:
      "Get Trust Center viewer by ID. Retrieve detailed information about a specific viewer including access permissions, activity history, and contact information.",
    parameters: GetTrustCenterViewerInput,
  };

export const GetTrustCenterSubscriberTool: Tool<
  typeof GetTrustCenterSubscriberInput
> = {
  name: "get_trust_center_subscriber",
  description:
    "Get Trust Center subscriber by ID. Retrieve detailed information about a specific subscriber including subscription preferences and notification settings.",
  parameters: GetTrustCenterSubscriberInput,
};

export const GetTrustCenterSubscriberGroupTool: Tool<
  typeof GetTrustCenterSubscriberGroupInput
> = {
  name: "get_trust_center_subscriber_group",
  description:
    "Get Trust Center subscriber group by ID. Retrieve detailed information about a specific subscriber group including members and notification preferences.",
  parameters: GetTrustCenterSubscriberGroupInput,
};

export const ListTrustCenterSubscriberGroupsTool: Tool<
  typeof ListTrustCenterSubscriberGroupsInput
> = {
  name: "list_trust_center_subscriber_groups",
  description:
    "List Trust Center subscriber groups. Get all subscriber groups configured for a specific Trust Center. Use this to manage notification groups and communication preferences.",
  parameters: ListTrustCenterSubscriberGroupsInput,
};

export const ListTrustCenterHistoricalAccessRequestsTool: Tool<
  typeof ListTrustCenterHistoricalAccessRequestsInput
> = {
  name: "list_trust_center_historical_access_requests",
  description:
    "List Trust Center historical access requests. Get all past access requests for a specific Trust Center including approved, denied, and expired requests for audit and compliance tracking.",
  parameters: ListTrustCenterHistoricalAccessRequestsInput,
};

export const ListTrustCenterSubscribersTool: Tool<
  typeof ListTrustCenterSubscribersInput
> = {
  name: "list_trust_center_subscribers",
  description:
    "List Trust Center subscribers. Get all subscribers to a specific Trust Center for update notifications and communication management.",
  parameters: ListTrustCenterSubscribersInput,
};

// 4. Implementation Functions
export async function getTrustCenter(
  args: z.infer<typeof GetTrustCenterInput>,
): Promise<CallToolResult> {
  return makeGetByIdRequest("/v1/trust-centers", args.slugId);
}

export async function listTrustCenterAccessRequests(
  args: z.infer<typeof ListTrustCenterAccessRequestsInput>,
): Promise<CallToolResult> {
  const { slugId, ...params } = args;
  const url = buildUrl(
    `/v1/trust-centers/${String(slugId)}/access-requests`,
    params,
  );
  const response = await makeAuthenticatedRequest(url);
  return handleApiResponse(response);
}

export async function getTrustCenterAccessRequest(
  args: z.infer<typeof GetTrustCenterAccessRequestInput>,
): Promise<CallToolResult> {
  const url = buildUrl(
    `/v1/trust-centers/${String(args.slugId)}/access-requests/${String(args.accessRequestId)}`,
  );
  const response = await makeAuthenticatedRequest(url);
  return handleApiResponse(response);
}

export async function listTrustCenterViewerActivityEvents(
  args: z.infer<typeof ListTrustCenterViewerActivityEventsInput>,
): Promise<CallToolResult> {
  const { slugId, ...params } = args;
  const url = buildUrl(`/v1/trust-centers/${String(slugId)}/activity`, params);
  const response = await makeAuthenticatedRequest(url);
  return handleApiResponse(response);
}

export async function listTrustCenterControlCategories(
  args: z.infer<typeof ListTrustCenterControlCategoriesInput>,
): Promise<CallToolResult> {
  const { slugId, ...params } = args;
  const url = buildUrl(
    `/v1/trust-centers/${String(slugId)}/control-categories`,
    params,
  );
  const response = await makeAuthenticatedRequest(url);
  return handleApiResponse(response);
}

export async function getTrustCenterControlCategory(
  args: z.infer<typeof GetTrustCenterControlCategoryInput>,
): Promise<CallToolResult> {
  const url = buildUrl(
    `/v1/trust-centers/${String(args.slugId)}/control-categories/${String(args.controlCategoryId)}`,
  );
  const response = await makeAuthenticatedRequest(url);
  return handleApiResponse(response);
}

export async function listTrustCenterControls(
  args: z.infer<typeof ListTrustCenterControlsInput>,
): Promise<CallToolResult> {
  const { slugId, ...params } = args;
  const url = buildUrl(`/v1/trust-centers/${String(slugId)}/controls`, params);
  const response = await makeAuthenticatedRequest(url);
  return handleApiResponse(response);
}

export async function getTrustCenterControl(
  args: z.infer<typeof GetTrustCenterControlInput>,
): Promise<CallToolResult> {
  const url = buildUrl(
    `/v1/trust-centers/${String(args.slugId)}/controls/${String(args.trustCenterControlId)}`,
  );
  const response = await makeAuthenticatedRequest(url);
  return handleApiResponse(response);
}

export async function listTrustCenterFaqs(
  args: z.infer<typeof ListTrustCenterFaqsInput>,
): Promise<CallToolResult> {
  const { slugId, ...params } = args;
  const url = buildUrl(`/v1/trust-centers/${String(slugId)}/faqs`, params);
  const response = await makeAuthenticatedRequest(url);
  return handleApiResponse(response);
}

export async function getTrustCenterFaq(
  args: z.infer<typeof GetTrustCenterFaqInput>,
): Promise<CallToolResult> {
  const url = buildUrl(
    `/v1/trust-centers/${String(args.slugId)}/faqs/${String(args.faqId)}`,
  );
  const response = await makeAuthenticatedRequest(url);
  return handleApiResponse(response);
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
  return handleApiResponse(response);
}

export async function listTrustCenterSubprocessors(
  args: z.infer<typeof ListTrustCenterSubprocessorsInput>,
): Promise<CallToolResult> {
  const { slugId, ...params } = args;
  const url = buildUrl(
    `/v1/trust-centers/${String(slugId)}/subprocessors`,
    params,
  );
  const response = await makeAuthenticatedRequest(url);
  return handleApiResponse(response);
}

export async function getTrustCenterSubprocessor(
  args: z.infer<typeof GetTrustCenterSubprocessorInput>,
): Promise<CallToolResult> {
  const url = buildUrl(
    `/v1/trust-centers/${String(args.slugId)}/subprocessors/${String(args.subprocessorId)}`,
  );
  const response = await makeAuthenticatedRequest(url);
  return handleApiResponse(response);
}

export async function listTrustCenterUpdates(
  args: z.infer<typeof ListTrustCenterUpdatesInput>,
): Promise<CallToolResult> {
  const { slugId, ...params } = args;
  const url = buildUrl(`/v1/trust-centers/${String(slugId)}/updates`, params);
  const response = await makeAuthenticatedRequest(url);
  return handleApiResponse(response);
}

export async function getTrustCenterUpdate(
  args: z.infer<typeof GetTrustCenterUpdateInput>,
): Promise<CallToolResult> {
  const url = buildUrl(
    `/v1/trust-centers/${String(args.slugId)}/updates/${String(args.updateId)}`,
  );
  const response = await makeAuthenticatedRequest(url);
  return handleApiResponse(response);
}

export async function listTrustCenterViewers(
  args: z.infer<typeof ListTrustCenterViewersInput>,
): Promise<CallToolResult> {
  const { slugId, ...params } = args;
  const url = buildUrl(`/v1/trust-centers/${String(slugId)}/viewers`, params);
  const response = await makeAuthenticatedRequest(url);
  return handleApiResponse(response);
}

export async function getTrustCenterViewer(
  args: z.infer<typeof GetTrustCenterViewerInput>,
): Promise<CallToolResult> {
  const url = buildUrl(
    `/v1/trust-centers/${String(args.slugId)}/viewers/${String(args.viewerId)}`,
  );
  const response = await makeAuthenticatedRequest(url);
  return handleApiResponse(response);
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

export async function getTrustCenterSubscriberGroup(
  args: z.infer<typeof GetTrustCenterSubscriberGroupInput>,
): Promise<CallToolResult> {
  const url = buildUrl(
    `/v1/trust-centers/${String(args.slugId)}/subscriber-groups/${String(args.subscriberGroupId)}`,
  );
  const response = await makeAuthenticatedRequest(url);
  return handleApiResponse(response);
}

export async function listTrustCenterSubscriberGroups(
  args: z.infer<typeof ListTrustCenterSubscriberGroupsInput>,
): Promise<CallToolResult> {
  const { slugId, ...params } = args;
  const url = buildUrl(
    `/v1/trust-centers/${String(slugId)}/subscriber-groups`,
    params,
  );
  const response = await makeAuthenticatedRequest(url);
  return handleApiResponse(response);
}

export async function listTrustCenterHistoricalAccessRequests(
  args: z.infer<typeof ListTrustCenterHistoricalAccessRequestsInput>,
): Promise<CallToolResult> {
  const { slugId, ...params } = args;
  const url = buildUrl(
    `/v1/trust-centers/${String(slugId)}/access-requests/historical`,
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
