
FROM node:18-alpine

WORKDIR /app/storefront

COPY ./package.json /app/storefront/package.json
COPY ./yarn.lock /app/storefront/yarn.lock
RUN yarn install

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

ARG MEDUSA_BACKEND_URL
ENV NEXT_PUBLIC_MEDUSA_BACKEND_URL $MEDUSA_BACKEND_URL

CMD yarn build && yarn start