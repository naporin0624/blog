# syntax=docker/dockerfile:1
FROM node:16 AS builder

ENV NODE_ENV=development
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm i
COPY . .
RUN npx ultra -r --filter "api" build


FROM node:16-stretch-slim AS runner
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
# NODE_ENV=productionにしてyarn install(npm install)するとdevDependenciesがインストールされません
RUN npm i
COPY --from=builder /app/projects/api/dist ./dist
CMD ["npm", "run", "start"]