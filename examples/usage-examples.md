# Usage Examples

This document provides practical examples of using the Vanta MCP Server tools.

## Setup Examples

### Claude Desktop Configuration

Add this to your Claude Desktop MCP configuration file:

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

### Local Development

```bash
# Install the package
npm install -g vanta-mcp-server

# Set environment variables
export VANTA_API_KEY="your_api_key_here"
export REGION="us"

# Run the server
vanta-mcp-server
```

## Tool Usage Examples

### 1. Security Compliance Review

**Scenario**: Review all failing security tests for AWS infrastructure

```json
{
  "tool": "get_tests",
  "arguments": {
    "statusFilter": "NEEDS_ATTENTION",
    "integrationFilter": "aws",
    "pageSize": 50
  }
}
```

**Follow-up**: Get detailed information about failing entities

```json
{
  "tool": "get_test_entities", 
  "arguments": {
    "testId": "aws-security-groups-open-to-world",
    "entityStatus": "FAILING"
  }
}
```

### 2. SOC2 Audit Preparation

**Scenario**: Gather all SOC2 compliance information

```json
{
  "tool": "get_frameworks",
  "arguments": {
    "pageSize": 100
  }
}
```

```json
{
  "tool": "get_framework_controls",
  "arguments": {
    "frameworkId": "soc2",
    "pageSize": 100
  }
}
```

```json
{
  "tool": "get_tests",
  "arguments": {
    "frameworkFilter": "soc2",
    "statusFilter": "OK",
    "pageSize": 100
  }
}
```

### 3. Infrastructure Maintenance Window

**Scenario**: Temporarily deactivate tests during maintenance

```json
{
  "tool": "deactivate_test_entity",
  "arguments": {
    "testId": "aws-ec2-instance-monitoring",
    "entityId": "i-1234567890abcdef0",
    "deactivateReason": "Scheduled maintenance window for security updates",
    "deactivateUntil": "2024-02-15T10:00:00Z"
  }
}
```

### 4. Multi-Cloud Security Review

**Scenario**: Review security across multiple cloud providers

```json
{
  "tool": "get_tests",
  "arguments": {
    "integrationFilter": "aws",
    "statusFilter": "NEEDS_ATTENTION",
    "pageSize": 25
  }
}
```

```json
{
  "tool": "get_tests",
  "arguments": {
    "integrationFilter": "azure",
    "statusFilter": "NEEDS_ATTENTION", 
    "pageSize": 25
  }
}
```

```json
{
  "tool": "get_tests",
  "arguments": {
    "integrationFilter": "gcp",
    "statusFilter": "NEEDS_ATTENTION",
    "pageSize": 25
  }
}
```

### 5. Compliance Framework Comparison

**Scenario**: Compare requirements across different frameworks

```json
{
  "tool": "get_framework_controls",
  "arguments": {
    "frameworkId": "soc2"
  }
}
```

```json
{
  "tool": "get_framework_controls", 
  "arguments": {
    "frameworkId": "fedramp"
  }
}
```

```json
{
  "tool": "get_framework_controls",
  "arguments": {
    "frameworkId": "ccpa"
  }
}
```

## Common Workflows

### Security Incident Response

1. **Identify affected systems**:
   ```json
   {
     "tool": "get_tests",
     "arguments": {
       "statusFilter": "NEEDS_ATTENTION",
       "integrationFilter": "aws"
     }
   }
   ```

2. **Get detailed entity information**:
   ```json
   {
     "tool": "get_test_entities",
     "arguments": {
       "testId": "identified-test-id",
       "entityStatus": "FAILING"
     }
   }
   ```

3. **Temporarily suppress alerts** (if needed during remediation):
   ```json
   {
     "tool": "deactivate_test_entity",
     "arguments": {
       "testId": "test-id",
       "entityId": "entity-id", 
       "deactivateReason": "Security incident remediation in progress",
       "deactivateUntil": "2024-02-10T18:00:00Z"
     }
   }
   ```

### Audit Evidence Collection

1. **Get framework overview**:
   ```json
   {
     "tool": "get_frameworks",
     "arguments": {}
   }
   ```

2. **Collect passing tests for evidence**:
   ```json
   {
     "tool": "get_tests",
     "arguments": {
       "frameworkFilter": "soc2",
       "statusFilter": "OK",
       "pageSize": 100
     }
   }
   ```

3. **Document any exceptions**:
   ```json
   {
     "tool": "get_tests",
     "arguments": {
       "frameworkFilter": "soc2", 
       "statusFilter": "DEACTIVATED"
     }
   }
   ```

## Error Handling

### Common Error Scenarios

1. **Invalid API Key**:
   ```json
   {
     "error": "Authentication failed",
     "message": "Invalid or missing VANTA_API_KEY"
   }
   ```

2. **Test Not Found**:
   ```json
   {
     "error": "Test not found", 
     "message": "Test ID 'invalid-test' does not exist"
   }
   ```

3. **Rate Limiting**:
   ```json
   {
     "error": "Rate limit exceeded",
     "message": "Too many requests, please try again later"
   }
   ```

### Best Practices

- **Always check response status** before processing results
- **Implement retry logic** for transient failures  
- **Use pagination** for large datasets
- **Cache results** when appropriate to reduce API calls
- **Validate input parameters** before making requests

## Advanced Usage

### Pagination Example

```javascript
async function getAllTests(filter) {
  let allTests = [];
  let pageCursor = null;
  
  do {
    const response = await mcpClient.callTool("get_tests", {
      ...filter,
      pageSize: 100,
      pageCursor
    });
    
    const data = JSON.parse(response.content[0].text);
    allTests.push(...data.tests);
    pageCursor = data.nextCursor;
  } while (pageCursor);
  
  return allTests;
}
```

### Batch Processing

```javascript
async function batchDeactivateEntities(entities, reason, until) {
  const results = [];
  
  for (const entity of entities) {
    try {
      const result = await mcpClient.callTool("deactivate_test_entity", {
        testId: entity.testId,
        entityId: entity.entityId,
        deactivateReason: reason,
        deactivateUntil: until
      });
      results.push({ entity, success: true, result });
    } catch (error) {
      results.push({ entity, success: false, error });
    }
  }
  
  return results;
}
```