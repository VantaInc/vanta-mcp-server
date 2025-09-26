# Build stage
FROM node:22-alpine AS builder

# Set the working directory in the container
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY yarn.lock ./

# Install all dependencies (including devDependencies for build)
RUN npm ci

# Copy source code and build configuration
COPY src/ ./src/
COPY tsconfig.json ./

# Build the TypeScript code
RUN npm run build

# Production stage
FROM node:22-alpine AS production

# Set the working directory in the container
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY yarn.lock ./

# Install only production dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy built application from builder stage
COPY --from=builder /app/build ./build

# Create a non-root user to run the application
RUN addgroup -g 1001 -S nodejs && \
    adduser -S vanta -u 1001 -G nodejs

# Change ownership of the app directory to the nodejs user
RUN chown -R vanta:nodejs /app
USER vanta

# Expose the port the app runs on
EXPOSE 3000

# Set environment variables
ENV MCP_MODE=http
ENV NODE_ENV=production

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

# Run the application
CMD ["node", "build/index.js"]
