# syntax=docker/dockerfile:1
ARG NODE_VERSION=23.11.0

FROM node:${NODE_VERSION}-alpine AS builder

# Set working directory
WORKDIR /usr/src/app

# Copy package files and install deps
COPY package*.json ./
COPY tsconfig.json ./
COPY prisma ./prisma
RUN npm ci

# Copy rest of source code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Compile TypeScript
RUN npm run build

# ---------------------
# Production Image
# ---------------------
FROM node:${NODE_VERSION}-alpine

# Create app user (non-root)
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Set working directory
WORKDIR /usr/src/app

# Copy only necessary artifacts from builder
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package.json ./package.json
COPY --from=builder /usr/src/app/prisma ./prisma

# Ensure runtime directories exist
RUN mkdir -p uploads encrypted_videos && \
    chown -R appuser:appgroup /usr/src/app

USER appuser

ENV NODE_ENV=production

EXPOSE 5050

CMD ["node", "dist/server.js"]