FROM node:alpine

WORKDIR /one-api

ENV DATABASE_URL=postgres://tg-db:tgdb1@34.170.169.172:5432/one-db

COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 8080

RUN npm run build
 
RUN echo "docker-compose --env-file .env up -d"
RUN ["npm", "run", "prisma", "migrate", "deploy"]
RUN ["npm", "run", "prisma", "generate"]

CMD ["npm", "start"]
