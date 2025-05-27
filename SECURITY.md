# Security Policy

## Supported Versions

We actively support the following versions with security updates:

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

We take security seriously and appreciate responsible disclosure of security vulnerabilities.

### How to Report

**Please do NOT report security vulnerabilities through public GitHub issues.**

Instead, please report security vulnerabilities by emailing: **security@vanta.com**

Include the following information in your report:

- Description of the vulnerability
- Steps to reproduce the issue
- Potential impact
- Suggested fix (if available)
- Your contact information

### What to Expect

- **Acknowledgment**: We will acknowledge receipt of your report within 48 hours
- **Initial Response**: We will provide an initial response within 5 business days
- **Updates**: We will keep you informed of our progress towards fixing the issue
- **Resolution**: We aim to resolve critical security issues within 30 days

### Security Best Practices

When using the Vanta MCP Server:

#### API Key Security
- **Never commit API keys** to version control
- **Use environment variables** to store sensitive credentials
- **Rotate API keys** regularly
- **Restrict API key permissions** to minimum required scope

#### Network Security
- **Use HTTPS** for all API communications (handled automatically)
- **Monitor network traffic** for unusual patterns
- **Implement rate limiting** in production environments

#### Access Control
- **Limit access** to the MCP server to authorized users only
- **Use proper authentication** mechanisms in your client applications
- **Log access attempts** for security monitoring

### Known Security Considerations

#### Environment Variables
- The server requires `VANTA_API_KEY` environment variable
- Ensure this is properly secured in your deployment environment
- Consider using secret management systems in production

#### Data Handling
- The server processes compliance and security data
- Ensure data is handled according to your organization's security policies
- Be aware of data residency requirements when choosing regions

#### Dependencies
- We regularly update dependencies to address security vulnerabilities
- Monitor security advisories for dependencies
- Use `yarn audit` to check for known vulnerabilities

### Security Headers

The MCP server automatically includes security headers:
- `x-vanta-is-mcp: true` for API identification
- `Authorization: Bearer <token>` for authentication

### Vulnerability Disclosure Timeline

1. **Day 0**: Vulnerability reported
2. **Day 1-2**: Acknowledgment sent
3. **Day 3-5**: Initial assessment and response
4. **Day 6-30**: Development and testing of fix
5. **Day 30+**: Release of patched version
6. **Day 45**: Public disclosure (if appropriate)

### Security Updates

Security updates will be:
- Released as patch versions (e.g., 1.0.1)
- Documented in CHANGELOG.md
- Announced through GitHub releases
- Tagged with security labels

### Contact

For any security-related questions or concerns:
- Email: security@vanta.com
- For general questions: support@vanta.com

Thank you for helping keep Vanta MCP Server secure!