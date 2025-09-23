# Vanta MCP Server

A [Model Context Protocol](https://modelcontextprotocol.com/) server that provides access to Vanta's automated security compliance platform. Vanta helps organizations achieve and maintain compliance with security frameworks like SOC 2, ISO 27001, HIPAA, GDPR, and others through automated monitoring, evidence collection, and continuous security testing. This MCP server enables AI assistants to interact with Vanta's API to retrieve compliance test results, manage security findings, and access framework requirements.

> **⚠️ Important Disclaimer:** This experimental server is currently in **public preview** and provides AI assistants with access to your Vanta compliance data. You may encounter bugs, errors or unexpected results. Always verify the accuracy and appropriateness of AI-generated responses before taking any compliance or security actions. Users are responsible for reviewing all outputs and ensuring they meet their organization's security and compliance requirements.

## Features

### Security Test Management

- Access Vanta's 1,200+ automated security tests that run continuously to monitor compliance
- Retrieve test results with filtering by status (passing/failing), cloud provider (AWS/Azure/GCP), or compliance framework
- Get detailed information about failing resources (test entities) that need remediation

### Compliance Framework Operations

- Access 35+ supported compliance frameworks including SOC 2, ISO 27001, HIPAA, GDPR, FedRAMP, and PCI
- Retrieve detailed control requirements and evidence mappings for each framework
- Monitor framework completion progress and compliance status
- Get specific control details that map to automated tests and required documentation

### Security Control Management

- List all security controls across all compliance frameworks in your account
- View control names, descriptions, framework mappings, and implementation status
- Get specific tests that validate each security control
- Understand which automated tests monitor compliance for specific controls

### Risk Scenario Management

- Get all the risk scenarios you are managing in your current risk register.
- Returns details about each risk scenario's status, inherent & residual risk score, treatment plan, and more.
- Filterable by risk category (Access Control, Cryptography, Privacy, and many others).

### Integration Management

- List all connected integrations in your Vanta account (AWS, Azure, GCP, Snyk, etc.)
- Get detailed information about specific integrations and their configurations
- View integration resource kinds and connection status
- Monitor which integrations are actively connected to your instance
- List resource types (kinds) that integrations can monitor (S3Bucket, CloudwatchLogGroup, etc.)
- Get detailed information about specific resource types and their properties
- List all infrastructure resources discovered by integrations
- Access detailed resource information including metadata, compliance status, and configuration

### Vendor Management

- List all vendors in your Vanta account for vendor risk management
- Get detailed vendor information including contact details and website URLs
- Access vendor risk assessment status and compliance information
- Manage vendor relationships and due diligence tracking
- View all documents associated with vendors for compliance purposes
- Access security findings and risk assessment results for vendors
- Review history of security assessments and due diligence activities
- Get detailed information about specific vendor security reviews
- Access supporting documentation and reports for security assessments

### Document Management

- List all documents in your Vanta account for compliance and evidence management
- Get detailed information about specific documents including metadata and compliance mappings
- View security controls that are mapped to or associated with documents as evidence
- Access external links and references associated with documents
- List all files and uploads attached to documents for compliance documentation
- Intelligently download file uploads with automatic MIME type handling - text files return readable content, binary files return metadata

### Policy Management

- List all policies in your Vanta account for compliance and governance management
- Get detailed policy information including content, approval status, and compliance mappings
- Access organizational policies for security, privacy, and operational governance
- View policy metadata including names, types, and associated compliance frameworks

### Discovered Vendor Management

- List vendors automatically discovered through integrations for potential vendor onboarding
- Access detailed account information for discovered vendors including integration sources
- Understand vendor relationships and account structures before converting to managed vendors
- Streamline vendor risk assessment workflows by identifying unmanaged vendor relationships

### Group & People Management

- List all organizational groups for structure and access management
- Get detailed group information including member counts and access permissions
- View group membership to understand who has group-based access permissions
- List all people in your organization for compliance and security management
- Access detailed person information including roles, email addresses, and group memberships
- Manage organizational structure and access control through comprehensive people and group data

### Vulnerability Management

- Monitor all vulnerabilities detected across your infrastructure and applications
- Access detailed vulnerability information including CVE data, severity levels, and affected assets
- Track vulnerability remediation efforts and timelines for security management
- Identify vulnerable assets and understand their security status
- Prioritize security efforts based on asset vulnerability associations and risk levels

### Endpoint & Risk Management

- Monitor all computers across your organization for compliance and security
- Access detailed computer information including hostnames, operating systems, and security status
- Manage endpoint security and compliance across diverse computing environments
- Understand available vendor risk attributes for comprehensive risk assessment
- Categorize and evaluate vendor risks using standardized risk assessment criteria

### Trust Center Management

- Access complete Trust Center configuration, branding, and public visibility settings
- Manage Trust Center access requests from potential customers and stakeholders
- Track detailed viewer activity and engagement analytics across Trust Center content
- Organize and manage control categories for clear compliance presentation
- Publish and manage compliance controls with implementation details and evidence
- Maintain comprehensive FAQ sections for customer transparency and communication
- Provide downloadable resources including compliance documents and certifications
- Enable customer self-service access to compliance and security information

### Multi-Region Support

- US, EU, and AUS regions with region-specific API endpoints
- Global compliance support for distributed organizations

## Tools

| Tool Name                | Description                                                                                                                                                                                                                                                                                                  |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `get_tests`              | Retrieve Vanta's automated security and compliance tests. Filter by status (OK, NEEDS_ATTENTION, DEACTIVATED), cloud integration (aws, azure, gcp), or compliance framework (soc2, iso27001, hipaa). Returns test results showing which security controls are passing or failing across your infrastructure. |
| `get_test_entities`      | Get specific resources (entities) that are failing a particular security test. For example, if an AWS security group test is failing, this returns the actual security group IDs and details about what's wrong. Essential for understanding exactly which infrastructure components need remediation.       |
| `get_test_by_id`         | Get the details of a specific test by its ID. The ID of a test may be retrieved from the `get_tests` response or from the address bar of your browser after /tests/.                                                                                                                                         |
| `get_frameworks`         | List all compliance frameworks available in your Vanta account (SOC 2, ISO 27001, HIPAA, GDPR, FedRAMP, PCI, etc.) along with completion status and progress metrics. Shows which frameworks you're actively pursuing and their current compliance state.                                                    |
| `get_framework_controls` | Get detailed security control requirements for a specific compliance framework. Returns the specific controls, their descriptions, implementation guidance, and current compliance status. Essential for understanding what security measures are required for each compliance standard.                     |
| `get_framework_by_id`    | Get framework by ID. Retrieve detailed information about a specific compliance framework when its ID is known. The ID of a framework can be found from get_frameworks response. Returns complete framework details including name, description, completion status, progress metrics, and compliance state. |
| `get_controls`           | List all security controls across all frameworks in your Vanta account. Returns control names, descriptions, framework mappings, and current implementation status. Use this to see all available controls or to find a specific control ID for use with other tools.                                        |
| `get_control_tests`      | Get all automated tests that validate a specific security control. Use this when you know a control ID and want to see which specific tests monitor compliance for that control. Returns test details, current status, and any failing entities for the control's tests.                                     |
| `get_library_controls`   | List Vanta controls from the library. These are pre-built security controls available in Vanta's control library that can be added to your account. Different from get_controls which lists controls already in your account - this shows available controls you can implement.                            |
| `get_control_documents`  | List a control's documents. Get all documents that are associated with or provide evidence for a specific security control. Use this when you know a control ID and want to see which documents are mapped to that control for compliance evidence.                                                          |
| `get_control_by_id`      | Get control by an ID. Retrieve detailed information about a specific security control when its ID is known. The ID of a control can be found from get_controls or get_framework_controls responses. Returns complete control details including name, description, framework mappings, and implementation status. |
| `get_risks`              | Get all the risk scenarios you are managing in your current risk register. Returns details about each risk scenario's status, inherent & residual risk score, treatment plan, and more. Filterable by risk category (Access Control, Cryptography, Privacy, and many others).                                |
| `get_risk_by_id`         | Get risk scenario by ID. Retrieve detailed information about a specific risk scenario when its ID is known. The ID of a risk scenario can be found from get_risks response. Returns complete risk details including status, inherent & residual risk scores, treatment plan, and more.                      |
| `get_integrations`       | List all connected integrations in your Vanta account. Returns integration id, display name, resource kinds supported by the integration, and how many connections exist for such integration. Use this to see all integrations connected in your Vanta instance.                                             |
| `get_integration_by_id`  | Get integration by ID. Retrieve detailed information about a specific integration when its ID is known. The ID of an integration can be found from get_integrations response. Returns complete integration details including configuration, resource kinds, and connection status.                           |
| `get_integration_resource_kinds` | List integration resource kinds. Lists a connected integration's resource types (kinds) such as S3Bucket, CloudwatchLogGroup, etc. Use this to see what types of resources an integration can monitor.                                                                                             |
| `get_integration_resource_kind_details` | Get details for resource kind. Gets details for a specific resource type (kind) such as S3Bucket or CloudwatchLogGroup for a specific integration. Use this to understand what properties and metadata are available for a resource type.                                                  |
| `get_integration_resources` | List resources. List all resources discovered by a specific integration. Use this to see all infrastructure resources that Vanta is monitoring through an integration.                                                                                                                              |
| `get_integration_resource_by_id` | Get resource by ID. Retrieve detailed information about a specific resource discovered by an integration. Use this to get full details about infrastructure resources including metadata, compliance status, and configuration.                                                                    |
| `get_vendors`            | List all vendors in your Vanta account. Returns vendor IDs, names, website URLs, and many other vendor attributes. Use this to see all existing vendors.                                                                                                                                                        |
| `get_vendor_by_id`       | Get vendor by ID. Retrieve detailed information about a specific vendor when its ID is known. The ID of a vendor can be found from get_vendors response. Returns complete vendor details including name, website URLs, contact information, and risk assessment status.                                      |
| `get_vendor_documents`   | List vendor documents. Get all documents associated with a specific vendor for compliance and risk assessment purposes. Use this to see what documentation is available for vendor due diligence.                                                                                                               |
| `get_vendor_findings`    | List vendor findings. Get all security findings and risk assessment results for a specific vendor. Use this to understand security concerns and compliance issues related to a vendor.                                                                                                                         |
| `get_vendor_security_reviews` | Get security reviews by vendor ID. List all security reviews conducted for a specific vendor. Use this to see the history of security assessments and due diligence activities.                                                                                                                          |
| `get_vendor_security_review_by_id` | Get security review by ID. Retrieve detailed information about a specific security review for a vendor. Use this to get complete details about a particular security assessment including findings, status, and recommendations.                                                                        |
| `get_vendor_security_review_documents` | Get security review documents. List all documents associated with a specific vendor security review. Use this to access supporting documentation, evidence, and reports related to a security assessment.                                                                                            |
| `get_documents`          | List all documents in your Vanta account. Returns document IDs, names, types, and metadata for compliance and evidence management. Use this to see all documents available for compliance frameworks and controls.                                                                                    |
| `get_document_by_id`     | Get document by ID. Retrieve detailed information about a specific document when its ID is known. The ID of a document can be found from get_documents response. Returns complete document details including name, type, metadata, and compliance mappings.                                           |
| `get_document_controls`  | List document's controls. Get all security controls that are mapped to or associated with a specific document. Use this to understand which compliance controls are supported by a particular document as evidence.                                                                                   |
| `get_document_links`     | List document's links. Get all external links and references associated with a specific document. Use this to access related resources, external documentation, or supplementary materials for compliance evidence.                                                                                   |
| `get_document_uploads`   | List document's uploads. Get all files and uploads that have been attached to a specific document. Use this to see what files are available for download or review as part of compliance documentation.                                                                                               |
| `download_document_file` | Download file for document. Intelligently retrieves file content from a document upload. For text-based files (txt, json, csv, xml, etc.), returns the readable content. For binary files (images, PDFs, etc.), returns file metadata and information. Use this to access compliance evidence and documentation content that can be analyzed. |
| `get_policies`           | List all policies in your Vanta account. Returns policy IDs, names, types, and metadata for compliance and governance management. Use this to see all policies available for compliance frameworks and organizational governance.                                                                                         |
| `get_policy_by_id`       | Get policy by ID. Retrieve detailed information about a specific policy when its ID is known. The ID of a policy can be found from get_policies response. Returns complete policy details including name, description, content, approval status, and compliance mappings.                                      |
| `get_discovered_vendors` | List discovered vendors in your Vanta account. Returns vendors that have been automatically discovered through integrations but may not yet be managed as official vendors. Use this to see potential vendors for risk assessment and vendor management onboarding.                                        |
| `get_discovered_vendor_accounts` | List discovered vendor accounts in your Vanta account. Returns detailed account information for discovered vendors including integration sources and account metadata. Use this to understand vendor relationships and account structures before converting to managed vendors.                        |
| `get_groups`             | List all groups in your Vanta account. Returns group IDs, names, descriptions, and metadata for organizational structure and access management. Use this to see all groups available for people assignment and access control.                                                                              |
| `get_group_by_id`        | Get group by ID. Retrieve detailed information about a specific group when its ID is known. The ID of a group can be found from get_groups response. Returns complete group details including name, description, member count, and access permissions.                                                   |
| `get_group_people`       | List people in a group. Get all people who are members of a specific group for organizational structure and access management. Use this to understand group membership and review who has group-based access permissions.                                                                                |
| `get_people`             | List all people in your Vanta account. Returns person IDs, names, email addresses, and metadata for organizational structure and access management. Use this to see all people in your organization for compliance and security management.                                                              |
| `get_person_by_id`       | Get person by ID. Retrieve detailed information about a specific person when their ID is known. The ID of a person can be found from get_people response. Returns complete person details including name, email, role, group memberships, and access permissions.                                      |
| `get_vulnerabilities`    | Get vulnerabilities in your Vanta account. Returns vulnerability IDs, CVE information, severity levels, and affected assets for security monitoring and remediation. Use this to see all vulnerabilities detected across your infrastructure and applications.                                           |
| `get_vulnerability_by_id` | Get vulnerability by ID. Retrieve detailed information about a specific vulnerability when its ID is known. The ID of a vulnerability can be found from get_vulnerabilities response. Returns complete vulnerability details including CVE information, severity, affected assets, and remediation status. |
| `get_vulnerability_remediations` | List vulnerability remediations in your Vanta account. Returns remediation IDs, associated vulnerabilities, remediation status, and timeline information for security management. Use this to track vulnerability remediation efforts and ensure timely resolution of security issues.           |
| `get_vulnerable_assets`  | List assets associated with vulnerabilities in your Vanta account. Returns asset IDs, vulnerability associations, asset types, and security status for infrastructure security management. Use this to identify which assets are affected by vulnerabilities and prioritize security efforts.        |
| `get_vulnerable_asset_by_id` | Get vulnerable asset by ID. Retrieve detailed information about a specific vulnerable asset when its ID is known. The ID of a vulnerable asset can be found from get_vulnerable_assets response. Returns complete asset details including vulnerability associations, asset type, and security status. |
| `get_monitored_computers` | List monitored computers in your Vanta account. Returns computer IDs, hostnames, operating systems, and security status for endpoint security management. Use this to see all computers being monitored for compliance and security across your organization.                                               |
| `get_monitored_computer_by_id` | Get monitored computer by ID. Retrieve detailed information about a specific monitored computer when its ID is known. The ID of a computer can be found from get_monitored_computers response. Returns complete computer details including hostname, OS, security status, and compliance information. |
| `get_vendor_risk_attributes` | List vendor risk attributes in your Vanta account. Returns risk attribute IDs, names, categories, and assessment criteria for vendor risk management. Use this to understand the available risk attributes for evaluating and categorizing vendor risks across your organization.                      |
| `get_trust_center`       | Get Trust Center information. Retrieve detailed information about a specific Trust Center including configuration, branding, and public visibility settings. Use this to access Trust Center details for compliance transparency and customer communication.                                           |
| `get_trust_center_access_requests` | List Trust Center access requests. Get all pending and processed access requests for a specific Trust Center. Use this to manage and review who is requesting access to your Trust Center content and compliance information.                                                                     |
| `get_trust_center_access_request` | Get Trust Center access request by ID. Retrieve detailed information about a specific access request including requester details, status, and request metadata. Use this to review individual access requests for approval or denial decisions.                                                    |
| `get_trust_center_viewer_activity_events` | List Trust Center viewer activity events. Get all viewer activity and engagement events for a specific Trust Center including page views, document downloads, and user interactions. Use this to track Trust Center usage and engagement analytics.                                         |
| `get_trust_center_control_categories` | List Trust Center control categories. Get all control categories configured for a specific Trust Center including category names, descriptions, and organization. Use this to understand how compliance controls are categorized and presented to Trust Center visitors.                        |
| `get_trust_center_control_category` | Get Trust Center control category by ID. Retrieve detailed information about a specific control category including its configuration, associated controls, and display settings. Use this to access specific control category details for Trust Center management.                             |
| `get_trust_center_controls` | List Trust Center controls. Get all compliance controls published in a specific Trust Center including control descriptions, implementation status, and evidence. Use this to see which controls are publicly visible to Trust Center visitors.                                                   |
| `get_trust_center_control` | Get Trust Center control by ID. Retrieve detailed information about a specific control published in the Trust Center including implementation details, evidence, and compliance status. Use this to access individual control information for Trust Center transparency.                          |
| `get_trust_center_faqs`  | List Trust Center FAQs. Get all frequently asked questions configured for a specific Trust Center including questions, answers, and organization. Use this to see what information is provided to Trust Center visitors through the FAQ section.                                                  |
| `get_trust_center_faq`   | Get Trust Center FAQ by ID. Retrieve detailed information about a specific FAQ including the question, answer, and display settings. Use this to access individual FAQ content for Trust Center management and customer communication.                                                            |
| `get_trust_center_resources` | List Trust Center resources. Get all resources and documents available in a specific Trust Center including compliance documents, certifications, and downloadable materials. Use this to see what resources are publicly available to Trust Center visitors.                                    |
| `get_trust_center_document` | Get Trust Center document by ID. Retrieve detailed information about a specific document published in the Trust Center including metadata, content, and access settings. Use this to access individual document details for Trust Center content management.                                      |

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
- `REGION` (optional): API region - `us`, `eu`, or `aus` (defaults to `us`)

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

## Debugging

You can use the MCP Inspector to debug the server:

```bash
npx @modelcontextprotocol/inspector npx @vantasdk/vanta-mcp-server
```

The inspector will open in your browser, allowing you to test tool calls and inspect the server's behavior.

## Example Usage

### Get failing AWS tests for SOC2

```typescript
{
  "tool": "get_tests",
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
