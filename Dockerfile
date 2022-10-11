FROM node:16 AS builder

ENV NODE_ENV=development
WORKDIR /usr/src/app
COPY . .
RUN npm i -w api
RUN npm run build -w api

FROM node:16-stretch-slim AS runner
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm i --frozen-lockfile --production
COPY --from=builder /usr/src/app/projects/api/dist ./dist
CMD NODE_ENV=production node dist