
FROM node:latest

WORKDIR /app/storefront

COPY ./package.json /app/storefront/package.json
COPY ./yarn.lock /app/storefront/yarn.lock
RUN yarn install --production --mount=type=cache

COPY ./src /app/storefront/src
RUN yarn start

# RUN npm install -g npm@latest

# RUN npm install -g gatsby-cli

# RUN npm install sharp

# RUN npm install --loglevel=error

# ENTRYPOINT ["gatsby", "develop", "-H", "0.0.0.0", "-p", "8000" ]
ENTRYPOINT [ "node", "8000" ]
