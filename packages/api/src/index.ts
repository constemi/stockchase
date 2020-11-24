import "reflect-metadata"
import "dotenv/config"
import * as Sentry from "@sentry/node"
import path from "path"
import express from "express"
import { ApolloServer } from "apollo-server-express"
import { buildSchema } from "type-graphql"
import { Container } from "typedi"
import jwt from "express-jwt"
import { useExpressServer, useContainer } from "routing-controllers"
import { ApolloServerLoaderPlugin } from "type-graphql-dataloader"
import { getConnection } from "typeorm"
import { Integrations } from "@sentry/tracing"
import {
  CORS_OPTIONS,
  RESOLVER_PATHS,
  JWT_AUTH,
  CONTROLLER_PATHS,
  SENTRY_DSN,
  IS_PRODUCTION,
} from "./lib/config"

Sentry.init({
  dsn: SENTRY_DSN,
  integrations: [new Integrations.Express()],
  enabled: IS_PRODUCTION,
  tracesSampleRate: 1.0,
})

import { ErrorInterceptor } from "./lib/globalMiddleware"
import { ExpressContext } from "./lib/types"
import { Server } from "./lib/server"
import { createDbConnection } from "./db"
import { formatResponse } from "./lib/formatResponse"

class FullstackBoilerplate extends Server {
  constructor() {
    super()
    this.init().catch((error) => {
      Sentry.captureException(error)
      this.logger.error(error)
    })
  }

  async init() {
    await this.setupDb()
    await this.setUpAuth()
    await this.setupApollo()
    await this.setupControllers()
    await this.setUpRoutes()
    this.start()
  }

  async setupDb() {
    await createDbConnection({ runMigrations: true })
    this.logger.info("DB ready")
  }

  async setUpAuth() {
    this.app.use(jwt(JWT_AUTH))
    this.app.use((err: any, _: any, __: any, next: any) => {
      if (err.name === "UnauthorizedError") next()
    })
    this.logger.info("Auth ready")
  }

  async setupApollo() {
    const schema = await buildSchema({
      container: Container,
      resolvers: [__dirname + RESOLVER_PATHS],
      globalMiddlewares: [ErrorInterceptor],
    })

    const apolloServer = new ApolloServer({
      context: ({ req, res }: ExpressContext) => ({ req, res }),
      plugins: [ApolloServerLoaderPlugin({ typeormGetConnection: getConnection })],
      formatResponse,
      introspection: true,
      playground: true,
      schema,
    })

    apolloServer.applyMiddleware({
      cors: CORS_OPTIONS,
      app: this.app,
    })
    this.logger.info("Apollo setup")
  }

  async setupControllers() {
    useContainer(Container)
    useExpressServer(this.app, {
      controllers: [__dirname + CONTROLLER_PATHS],
    })
    this.logger.info("Controllers ready")
  }
  async setUpRoutes() {
    this.app
      .use(express.static(path.join(__dirname, "../public")))
      .get("*", (_, res) => res.sendFile(path.join(__dirname, "../public/index.html")))
    this.logger.info("Routes ready")
  }
}

new FullstackBoilerplate()
