# Vanta MCP Server Evaluation

This directory contains evaluation tests to validate that the Vanta MCP Server tools are correctly understood and called by AI assistants.

## Overview

The evaluation system tests whether Large Language Models (LLMs) correctly:

- Choose the right tool for compliance-related prompts
- Provide appropriate parameters for each tool
- Avoid calling Vanta tools for non-compliance requests

## Prerequisites

- **OpenAI API Key**: Required to run the evaluation tests
- **Node.js 18+** and **Yarn** installed
- Project dependencies installed (`yarn install`)

## Running the Evaluation

### Method 1: Using yarn script (Recommended)

```bash
# Set your OpenAI API key
export OPENAI_API_KEY="your_openai_api_key_here"

# Run the evaluation
yarn eval
```

### Method 2: Direct execution

```bash
# Build the project
yarn build

# Set API key and run
OPENAI_API_KEY="your_openai_api_key_here" node build/eval/eval.js
```

## Test Cases

The evaluation includes 66 test cases covering:

### ✅ **Tool Selection Tests**

- **Framework Listing**: `frameworks` to list available compliance frameworks
- **Framework Details**: `frameworks` with frameworkId for specific framework information
- **Framework Controls**: `list_framework_controls` for control requirements in specific frameworks
- **Control Listing**: `controls` to list all security controls
- **Control Details**: `controls` with controlId for specific control information
- **Control Tests**: `list_control_tests` for tests validating specific controls
- **Library Controls**: `list_library_controls` for available Vanta library controls
- **Control Documents**: `list_control_documents` for documents associated with controls
- **Risk Listing**: `risks` to list all risk scenarios
- **Risk Details**: `risks` with riskId for specific risk scenario information
- **Test Listing**: `tests` to list all security tests
- **Test Details**: `tests` with testId for specific test information
- **Test Entities**: `list_test_entities` for resources tested by specific tests
- **Integration Listing**: `integrations` to list connected integrations
- **Integration Details**: `integrations` with integrationId for specific integration information
- **Integration Resource Kinds**: `list_integration_resource_kinds` for available resource types
- **Integration Resource Details**: `get_integration_resource_kind_details` for resource type schemas
- **Integration Resources**: `list_integration_resources` for monitored resources
- **Integration Resource Info**: `get_integration_resource` for specific resource details
- **Vendor Listing**: `vendors` to list all vendors
- **Vendor Details**: `vendors` with vendorId for specific vendor information
- **Vendor Documents**: `list_vendor_documents` for vendor compliance documentation
- **Vendor Findings**: `list_vendor_findings` for vendor security issues
- **Vendor Security Reviews**: `list_vendor_security_reviews` for vendor assessments
- **Vendor Security Review Details**: `get_vendor_security_review` for specific review information
- **Vendor Security Review Documents**: `list_vendor_security_review_documents` for review documentation
- **Document Listing**: `documents` to list all compliance documents
- **Document Details**: `documents` with documentId for specific document information
- **Document Controls**: `list_document_controls` for controls associated with documents
- **Document Links**: `list_document_links` for external references in documents
- **Document Uploads**: `list_document_uploads` for file uploads attached to documents
- **Document Downloads**: `download_document_file` for intelligently downloading files (text content for readable files, metadata for binary files)
- **Policy Listing**: `policies` to list all organizational policies
- **Policy Details**: `policies` with policyId for specific policy information
- **Discovered Vendors**: `list_discovered_vendors` for automatically discovered vendors
- **Discovered Vendor Accounts**: `list_discovered_vendor_accounts` for detailed vendor account information
- **Group Listing**: `groups` to list all organizational groups
- **Group Details**: `groups` with groupId for specific group information
- **Group Membership**: `list_group_people` for people in specific groups
- **People Listing**: `people` to list all people in the organization
- **Person Details**: `people` with personId for specific person information
- **Vulnerability Listing**: `vulnerabilities` to list all detected vulnerabilities
- **Vulnerability Details**: `vulnerabilities` with vulnerabilityId for specific vulnerability information
- **Vulnerability Remediations**: `list_vulnerability_remediations` for tracking remediation efforts
- **Vulnerable Assets**: `vulnerable_assets` to list assets affected by vulnerabilities
- **Vulnerable Asset Details**: `vulnerable_assets` with vulnerableAssetId for specific asset vulnerability information
- **Monitored Computers**: `monitored_computers` to list all computers being monitored for compliance
- **Computer Details**: `monitored_computers` with monitoredComputerId for specific computer information
- **Vendor Risk Attributes**: `list_vendor_risk_attributes` for available risk assessment criteria
- **Trust Center Configuration**: `get_trust_center` for Trust Center settings and branding
- **Trust Center Access Requests**: `trust_center_access_requests` for managing customer access (list or get specific)
- **Trust Center Analytics**: `list_trust_center_viewer_activity_events` for engagement tracking
- **Control Categories**: `trust_center_control_categories` for compliance organization (list or get specific)
- **Published Controls**: `trust_center_controls` for public compliance controls (list or get specific)
- **Trust Center FAQs**: `trust_center_faqs` for customer information (list or get specific)
- **Trust Center Resources**: `list_trust_center_resources` for downloadable materials
- **Resource Documents**: `get_trust_center_document` for specific document details
- **Resource Media**: `get_trust_center_resource_media` for downloading Trust Center files
- **Trust Center Subprocessors**: `trust_center_subprocessors` for third-party service providers (list or get specific)
- **Trust Center Updates**: `trust_center_updates` for compliance status changes (list or get specific)
- **Trust Center Viewers**: `trust_center_viewers` for access management (list or get specific)
- **Trust Center Subscribers**: `get_trust_center_subscriber` for subscriber details
- **Trust Center Subscriber Groups**: `trust_center_subscriber_groups` for subscriber organization (list or get specific)
- **Trust Center Historical Access**: `list_trust_center_historical_access_requests` for audit tracking
- **Trust Center All Subscribers**: `list_trust_center_subscribers` for communication management

