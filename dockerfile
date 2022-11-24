FROM node:alpine

WORKDIR /one-api

ENV DATABASE_URL=postgres://nou-one-api:nou-one-api@localhost:5432/one-db?host=/cloudsql/nou-one:us-central1:one-api

COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 8080

RUN npm run build
 
RUN echo "docker-compose --env-file .env up -d"
RUN ["npm", "run", "prisma", "migrate", "deploy"]
RUN ["npm", "run", "prisma", "generate"]

CMD ["npm", "start"]
