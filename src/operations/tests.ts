import { baseApiUrl } from "../api.js";
import { z } from "zod";
import { env } from "node:process";
import { Tool } from "../types.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";

export async function getTests(
  args: z.infer<typeof GetTestsInput>,
): Promise<CallToolResult> {
  const url = new URL("/v1/tests", baseApiUrl());

  if (args.pageSize !== undefined) {
    url.searchParams.append("pageSize", args.pageSize.toString());
  }
  if (args.statusFilter !== undefined) {
    url.searchParams.append("statusFilter", args.statusFilter);
  }
  if (args.integrationFilter !== undefined) {
    url.searchParams.append("integrationFilter", args.integrationFilter);
  }
  if (args.frameworkFilter !== undefined) {
    url.searchParams.append("frameworkFilter", args.frameworkFilter);
  }

  let headers: Record<string, string> = {};

  if (env.VANTA_API_KEY != null) {
    headers.Authorization = `Bearer ${env.VANTA_API_KEY}`;
  }
  const response = await fetch(url.toString(), {
    headers,
  });

  if (!response.ok) {
    return {
      content: [
        {
          type: "text" as const,
          text: `Url: ${url.toString()}, Error: ${response.statusText}`,
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

export async function getTestEntities(
  args: z.infer<typeof GetTestEntitiesInput>,
): Promise<CallToolResult> {
  const url = new URL(`/v1/tests/${args.testId}/entities`, baseApiUrl());
  if (args.pageSize !== undefined) {
    url.searchParams.append("pageSize", args.pageSize.toString());
  }
  if (args.pageCursor !== undefined) {
    url.searchParams.append("pageCursor", args.pageCursor);
  }
  if (args.entityStatus !== undefined) {
    url.searchParams.append("entityStatus", args.entityStatus);
  }

  let headers: Record<string, string> = {};

  if (env.VANTA_API_KEY != null) {
    headers.Authorization = `Bearer ${env.VANTA_API_KEY}`;
  }

  const response = await fetch(url.toString(), {
    headers,
  });

  if (!response.ok) {
    return {
      content: [
        {
          type: "text" as const,
          text: `Url: ${url.toString()}, Error: ${response.statusText}`,
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

export async function deactivateTestEntity(
  args: z.infer<typeof DeactivateTestEntityInput>,
): Promise<CallToolResult> {
  const url = new URL(
    `/v1/tests/${args.testId}/entities/${args.entityId}/deactivate`,
    baseApiUrl(),
  );
  let headers: Record<string, string> = {};

  if (env.VANTA_API_KEY != null) {
    headers.Authorization = `Bearer ${env.VANTA_API_KEY}`;
  }

  const response = await fetch(url.toString(), {
    method: "POST",
    headers,
    body: JSON.stringify({
      deactivateUntil: args.deactivateUntil,
      reason: args.deactivateReason,
    }),
  });

  if (!response.ok) {
    return {
      content: [
        {
          type: "text" as const,
          text: `Url: ${url.toString()}, Error: ${response.statusText}`,
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

const TOOL_DESCRIPTION = `Lists all tests. When using Vanta, resources are pulled in from all connected integrations.
The automated checks running on these resources are called tests.

Note: There are over 1,200 tests in Vanta. Tests that are NOT_APPLICABLE to the user's resources are included by default.
To retrieve only actionable tests, consider using the statusFilter (e.g., NEEDS_ATTENTION).`;

const TEST_STATUS_FILTER_DESCRIPTION = `Filter tests by their status.
Helpful for retrieving only relevant or actionable results.
Possible values: OK, DEACTIVATED, NEEDS_ATTENTION, IN_PROGRESS, INVALID, NOT_APPLICABLE.`;

const PAGE_SIZE_DESCRIPTION = `Controls the maximum number of tests returned in a single response.
Allowed values: 1–100. Default is 10.`;

const INTEGRATION_FILTER_DESCRIPTION = `Filter by integration. Non-exhaustive examples of possible values include aws, azure, gcp, snyk.`;

const FRAMEWORK_FILTER_DESCRIPTION = `Filter by framework. Non-exhaustive examples: soc2, ccpa, fedramp`;

const CONTROL_FILTER_DESCRIPTION = `Filter by control. Generally will only be known if pulled from the /v1/controls endpoint.`;

export const GetTestsInput = z.object({
  pageSize: z.number().describe(PAGE_SIZE_DESCRIPTION).optional(),
  statusFilter: z.string().describe(TEST_STATUS_FILTER_DESCRIPTION).optional(),
  integrationFilter: z
    .string()
    .describe(INTEGRATION_FILTER_DESCRIPTION)
    .optional(),
  frameworkFilter: z.string().describe(FRAMEWORK_FILTER_DESCRIPTION).optional(),
  controlFilter: z.string().describe(CONTROL_FILTER_DESCRIPTION).optional(),
});

export const GetTestsTool: Tool<typeof GetTestsInput> = {
  name: "get_tests",
  description: TOOL_DESCRIPTION,
  parameters: GetTestsInput,
};

const GetTestEntitiesInput = z.object({
  testId: z.string().describe("Lowercase with hyphens"),
  pageSize: z
    .number()
    .describe(
      "Controls the maximum number of tests returned in a single response. Allowed values: 1–100. Default is 10.",
    )
    .optional(),
  pageCursor: z
    .string()
    .describe("Used for pagination. Leave blank to start from the first page.")
    .optional(),
  entityStatus: z
    .string()
    .describe("Filter by entity status. Possible values: FAILING, DEACTIVATED.")
    .optional(),
});

export const GetTestEntitiesTool: Tool<typeof GetTestEntitiesInput> = {
  name: "get_test_entities",
  description: `Lists all entities for a test. An entity is a resource that is being tested. Entities are only created for failing tests.`,
  parameters: GetTestEntitiesInput,
};

export const DeactivateTestEntityInput = z.object({
  testId: z.string().describe("Lowercase with hyphens"),
  entityId: z.string(),
  deactivateReason: z.string().describe("Reason for deactivation."),
  deactivateUntil: z
    .string()
    .describe(
      "Date and time to deactivate the entity until. Format: YYYY-MM-DDTHH:MM:SSZ",
    ),
});

export const DeactivateTestEntityTool: Tool<typeof DeactivateTestEntityInput> =
  {
    name: "deactivate_test_entity",
    description: `Deactivates an entity for a test.`,
    parameters: DeactivateTestEntityInput,
  };
