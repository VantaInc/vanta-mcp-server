// 1. Imports
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { Tool } from "../types.js";
import { z } from "zod";
import {
  createPaginationSchema,
  createIdSchema,
  makePaginatedGetRequest,
  makeGetByIdRequest,
} from "./utils.js";

// 2. Input Schemas
const ListMonitoredComputersInput = createPaginationSchema();

const GetMonitoredComputerInput = createIdSchema({
  paramName: "computerId",
  description:
    "Computer ID to retrieve, e.g. 'computer-123' or specific computer identifier",
});

// 3. Tool Definitions
export const ListMonitoredComputersTool: Tool<
  typeof ListMonitoredComputersInput
> = {
  name: "list_monitored_computers",
  description:
    "List all monitored computers in your Vanta account. Returns computer IDs, hostnames, operating systems, and monitoring status for endpoint management. Use this to see all computers being monitored for compliance and security.",
  parameters: ListMonitoredComputersInput,
};

export const GetMonitoredComputerTool: Tool<typeof GetMonitoredComputerInput> =
  {
    name: "get_monitored_computer",
    description:
      "Get monitored computer by ID. Retrieve detailed information about a specific monitored computer when its ID is known. The ID of a computer can be found from list_monitored_computers response. Returns complete computer details including hardware specs, software inventory, and compliance status.",
    parameters: GetMonitoredComputerInput,
  };

// 4. Implementation Functions
export async function listMonitoredComputers(
  args: z.infer<typeof ListMonitoredComputersInput>,
): Promise<CallToolResult> {
  return makePaginatedGetRequest("/v1/monitored-computers", args);
}

export async function getMonitoredComputer(
  args: z.infer<typeof GetMonitoredComputerInput>,
): Promise<CallToolResult> {
  return makeGetByIdRequest("/v1/monitored-computers", args.computerId);
}
