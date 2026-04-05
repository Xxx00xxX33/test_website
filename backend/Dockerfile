FROM node:20-alpine AS base
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Build
COPY . .
RUN npm run build

# Production image
FROM node:20-alpine AS runner
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
