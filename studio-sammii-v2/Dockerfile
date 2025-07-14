FROM node:18-alpine

WORKDIR /app/backend

COPY ./package.json /app/backend/package.json
COPY ./package-lock.json /app/backend/package-lock.json
RUN npm ci

COPY ./medusa-config.ts /app/backend/medusa-config.ts
COPY ./tsconfig.json /app/backend/tsconfig.json
COPY ./jest.config.js /app/backend/jest.config.js
COPY ./instrumentation.ts /app/backend/instrumentation.ts
COPY ./src /app/backend/src

RUN npm run build

CMD npm run start 