# Build context: the project root (see docker-compose.yml)
FROM node:22-bookworm-slim

WORKDIR /app

# Install dependencies first (better Docker layer cache)
COPY package.json package-lock.json ./
COPY backend/package.json backend/
COPY frontend/package.json frontend/
RUN npm ci -w frontend

COPY frontend frontend

WORKDIR /app/frontend
EXPOSE 3000

# Vite dev server, reachable from outside the container
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
