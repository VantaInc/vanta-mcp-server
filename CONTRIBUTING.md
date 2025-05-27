# Contributing to Vanta MCP Server

Thank you for your interest in contributing to the Vanta MCP Server! We welcome contributions from the community and are grateful for your help in making this project better.

## Code of Conduct

This project adheres to our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## Getting Started

### Prerequisites

- Node.js 18 or higher
- Yarn package manager
- Git

### Development Setup

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/your-username/vanta-mcp-server.git
   cd vanta-mcp-server
   ```

3. **Install dependencies**:
   ```bash
   yarn install
   ```

4. **Set up your environment**:
   ```bash
   cp .env.example .env
   # Edit .env with your Vanta API key for testing
   ```

5. **Build the project**:
   ```bash
   yarn build
   ```

## Development Workflow

### Making Changes

1. **Create a feature branch** from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following our coding standards
3. **Test your changes** thoroughly
4. **Commit your changes** with clear, descriptive messages

### Code Style

We use ESLint and Prettier to maintain consistent code style:

```bash
# Check code formatting
yarn format:check

# Auto-fix formatting issues
yarn format

# Run linting
yarn lint

# Auto-fix linting issues
yarn lint:fix

# Run all fixes
yarn fix
```

### Commit Messages

Follow conventional commit format:

- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation changes
- `style:` for formatting changes
- `refactor:` for code refactoring
- `test:` for adding tests
- `chore:` for maintenance tasks

Examples:
```
feat: add get_documents tool for document management
fix: handle API timeout errors gracefully
docs: update README with new tool examples
```

### Testing

While we don't have a full test suite yet, please:

1. **Test your changes manually** with the eval script:
   ```bash
   yarn eval
   ```

2. **Ensure your changes don't break existing functionality**
3. **Test with different API scenarios** (success, error, timeout)

## Submitting Changes

### Pull Request Process

1. **Update documentation** if needed (README, API docs, etc.)
2. **Run all quality checks**:
   ```bash
   yarn lint
   yarn format:check
   yarn typecheck
   yarn build
   ```

3. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

4. **Create a Pull Request** on GitHub with:
   - Clear title describing the change
   - Detailed description of what was changed and why
   - Reference any related issues
   - Screenshots or examples if applicable

### Pull Request Guidelines

- **Keep PRs focused** - One feature or fix per PR
- **Write clear descriptions** - Explain what and why
- **Update documentation** - Keep docs in sync with code changes
- **Follow coding standards** - Ensure linting and formatting pass
- **Be responsive** - Address review feedback promptly

## Types of Contributions

### 🐛 Bug Reports

When filing a bug report, please include:

- **Clear description** of the issue
- **Steps to reproduce** the problem
- **Expected vs actual behavior**
- **Environment details** (Node.js version, OS, etc.)
- **Error messages** and stack traces if applicable

### ✨ Feature Requests

For new features:

- **Describe the use case** - What problem does this solve?
- **Provide examples** - How would this feature be used?
- **Consider alternatives** - Are there other ways to solve this?
- **Check existing issues** - Has this been requested before?

### 📚 Documentation

Documentation improvements are always welcome:

- Fix typos or unclear explanations
- Add examples and use cases
- Improve API documentation
- Create tutorials or guides

### 🔧 Code Contributions

Areas where we welcome code contributions:

- **New MCP tools** for additional Vanta API endpoints
- **Error handling improvements**
- **Performance optimizations**
- **Input validation enhancements**
- **Logging and debugging features**

## Development Guidelines

### Architecture Principles

- **Modular design** - Keep tools in separate files by domain
- **Consistent patterns** - Follow existing tool structure
- **Type safety** - Use TypeScript strictly
- **Error handling** - Provide clear error messages
- **Validation** - Use Zod schemas for input validation

### Adding New Tools

When adding a new MCP tool:

1. **Create the tool in the appropriate operations file**
2. **Follow the existing pattern**:
   - Zod schema for input validation
   - Tool definition with name, description, parameters
   - Implementation function with proper error handling
   - Export both schema and tool definition

3. **Register the tool** in `src/index.ts`
4. **Update documentation** in README.md
5. **Add examples** of usage

### API Integration

When working with Vanta API:

- **Use the existing `baseApiUrl()` function** for region support
- **Include authentication headers** via `createAuthHeaders()`
- **Handle errors gracefully** with meaningful messages
- **Follow REST conventions** for endpoint naming
- **Document all parameters** with clear descriptions

## Getting Help

- **GitHub Issues** - For bugs and feature requests
- **GitHub Discussions** - For questions and community discussion
- **Email** - support@vanta.com for sensitive issues

## Recognition

Contributors will be recognized in:

- **CHANGELOG.md** - For significant contributions
- **GitHub contributors list** - Automatic recognition
- **Release notes** - For major features or fixes

Thank you for contributing to Vanta MCP Server! 🎉