FROM node:16.17

RUN mkdir /one-api
VOLUME /one-api
WORKDIR /one-api

ENV PORT 8080
ENV HOST 0.0.0.0

COPY package*.json ./
RUN npm install
COPY . .

RUN npm cache clean
RUN npm install -g reflect-metadata

RUN npm run build

CMD docker compose --env-file .env up -d
RUN npm run prisma migrate dev

CMD npm start
