## Description

```bash
Project is an Authentication/Authorization Api with Postgres Streaming Replication
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# edit/rename .env file with .env.example

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Database

```bash
# check database ports on your local machine before run it
$ docker-compose up -d
```

## Migrations

```bash
# edit/rename .env file with .env.example

# generate migration script
$ npm run migration:generate src/data/database/migrations/nome_da_migracao

# run migration scripts
$ npm run migration:run

# revert migration
$ npm run migration:revert

# seeding database
$ npm run db:seed
```

## References

```bash
# TypeORM set up read/write replication.
https://typeorm.io/multiple-data-sources#replication

## All schema update and write operations are performed using master server. All simple queries performed by find methods or select query builder are using a random slave instance. All queries performed by query method are performed using the master instance.

# Postgres Streaming Replication
https://hub.docker.com/r/nebirhos/postgres-replication
```
