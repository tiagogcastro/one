FROM node:alpine

WORKDIR /one-api

COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 8080

RUN npm run build

CMD ["docker", "compose", "--env-file .env", "up", "-d"]
CMD ["npm", "run", "prisma", "generate"]
CMD ["npm", "run", "prisma migrate", "dev"]

CMD ["npm", "start"]
