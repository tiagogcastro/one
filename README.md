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
# 1 - install dependencies
$ npm install

# 2 - Envs
- Copy file .env.example and rename to .env
- Change environments values

# 3 - Run batabase using docker
$ docker compose --env-file .env up -d

# 4 - install dependencies
$ npm run prisma migrate dev
# or
$ yarn prisma migrate dev

# 5 - serve on localhost
$ npm run dev
# or
$ yarn dev
```