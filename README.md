# Vanta MCP Server

A [Model Context Protocol](https://modelcontextprotocol.com/) server that provides access to Vanta's automated security compliance platform. Vanta helps organizations achieve and maintain compliance with security frameworks like SOC 2, ISO 27001, HIPAA, GDPR, and others through automated monitoring, evidence collection, and continuous security testing. This MCP server enables AI assistants to interact with Vanta's API to retrieve compliance test results, manage security findings, and access framework requirements.

> **⚠️ Important Disclaimer:** This experimental server is currently in **public preview** and provides AI assistants with access to your Vanta compliance data. You may encounter bugs, errors or unexpected results. Always verify the accuracy and appropriateness of AI-generated responses before taking any compliance or security actions. Users are responsible for reviewing all outputs and ensuring they meet their organization's security and compliance requirements.

## Features

### Controls

- List security controls or fetch a specific control by ID
- Discover which automated tests validate each control
- Review evidence documents mapped to controls

| Tool Name                                                                              | Description                                                                                                                                                  |
| -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [`controls`](https://developer.vanta.com/reference/listcontrols)                       | Access security controls in your Vanta account. Provide controlId to get a specific control, or omit to list all controls with optional framework filtering. |
| [`list_control_tests`](https://developer.vanta.com/reference/listtestsforcontrol)      | Enumerate automated tests that validate a specific security control, including status and failing entity details.                                            |
| [`list_control_documents`](https://developer.vanta.com/reference/listcontroldocuments) | List documents that provide evidence for a specific security control so you can quickly locate supporting artifacts.                                         |

### Documents

- Enumerate compliance documents across your organization
- Inspect the controls, links, or uploads associated with a document

| Tool Name                                                                          | Description                                                                                                                      |
| ---------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| [`documents`](https://developer.vanta.com/reference/listdocuments)                 | List documents in your Vanta account or retrieve a specific document by ID with metadata for compliance and evidence management. |
| [`document_resources`](https://developer.vanta.com/reference/listdocumentcontrols) | Retrieve resources linked to a document (controls, links, uploads) by specifying the desired resource type.                      |

### Frameworks

- Review framework adoption and progress metrics across your organization
- Drill into the controls required by each framework

| Tool Name                                                                                | Description                                                                                                                        |
| ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| [`frameworks`](https://developer.vanta.com/reference/listframeworks)                     | List compliance frameworks available in your Vanta account along with completion status and progress metrics.                      |
| [`list_framework_controls`](https://developer.vanta.com/reference/listframeworkcontrols) | Retrieve the controls associated with a framework, including descriptions, implementation guidance, and current compliance status. |

### Integrations

- Enumerate connected integrations and review their metadata
- Explore supported resource kinds and fetch integration resources on demand

| Tool Name                                                                                  | Description                                                                                                                                              |
| ------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`integrations`](https://developer.vanta.com/reference/listintegrations)                   | List integrations connected to your Vanta account or fetch details for a specific integration, including supported resource kinds and connection status. |
| [`integration_resources`](https://developer.vanta.com/reference/listresourcekindsummaries) | Access integration resources by selecting the desired operation (`list_kinds`, `get_kind_details`, `list_resources`, or `get_resource`).                 |

### People

- List or retrieve people for compliance and access reviews

| Tool Name                                                    | Description                                                                                                                  |
| ------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| [`people`](https://developer.vanta.com/reference/listpeople) | List people in your Vanta account or retrieve a specific person by ID, including role, email, and group membership metadata. |

### Risks

- Track risk scenarios, their status, scoring, and treatment plans

| Tool Name                                                          | Description                                                                                                                                |
| ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| [`risks`](https://developer.vanta.com/reference/listriskscenarios) | List risk scenarios managed in your risk register or fetch a specific scenario by ID to review status, scoring, and treatment information. |

### Tests

- Monitor automated security tests running in your environment
- Investigate the entities associated with a specific test

| Tool Name                                                                     | Description                                                                                                                                                |
| ----------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`tests`](https://developer.vanta.com/reference/listtests)                    | Retrieve Vanta's automated security and compliance tests. Filter by status, integration, or framework to understand which controls are passing or failing. |
| [`list_test_entities`](https://developer.vanta.com/reference/gettestentities) | Get the resources monitored by a specific security test, including failing entities that require remediation.                                              |

### Vulnerabilities

- Review vulnerabilities surfaced by Vanta, including CVE metadata and affected assets

| Tool Name                                                                      | Description                                                                                                                                                     |
| ------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`vulnerabilities`](https://developer.vanta.com/reference/listvulnerabilities) | List vulnerabilities detected across your infrastructure or retrieve a specific vulnerability by ID with CVE details, severity, and impacted asset information. |

## Tools

| Tool Name                                                                                  | Description                                                                                                                                     |
| ------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| [`tests`](https://developer.vanta.com/reference/listtests)                                 | Retrieve Vanta's automated security and compliance tests. Filter by status, integration, or framework to understand pass/fail posture quickly.  |
| [`list_test_entities`](https://developer.vanta.com/reference/gettestentities)              | Get resources monitored by a particular test, including failing entities that need remediation.                                                 |
| [`controls`](https://developer.vanta.com/reference/listcontrols)                           | List security controls in your Vanta account or retrieve a specific control by ID with framework mapping details.                               |
| [`list_control_tests`](https://developer.vanta.com/reference/listtestsforcontrol)          | Enumerate automated tests that validate a specific control, complete with status and failing entity information.                                |
| [`list_control_documents`](https://developer.vanta.com/reference/listcontroldocuments)     | List documents mapped to a control to locate supporting evidence quickly.                                                                       |
| [`documents`](https://developer.vanta.com/reference/listdocuments)                         | List compliance documents or fetch details for a specific document, including metadata.                                                         |
| [`document_resources`](https://developer.vanta.com/reference/listdocumentcontrols)         | Retrieve resources linked to a document (controls, links, uploads) by choosing the desired resource type.                                       |
| [`integrations`](https://developer.vanta.com/reference/listintegrations)                   | List integrations connected to your Vanta account or fetch details for a specific integration, including resource kinds and connection status.  |
| [`integration_resources`](https://developer.vanta.com/reference/listresourcekindsummaries) | Inspect integration resource kinds, schema information, full resource lists, or a specific resource by selecting from the supported operations. |
| [`frameworks`](https://developer.vanta.com/reference/listframeworks)                       | List compliance frameworks with completion status and progress metrics for each.                                                                |
| [`list_framework_controls`](https://developer.vanta.com/reference/listframeworkcontrols)   | Retrieve the controls associated with a compliance framework, including descriptions and implementation guidance.                               |
| [`people`](https://developer.vanta.com/reference/listpeople)                               | List people across your organization or look up a specific person by ID with role, email, and group membership metadata.                        |
| [`risks`](https://developer.vanta.com/reference/listriskscenarios)                         | List risk scenarios under management or fetch a specific scenario to review status, scoring, and treatment plans.                               |
| [`vulnerabilities`](https://developer.vanta.com/reference/listvulnerabilities)             | List detected vulnerabilities or retrieve a specific item with CVE metadata, severity, and impacted assets.                                     |

## Configuration

### Vanta OAuth Credentials

1. Create OAuth credentials from [Vanta's developer dashboard](https://developer.vanta.com/docs/api-access-setup)
2. Save the `client_id` and `client_secret` to an env file:
   ```json
   {
     "client_id": "your_client_id_here",
     "client_secret": "your_client_secret_here"
   }
   ```

> **Note:** Vanta currently allows only a single active access_token per Application. [More info here](https://developer.vanta.com/docs/api-access-setup#authentication-and-token-retrieval)

### Usage with Claude Desktop

Add the server to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "vanta": {
      "command": "npx",
      "args": ["-y", "@vantasdk/vanta-mcp-server"],
      "env": {
        "VANTA_ENV_FILE": "/absolute/path/to/your/vanta-credentials.env"
      }
    }
  }
}
```

If you are unfamiliar with setting up MCP servers in Claude Desktop, [here is an example](https://modelcontextprotocol.io/quickstart/user) in the official MCP documentation.

### Usage with Cursor

Add the server to your Cursor MCP settings:

```json
{
  "mcpServers": {
    "Vanta": {
      "command": "npx",
      "args": ["-y", "@vantasdk/vanta-mcp-server"],
      "env": {
        "VANTA_ENV_FILE": "/absolute/path/to/your/vanta-credentials.env"
      }
    }
  }
}
```

### Environment Variables

- `VANTA_ENV_FILE` (required): Absolute path to the JSON file containing your OAuth credentials

## Installation

### NPX (Recommended)

```bash
npx @vantasdk/vanta-mcp-server
```

### Global Installation

```bash
npm install -g @vantasdk/vanta-mcp-server
vanta-mcp-server
```

### From Source

```bash
git clone https://github.com/VantaInc/vanta-mcp-server.git
cd vanta-mcp-server
npm install
npm run build
npm start
```

## Build from Source

To build from source:

```bash
npm run build
```

This will:

1. Compile TypeScript to JavaScript
2. Make the output executable
3. Place built files in the `build/` directory

Now you can configure Claude Desktop or Cursor to use the built executable:

```json
{
  "mcpServers": {
    "Vanta": {
      "command": "node",
      "args": ["/absolute/path/to/vanta-mcp-server/build/index.js"],
      "env": {
        "VANTA_ENV_FILE": "/absolute/path/to/your/vanta-credentials.env"
      }
    }
  }
}
```

## Development

This server is built with TypeScript and includes the following development tools:

- **TypeScript**: For type safety and better development experience
- **ESLint**: For code quality and consistency
- **Automated Tool Registry**: Zero-maintenance tool registration system
- **DRY Utilities**: Centralized utilities to reduce code duplication

### Project Structure

```
vanta-mcp-server/
├── src/
│   ├── operations/              # MCP tool implementations
│   │   ├── index.ts            # Barrel export for all operations
│   │   ├── common/             # Shared utilities and infrastructure
│   │   │   ├── descriptions.ts # Centralized parameter descriptions
│   │   │   ├── imports.ts      # Common imports barrel for operations
│   │   │   └── utils.ts        # DRY utilities and request handlers
│   │   ├── controls.ts         # Control-related operations
│   │   ├── vendors.ts          # Vendor-related operations
│   │   ├── people.ts           # People-related operations
│   │   ├── documents.ts        # Document-related operations
│   │   ├── frameworks.ts       # Framework-related operations
│   │   ├── risks.ts            # Risk scenario operations
│   │   ├── tests.ts            # Test-related operations
│   │   ├── integrations.ts     # Integration-related operations (consolidated)
│   │   ├── discovered-vendors.ts # Discovery operations (consolidated)
│   │   ├── trust-centers.ts    # Trust Center operations
│   │   └── ...                 # Other resource operations (18 total)
│   ├── eval/                   # Evaluation and testing framework
│   │   ├── eval.ts            # LLM evaluation test cases
│   │   └── README.md          # Evaluation documentation
│   ├── api.ts                  # Base API configuration
│   ├── auth.ts                 # Authentication handling
│   ├── config.ts               # Control enabled tools
│   ├── index.ts                # Main server entry point
│   ├── registry.ts             # Automated tool registration
│   └── types.ts                # Type definitions
├── build/                      # Compiled JavaScript output
└── README.md                   # This file
```

## Debugging

You can use the MCP Inspector to debug the server:

```bash
npx @modelcontextprotocol/inspector npx @vantasdk/vanta-mcp-server
```

The inspector will open in your browser, allowing you to test tool calls and inspect the server's behavior.

If you want to test a local build you can do so using:

```bash
npx @modelcontextprotocol/inspector node path/to/build/index.js
```

In the browser window you will then need to add the environment variable "VANTA_ENV_FILE": "/absolute/path/to/your/vanta-credentials.env"

## Example Usage

### Get failing AWS tests for SOC2

```typescript
{
  "tool": "list_tests",
  "arguments": {
    "statusFilter": "NEEDS_ATTENTION",
    "integrationFilter": "aws",
    "frameworkFilter": "soc2",
    "pageSize": 50
  }
}
```

## License

This project is licensed under the terms of the MIT open source license. Please refer to [LICENSE](LICENSE) file for details.
