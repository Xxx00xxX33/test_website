FROM node:20-bookworm-slim AS build
WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 make g++ \
  && rm -rf /var/lib/apt/lists/*

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

COPY package.json package-lock.json ./
COPY patches ./patches
RUN npm install --include=dev

COPY . .
ENV NODE_OPTIONS=--max-old-space-size=4096
RUN npm run build

FROM node:20-bookworm-slim AS runner
WORKDIR /app

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

COPY --from=build /app ./

EXPOSE 1337

CMD ["npm", "run", "start"]
