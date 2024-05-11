
FROM node:18-alpine
# installs pnpm
RUN corepack enable

WORKDIR /app/storefront

COPY ./package.json /app/storefront/package.json
COPY ./pnpm-lock.yaml /app/storefront/pnpm-lock.yaml
RUN pnpm install

COPY ./public /app/storefront/public
COPY ./src /app/storefront/src
COPY next-env.d.ts /app/storefront/next-env.d.ts
COPY next-sitemap.js /app/storefront/next-sitemap.js
COPY next.config.js /app/storefront/next.config.js
COPY postcss.config.js /app/storefront/postcss.config.js
COPY store-config.js /app/storefront/store-config.js
COPY store.config.json /app/storefront/store.config.json
COPY tailwind.config.js /app/storefront/tailwind.config.js
COPY tsconfig.json /app/storefront/tsconfig.json

CMD pnpm build && pnpm start