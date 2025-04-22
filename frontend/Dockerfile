# syntax=docker/dockerfile:1
ARG NODE_VERSION=23.11.0

FROM node:${NODE_VERSION}-alpine

# Set working directory
WORKDIR /usr/src/app

# Create a system user to run the app (non-root) and own the app files
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy only package files first to leverage caching
COPY package*.json ./

# Install dependencies with cache mount
RUN --mount=type=cache,target=/root/.npm \
    npm ci

# Copy the rest of the app source code into the container
COPY . .

# Fix permissions: give appuser write access to the working directory
RUN chown -R appuser:appgroup /usr/src/app

# Switch to non-root user
USER appuser

# Expose port (Vite default)
EXPOSE 3000

# Run dev server (change this to "build" + "preview" if you're building for prod)
CMD ["npm", "run", "dev"]