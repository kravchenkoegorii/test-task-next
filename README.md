- **Video**: 

## Required Software
- **Node.js:** `20.14.0`
- **NPM:** `10.8.3`
- **Docker:** https://docs.docker.com/get-docker/
- **Docker Compose**: https://docs.docker.com/compose/install/

## How to run locally

### Build Next.js client
- Go to the project folder: `cd client`
- Install `node_modules`: `npm i`
- Define `.env` file with env variables like in `.env.example`
- Build client: `npm run build`
- Start client: `npm run start`

### Build Nest.js server
- Go to the project folder: `cd server`
- Install `node_modules`: `npm i`
- Define `env/.env.production` file with env variables like in `.env.example`
- Build client: `npm run build`
- Start client: `npm run start`


### Via docker-compose
- Install docker-compose
- Go to the root folder
- Start command: `docker-compose up -d`
- Finish command: `docker-compose down`