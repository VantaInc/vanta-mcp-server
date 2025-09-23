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

The evaluation includes 39 test cases covering:

### ✅ **Tool Selection Tests**

- **AWS Security Review**: `get_tests` with AWS and NEEDS_ATTENTION filters
- **SOC2 Compliance**: `get_tests` with SOC2 framework filter
- **Entity Details**: `get_test_entities` for specific failing resources
- **Framework Listing**: `get_frameworks` for available frameworks
- **Control Requirements**: `get_framework_controls` for specific framework details
- **Status Percentage**: `get_frameworks` for completion percentages
- **Control Listing**: `get_controls` for all security controls
- **Control Tests**: `get_control_tests` for tests validating specific controls
- **Library Controls**: `get_library_controls` for available Vanta library controls
- **Control Documents**: `get_control_documents` for documents associated with controls
- **Control Details**: `get_control_by_id` for specific control information
- **Framework Details**: `get_framework_by_id` for specific framework information
- **Risk Details**: `get_risk_by_id` for specific risk scenario information
- **Integration Listing**: `get_integrations` for connected integrations
- **Integration Details**: `get_integration_by_id` for specific integration information
- **Vendor Listing**: `get_vendors` for all vendors
- **Vendor Details**: `get_vendor_by_id` for specific vendor information
- **Document Listing**: `get_documents` for all compliance documents
- **Document Details**: `get_document_by_id` for specific document information
- **Document Controls**: `get_document_controls` for controls associated with documents
- **Document Links**: `get_document_links` for external references in documents
- **Document Uploads**: `get_document_uploads` for file uploads attached to documents
- **Document Downloads**: `download_document_file` for intelligently downloading files (text content for readable files, metadata for binary files)
- **Policy Listing**: `get_policies` for all organizational policies
- **Policy Details**: `get_policy_by_id` for specific policy information
- **Discovered Vendors**: `get_discovered_vendors` for automatically discovered vendors
- **Discovered Vendor Accounts**: `get_discovered_vendor_accounts` for detailed vendor account information
- **Group Listing**: `get_groups` for all organizational groups
- **Group Details**: `get_group_by_id` for specific group information
- **Group Membership**: `get_group_people` for people in specific groups
- **People Listing**: `get_people` for all people in the organization
- **Person Details**: `get_person_by_id` for specific person information
- **Vulnerability Listing**: `get_vulnerabilities` for all detected vulnerabilities
- **Vulnerability Details**: `get_vulnerability_by_id` for specific vulnerability information
- **Vulnerability Remediations**: `get_vulnerability_remediations` for tracking remediation efforts
- **Vulnerable Assets**: `get_vulnerable_assets` for assets affected by vulnerabilities
- **Vulnerable Asset Details**: `get_vulnerable_asset_by_id` for specific asset vulnerability information

### ❌ **Negative Tests**

- **Programming Questions**: Should NOT call any Vanta tools
- **Code Debugging**: Should NOT call any Vanta tools

## Sample Output

```
🧪 Vanta MCP Server Tool Evaluation
====================================

📝 Test: Should call get_tests with AWS filter and NEEDS_ATTENTION status
💬 Prompt: "What security issues do I have in my AWS infrastructure?"
🎯 Expected Tool: get_tests
✅ PASS: Correctly called get_tests
✅ Parameters match expected values
📋 Called with: {
  "statusFilter": "NEEDS_ATTENTION",
  "integrationFilter": "aws"
}

📊 Final Results
================
✅ Passed: 39/39 tests
❌ Failed: 0/39 tests
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

The goal is to maintain high confidence that AI assistants will use the Vanta MCP Server correctly for compliance and security management tasks.
