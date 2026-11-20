# Build context: the project root (see docker-compose.yml)
FROM node:22-bookworm-slim

WORKDIR /app

# Install dependencies first (better Docker layer cache)
COPY package.json package-lock.json ./
COPY backend/package.json backend/
COPY frontend/package.json frontend/
RUN npm ci -w backend

COPY backend backend

WORKDIR /app/backend
EXPOSE 3001

# Runs migrations + seeders, then starts the API
CMD ["sh", "./docker-entrypoint.sh"]
