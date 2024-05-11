FROM node:18-alpine
# installs pnpm
RUN corepack enable

WORKDIR /app/backend

COPY ./tsconfig.json /app/backend/tsconfig.json
COPY ./tsconfig.server.json /app/backend/tsconfig.server.json
COPY ./medusa-config.js /app/backend/medusa-config.js

COPY ./package.json /app/backend/package.json
COPY ./pnpm-lock.yaml /app/backend/pnpm-lock.yaml
RUN pnpm i --node-linker=hoisted

COPY ./src /app/backend/src
RUN pnpm run build

CMD pnpm medusa migrations run && pnpm medusa start
