FROM node:alpine

WORKDIR /one-api

COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 8080

RUN npm run build

RUN echo "docker-compose --env-file .env up -d"
RUN ["npm", "run", "prisma", "generate"]
RUN ["npm", "run", "prisma", "migrate", "dev"]

CMD ["npm", "start"]
