FROM node:24-alpine AS builder

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

FROM node:24-alpine AS production

ENV NODE_ENV=production
ENV BROWSER_EXECUTABLE_PATH=/usr/bin/chromium-browser
ENV APP_PORT=3000

RUN apk add --no-cache chromium nss freetype freetype-dev harfbuzz ca-certificates tini

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

COPY --from=builder /app/package.json /app/yarn.lock ./

RUN yarn install --production --frozen-lockfile

COPY --from=builder --chown=appuser:appgroup /app/dist ./dist

USER appuser

EXPOSE $APP_PORT

ENTRYPOINT ["/sbin/tini", "--"]

CMD ["yarn", "prod"]