### ❌ **Negative Tests**

- **Programming Questions**: Should NOT call any Vanta tools
- **Code Debugging**: Should NOT call any Vanta tools

## Sample Output

```
🧪 Vanta MCP Server Tool Evaluation
====================================

📝 Test: Should call frameworks to list available frameworks
💬 Prompt: "What compliance frameworks are we tracking?"
🎯 Expected Tool: frameworks
✅ PASS: Correctly called frameworks
✅ Parameters match expected values
📋 Called with: {}

📝 Test: Should call controls with controlId for specific control details
💬 Prompt: "Get details for control ID data-protection-2"
🎯 Expected Tool: controls
✅ PASS: Correctly called controls
✅ Parameters match expected values
📋 Called with: {
  "controlId": "data-protection-2"
}

📊 Final Results
================
✅ Passed: 66/66 tests
❌ Failed: 0/66 tests
📈 Success Rate: 100%
🎉 All tests passed! Tool calling behavior is working correctly.
```

## Understanding Results

### ✅ **PASS**:

- Correct tool was called
- Parameters match expected values (if specified)

### ⚠️ **Partial Pass**:

- Correct tool was called
- Parameters don't exactly match but are functionally correct

### ❌ **FAIL**:

- Wrong tool was called
- No tool was called when one was expected
- Tool was called when none should be

## Consolidated Tool Architecture

The Vanta MCP Server uses a **consolidated tool pattern** where many tools can handle both list and get-by-ID operations:

### **Consolidated Tools** (53 total)

These tools accept an optional ID parameter:

- **Without ID**: Lists all resources with optional filtering and pagination
- **With ID**: Returns the specific resource details

Examples:

- `frameworks` - Lists all frameworks OR get specific framework with `frameworkId`
- `controls` - Lists all controls OR get specific control with `controlId`
- `vendors` - Lists all vendors OR get specific vendor with `vendorId`
- `documents` - Lists all documents OR get specific document with `documentId`

### **Specialized Tools**

Some tools remain separate for specific operations:

- `list_control_tests` - Lists tests for a control
- `list_framework_controls` - Lists controls in a framework
- `download_document_file` - Downloads document files
- `get_integration_resource` - Gets specific integration resources

## Customizing Tests

To add new test cases, edit `eval.ts` and add to the `testCases` array:

```typescript
{
  prompt: "Your test prompt here",
  expectedTool: "expected_tool_name", // or "none"
  expectedParams: { param1: "value1" }, // optional
  description: "Description of what should happen"
}
```

## Troubleshooting

### Common Issues

**API Key Error**:

```
Error: OpenAI API key not found
```

**Solution**: Ensure `OPENAI_API_KEY` environment variable is set

**Build Error**:

```
Cannot find module 'build/eval/eval.js'
```

**Solution**: Run `yarn build` first

**TypeScript Error**:

```
Type errors in eval.ts
```

**Solution**: Check tool imports and parameter types

### Getting Help

If tests are failing:

1. **Check tool descriptions** in `src/operations/` files
2. **Review test prompts** - ensure they're clear and specific
3. **Validate expected parameters** - ensure they match tool schemas
4. **Test individual prompts** with the OpenAI API directly

## Purpose

This evaluation system helps ensure that:

- **Tool descriptions are clear** and LLM-friendly
- **Real-world prompts** trigger the correct tools
- **Parameter passing** works as expected
- **Scope boundaries** are respected (no tools called for non-compliance queries)
- **Consolidated architecture** works effectively (LLMs understand optional ID parameters)

The goal is to maintain high confidence that AI assistants will use the Vanta MCP Server correctly for compliance and security management tasks, taking advantage of the intelligent consolidated tool pattern for optimal efficiency.
