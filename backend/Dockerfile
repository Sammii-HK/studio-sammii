FROM node:latest

WORKDIR /app/backend

COPY ./tsconfig.json /app/backend/tsconfig.json
COPY ./tsconfig.server.json /app/backend/tsconfig.server.json
COPY ./medusa-config.js /app/backend/medusa-config.js

COPY ./package.json /app/backend/package.json
COPY ./yarn.lock /app/backend/yarn.lock
RUN yarn install --production --mount=type=cache


COPY ./src /app/backend/src
RUN yarn start

# RUN npm install -g npm@latest

# RUN npm install sharp

# RUN npm install -g gatsby-cli

# RUN npm install --loglevel=error

# RUN npm run build &> /dev/null

# CMD [ "gatsby", "develop", "-H", "0.0.0.0",  "-p", "7000" ]

CMD [ "node", "7000" ]
