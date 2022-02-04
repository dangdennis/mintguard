# Server

## setup and development

1. `npm install`
2. `npm run dev` in one terminal to run server
3. `npm run tsc:dev` in a second terminal for typechecker

## production

1. deploy to fly.io with dockerfile

# to test the production dockerfile

1. add database url inside the docker-compose.yml file at MINTGUARD_DATABASE_URL
2. boot up docker (docker desktop)
3. `docker-compose up`
