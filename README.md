# Nou One BACKEND API

1. [Requirements](#requirements)
2. [Installation](#installing-on-local-machine)
3. [Build Setup](#build-setup)
4. [Official Documentation](#official-documentation)

## Requirements

1. Node.js installed
2. Docker with Docker compose (NOT NECESSARY) or Postgres

## Installing on local machine

1. Clone the repository.
2. Change directory to the location of this repository.
3. Create a `.env` file using the included `.env.example` as an example.

## Build Setup

```bash
# install dependencies
$ npm install

# Run batabase using docker
$ docker compose up -d

# install dependencies
$ npm run prisma migrate dev
# or
$ yarn prisma migrate dev

# serve on localhost:3333
 $ npm run dev
# or
 $ yarn dev

# build for production and launch server
$ npm build
$ npm start
```