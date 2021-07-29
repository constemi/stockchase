[![Build Status](https://travis-ci.org/NoQuarterTeam/fullstack-boilerplate.svg?branch=master)](https://travis-ci.org/NoQuarterTeam/fullstack-boilerplate)

# StockChase

## Typescript + React + Graphql

Comes with user authentication included

- [React](https://github.com/facebook/react)
- [TypeGraphQL](https://github.com/19majkel94/type-graphql)
- [TypeORM](https://github.com/typeorm/typeorm)
- Postgres
- TypeScript
- Eslint
- Graphql Code Generator
- Apollo Client
- Apollo Server
- Express
- Redis
- Customizable Theme
- Dark mode
- React hooks
- Sendgrid SMTP
- Sentry
- Chakra UI
- React hook form
- Lerna Monorepo

& many more tasty treats

## Get Started

**Must have node, yarn/npm, postgres and redis installed and setup locally**

1. `git clone https://github.com/constemi/stockchase.git`
2. `yarn install`
3. `createdb {dbName}` (must have postgres setup locally)
4. `cd packages/api && yarn watch`
5. `cd packages/web && yarn start`

### For mailers

- Create a Sendgrid account and set a SENDGRID_API_KEY environment variable in .env
- Create templates for each email you want to send and use the templateId in the corresponding mailer class

### For error tracing

- Create a Sentry account + project for each package and add the DSN to the web config and the api env variables
