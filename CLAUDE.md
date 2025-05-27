# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `yarn build` - Build TypeScript to JavaScript in build/ directory
- `yarn start` - Build and run the MCP server
- `yarn eval` - Build and run evaluation tests
- `yarn lint` - Run ESLint
- `yarn lint:fix` - Auto-fix linting issues
- `yarn format` - Format code with Prettier
- `yarn fix` - Format and auto-fix linting issues

## Architecture

This is a Model Context Protocol (MCP) server that provides tools for interfacing with the Vanta compliance platform API. The server exposes operations as MCP tools that can be called by AI assistants.

### Core Structure

- **src/index.ts** - Main MCP server setup and tool registration
- **src/api.ts** - Base API URL configuration with region support (us/eu/aus)
- **src/types.ts** - Tool interface definitions
- **src/operations/** - Tool implementations organized by domain:
  - **tests.ts** - Test management (get tests, test entities, deactivation)
  - **frameworks.ts** - Compliance framework operations
  - **documents.ts** - Document upload functionality
  - **utils.ts** - Authentication header creation

### Tool Pattern

All tools follow a consistent pattern:
1. Zod schema for input validation
2. Tool definition with name, description, and parameters
3. Async function that makes authenticated API calls to Vanta
4. Returns CallToolResult with JSON response or error

### Authentication

Uses Bearer token authentication via `VANTA_API_KEY` environment variable. All requests include `x-vanta-is-mcp: true` header.

### Region Configuration

API endpoints determined by `REGION` environment variable (us/eu/aus), defaults to staging US.

### Evaluation

The eval/ directory contains OpenAI-based testing that validates tool definitions and expected usage patterns.