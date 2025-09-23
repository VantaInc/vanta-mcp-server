import { baseApiUrl } from "../api.js";
import { z } from "zod";
import { Tool } from "../types.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { makeAuthenticatedRequest } from "./utils.js";
import {
  PAGE_SIZE_DESCRIPTION,
  PAGE_CURSOR_DESCRIPTION,
} from "./global-descriptions.js";

export async function getTests(
  args: z.infer<typeof GetTestsInput>,
): Promise<CallToolResult> {
  const url = new URL("/v1/tests", baseApiUrl());

  if (args.pageSize !== undefined) {
    url.searchParams.append("pageSize", args.pageSize.toString());
  }
  if (args.pageCursor !== undefined) {
    url.searchParams.append("pageCursor", args.pageCursor);
  }
  if (args.statusFilter !== undefined) {
    url.searchParams.append("statusFilter", args.statusFilter);
  }
  if (args.integrationFilter !== undefined) {
    url.searchParams.append("integrationFilter", args.integrationFilter);
  }
  if (args.controlFilter !== undefined) {
    url.searchParams.append("controlFilter", args.controlFilter);
  }
  if (args.frameworkFilter !== undefined) {
    url.searchParams.append("frameworkFilter", args.frameworkFilter);
  }

  const response = await makeAuthenticatedRequest(url.toString());

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

  const response = await makeAuthenticatedRequest(url.toString());

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

export async function getTestById(
  args: z.infer<typeof GetTestByIdInput>,
): Promise<CallToolResult> {
  const url = new URL(`/v1/tests/${args.testId}`, baseApiUrl());

  const response = await makeAuthenticatedRequest(url.toString());

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

const TOOL_DESCRIPTION = `Retrieve Vanta's automated security and compliance tests. Vanta runs 1,200+ automated tests 
continuously to monitor compliance across your infrastructure. Filter by status (OK, NEEDS_ATTENTION, DEACTIVATED), 
cloud integration (aws, azure, gcp), or compliance framework (soc2, iso27001, hipaa). Returns test results 
showing which security controls are passing or failing across your infrastructure. Tests that are NOT_APPLICABLE 
to your resources are included by default - use statusFilter=NEEDS_ATTENTION to retrieve only actionable failing tests.`;

const TEST_STATUS_FILTER_DESCRIPTION = `Filter tests by their status.
Helpful for retrieving only relevant or actionable results.
Possible values: OK, DEACTIVATED, NEEDS_ATTENTION, IN_PROGRESS, INVALID, NOT_APPLICABLE.`;

const INTEGRATION_FILTER_DESCRIPTION = `Filter by integration. Non-exhaustive examples of possible values include aws, azure, gcp, snyk.`;

const FRAMEWORK_FILTER_DESCRIPTION = `Filter by framework. Non-exhaustive examples: soc2, ccpa, fedramp`;

const CONTROL_FILTER_DESCRIPTION = `Filter by control. Generally will only be known if pulled from the /v1/controls endpoint.`;

export const GetTestsInput = z.object({
  pageSize: z.number().describe(PAGE_SIZE_DESCRIPTION).optional(),
  pageCursor: z.string().describe(PAGE_CURSOR_DESCRIPTION).optional(),
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
  pageSize: z.number().describe(PAGE_SIZE_DESCRIPTION).optional(),
  pageCursor: z.string().describe(PAGE_CURSOR_DESCRIPTION).optional(),
  entityStatus: z
    .string()
    .describe("Filter by entity status. Possible values: FAILING, DEACTIVATED.")
    .optional(),
});

export const GetTestEntitiesTool: Tool<typeof GetTestEntitiesInput> = {
  name: "get_test_entities",
  description: `Get the specific failing resources (entities) for a known test ID. Use this when you already 
  know the test name/ID and need to see which specific infrastructure resources are failing that test. For 
  example, if you know "aws-security-groups-open-to-world" test is failing, this returns the actual security 
  group IDs that are failing. Requires a specific testId parameter. Do NOT use this for general test discovery - use get_tests for that.`,
  parameters: GetTestEntitiesInput,
};

const GetTestByIdInput = z.object({
  testId: z.string().describe("Lowercase with hyphens"),
});

export const GetTestByIdTool: Tool<typeof GetTestByIdInput> = {
  name: "get_test_by_id",
  description: `Get the details of a single specific test when its ID is known. The ID of a test can be 
  found in the response from get_tests or from the URL of the test in your browser after /tests/.`,
  parameters: GetTestByIdInput,
};
