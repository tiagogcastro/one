FROM node:16.17

WORKDIR /one-api

COPY package*.json .
RUN npm install
COPY . .
CMD npm build

CMD docker compose --env-file .env up -d
CMD npm run prisma migrate dev

CMD npm start