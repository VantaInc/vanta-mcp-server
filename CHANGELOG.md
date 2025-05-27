# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-01-XX

### Added
- Initial release of Vanta MCP Server
- Model Context Protocol (MCP) server implementation
- Support for Vanta API integration
- Test management tools:
  - `get_tests` - List all compliance tests with filtering
  - `get_test_entities` - Get entities for specific tests  
  - `deactivate_test_entity` - Temporarily deactivate test entities
- Framework management tools:
  - `get_frameworks` - List compliance frameworks
  - `get_framework_controls` - Get controls for specific frameworks
- Document management tools:
  - `upload_document` - Upload compliance documents
- Multi-region support (US, EU, AUS)
- TypeScript support with strict type checking
- Comprehensive documentation and examples
- CI/CD workflows for quality assurance
- Security policy and vulnerability reporting process

### Security
- Bearer token authentication for Vanta API
- Secure environment variable handling
- Input validation using Zod schemas
- Proper error handling to prevent information leakage

## [Unreleased]

### Planned
- Additional Vanta API endpoints
- Enhanced error handling and retry logic
- Caching mechanisms for improved performance
- Additional output formats and filtering options