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

## Migrations

```bash
# edit/rename .env files with .env.example
- .env

# generate migration script
$ npm run migration:generate src/data/database/migrations/nome_da_migracao

# run migration scripts
$ npm run migration:run

# revert migration
$ npm run migration:revert

# seeding database
$ npm run db:seed
```

## Stay in touch

- Author - [Willian Souza](mailto:wrdigital@hotmail.com)
- Contact - [LinkedIn](https://www.linkedin.com/in/willian-robert-a88a0358)

## License

Nest is [MIT licensed](LICENSE).
