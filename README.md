# Vanta MCP Server

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js CI](https://github.com/VantaInc/vanta-mcp-server/workflows/Node.js%20CI/badge.svg)](https://github.com/VantaInc/vanta-mcp-server/actions)
[![npm version](https://badge.fury.io/js/vanta-mcp-server.svg)](https://badge.fury.io/js/vanta-mcp-server)

A Model Context Protocol (MCP) server that provides tools for interfacing with the Vanta compliance platform API. This server enables AI assistants to interact with Vanta's security and compliance tools through standardized MCP tools.

## Features

- 🔍 **Test Management** - Retrieve and manage compliance tests
- 📊 **Framework Operations** - Access compliance frameworks and controls  
- 📄 **Document Upload** - Upload documents for compliance evidence
- 🌍 **Multi-Region Support** - US, EU, and AUS regions
- 🔐 **Secure Authentication** - Bearer token authentication
- 🛠️ **TypeScript** - Full TypeScript support with strict type checking

## Quick Start

### Installation

```bash
npm install vanta-mcp-server
# or
yarn add vanta-mcp-server
```

### Setup

1. **Get your Vanta API key** from your Vanta dashboard
2. **Set environment variables**:
   ```bash
   export VANTA_API_KEY="your_api_key_here"
   export REGION="us"  # Optional: us, eu, or aus (defaults to us)
   ```

3. **Run the server**:
   ```bash
   npx vanta-mcp-server
   # or if installed globally
   vanta-mcp-server
   ```

### Using with Claude Desktop

Add to your Claude Desktop MCP configuration:

```json
{
  "mcpServers": {
    "vanta": {
      "command": "npx",
      "args": ["vanta-mcp-server"],
      "env": {
        "VANTA_API_KEY": "your_api_key_here",
        "REGION": "us"
      }
    }
  }
}
```

## Available Tools

### Test Management

#### `get_tests`
Lists all compliance tests with optional filtering.

**Parameters:**
- `pageSize` (optional): Number of results (1-100, default 10)
- `statusFilter` (optional): Filter by status (`OK`, `NEEDS_ATTENTION`, `IN_PROGRESS`, etc.)
- `integrationFilter` (optional): Filter by integration (`aws`, `azure`, `gcp`, etc.)
- `frameworkFilter` (optional): Filter by framework (`soc2`, `ccpa`, `fedramp`, etc.)

**Example:**
```typescript
// Get failing AWS tests for SOC2
{
  "statusFilter": "NEEDS_ATTENTION",
  "integrationFilter": "aws", 
  "frameworkFilter": "soc2"
}
```

#### `get_test_entities`
Lists entities (resources) for a specific test.

**Parameters:**
- `testId` (required): Test identifier (lowercase with hyphens)
- `pageSize` (optional): Number of results (1-100, default 10)
- `entityStatus` (optional): Filter by entity status (`FAILING`, `DEACTIVATED`)

#### `deactivate_test_entity`
Deactivates a specific test entity.

**Parameters:**
- `testId` (required): Test identifier
- `entityId` (required): Entity identifier
- `deactivateReason` (required): Reason for deactivation
- `deactivateUntil` (required): Deactivation end date (ISO 8601 format)

### Framework Operations

#### `get_frameworks`
Lists all compliance frameworks.

**Parameters:**
- `pageSize` (optional): Number of results
- `pageCursor` (optional): Pagination cursor

#### `get_framework_controls`
Lists controls for a specific framework.

**Parameters:**
- `frameworkId` (required): Framework identifier
- `pageSize` (optional): Number of results
- `pageCursor` (optional): Pagination cursor

### Document Management

#### `upload_document`
Uploads a file for compliance documentation.

**Parameters:**
- `documentId` (required): Document identifier
- `file` (required): File to upload

## Configuration

### Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `VANTA_API_KEY` | Your Vanta API key | - | ✅ |
| `REGION` | API region (`us`, `eu`, `aus`) | `us` | ❌ |

### API Endpoints

- **US**: `https://api.staging.vanta.com`
- **EU**: `https://api.eu.vanta.com`
- **AUS**: `https://api.aus.vanta.com`

## Development

### Prerequisites

- Node.js 18+ 
- Yarn or npm

### Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/VantaInc/vanta-mcp-server.git
   cd vanta-mcp-server
   ```

2. **Install dependencies**:
   ```bash
   yarn install
   ```

3. **Set up environment**:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

### Available Scripts

- `yarn build` - Build TypeScript to JavaScript
- `yarn start` - Build and run the server
- `yarn dev` - Run in development mode with hot reload
- `yarn test` - Run tests
- `yarn lint` - Run ESLint
- `yarn lint:fix` - Fix linting issues
- `yarn format` - Format code with Prettier
- `yarn format:check` - Check code formatting

### Testing

```bash
# Run all tests
yarn test

# Run tests in watch mode
yarn test:watch

# Run tests with coverage
yarn test:coverage

# Run evaluation tests
yarn eval
```

## Usage Examples

### Basic Test Retrieval

```typescript
// Get all tests that need attention
const response = await mcpClient.callTool("get_tests", {
  statusFilter: "NEEDS_ATTENTION",
  pageSize: 50
});
```

### AWS Security Findings

```typescript
// Get AWS security findings for SOC2
const awsTests = await mcpClient.callTool("get_tests", {
  integrationFilter: "aws",
  frameworkFilter: "soc2", 
  statusFilter: "NEEDS_ATTENTION"
});

// Get detailed entities for a failing test
const entities = await mcpClient.callTool("get_test_entities", {
  testId: "aws-security-groups-open-to-world",
  entityStatus: "FAILING"
});
```

### Framework Compliance

```typescript
// List all frameworks
const frameworks = await mcpClient.callTool("get_frameworks", {});

// Get SOC2 controls
const soc2Controls = await mcpClient.callTool("get_framework_controls", {
  frameworkId: "soc2"
});
```

## Architecture

The server follows a modular architecture:

```
src/
├── index.ts              # Main MCP server setup
├── api.ts               # API configuration and regions
├── types.ts             # TypeScript interfaces
├── operations/          # Tool implementations
│   ├── tests.ts         # Test management tools
│   ├── frameworks.ts    # Framework operations
│   ├── documents.ts     # Document upload tools
│   └── utils.ts         # Shared utilities
└── eval/                # Evaluation and testing
    └── eval.ts          # OpenAI-based tool testing
```

Each tool follows a consistent pattern:
1. **Zod schema** for input validation
2. **Tool definition** with name, description, and parameters  
3. **Implementation function** that makes authenticated API calls
4. **Structured response** with proper error handling

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Quick Contributing Steps

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Add tests for new functionality
5. Run the test suite: `yarn test`
6. Run linting: `yarn lint`
7. Commit your changes: `git commit -m 'Add amazing feature'`
8. Push to the branch: `git push origin feature/amazing-feature`
9. Open a Pull Request

## Security

For security vulnerabilities, please see our [Security Policy](SECURITY.md).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- 📚 [Documentation](https://docs.vanta.com)
- 🐛 [Issue Tracker](https://github.com/VantaInc/vanta-mcp-server/issues)
- 💬 [Discussions](https://github.com/VantaInc/vanta-mcp-server/discussions)
- 📧 [Email Support](mailto:support@vanta.com)

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for a list of changes and version history.
