# Step 1: Build & Dependencies
FROM node:18-alpine AS base

WORKDIR /app

# Copy package files first to leverage Docker layer caching
COPY package*.json ./

# Install production dependencies only
RUN npm ci --only=production

# Copy application source code and public assets
COPY server.js ./
COPY public/ ./public/

# Step 2: Production Execution
FROM node:18-alpine AS runner

WORKDIR /app

# Create a non-root user for improved security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy built application from the base stage
COPY --from=base /app /app

USER appuser

EXPOSE 3000

ENV PORT=3000
ENV NODE_ENV=production

CMD ["node", "server.js"]
