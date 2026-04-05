FROM node:20-bookworm-slim AS base
WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 make g++ \
  && rm -rf /var/lib/apt/lists/*

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Build
COPY . .
ENV NODE_OPTIONS=--max-old-space-size=4096
RUN npm run build

# Production image
FROM node:20-bookworm-slim AS runner
WORKDIR /app

ENV NODE_ENV=production

COPY --from=base /app/package.json ./
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/dist ./dist
COPY --from=base /app/build ./build
COPY --from=base /app/public ./public
COPY --from=base /app/src ./src
COPY --from=base /app/config ./config
COPY --from=base /app/database ./database

EXPOSE 1337

CMD ["npm", "run", "start"]
