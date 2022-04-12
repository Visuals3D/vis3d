FROM node:17-alpine AS builder

WORKDIR /app

COPY ./package.json /app/package.json

COPY ./package-lock.json /app/package-lock.json

RUN npm install

COPY ./ /app

RUN npm run build

FROM node:17-alpine AS final

WORKDIR /app

ENV NODE_ENV=production

RUN apk add --no-cache tini

COPY package*.json /app/

RUN npm install --only=production

COPY --from=builder /app/dist /app/dist

ENTRYPOINT [ "node", "/app/dist/src/index.js" ]
