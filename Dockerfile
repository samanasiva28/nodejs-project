# Step 1: Build & Dependencies
FROM node:18-alpine AS base

WORKDIR /app

# Copy package files first
COPY package*.json ./

# Changed npm ci to npm install
RUN npm install --omit=dev

# Copy application source code and public assets
COPY server.js ./
COPY public/ ./public/

# Step 2: Production Execution
FROM node:18-alpine AS runner

WORKDIR /app

# Create a non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy built application from base stage
COPY --from=base /app /app

USER appuser

EXPOSE 3000

ENV PORT=3000
ENV NODE_ENV=production

CMD ["node", "server.js"]
