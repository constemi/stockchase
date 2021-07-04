import 'reflect-metadata'
import 'dotenv/config'
import * as Eta from 'eta'
import * as Sentry from '@sentry/node'
import path from 'path'
import jwt from 'express-jwt'
import depthLimit from 'graphql-depth-limit'
import { Integrations } from '@sentry/tracing'
import { getConnection } from 'typeorm'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { Container } from 'typedi'
import { useExpressServer, useContainer } from 'routing-controllers'
import { ApolloServerLoaderPlugin } from 'type-graphql-dataloader'

import {
  CORS_OPTIONS,
  RESOLVER_PATHS,
  JWT_AUTH,
  CONTROLLER_PATHS,
  SENTRY_DSN,
  IS_PRODUCTION,
  WEB_ORIGIN,
} from './lib/config'

Sentry.init({
  dsn: SENTRY_DSN,
  integrations: [new Integrations.Express()],
  enabled: IS_PRODUCTION,
  tracesSampleRate: 1.0,
})

import { ExpressContext } from './lib/types'
import { addJobs } from './lib/worker'
import { ServerWithWebsocket } from './lib/wserver'
import { createDbConnection } from './db'
import { formatResponse } from './middleware/formatResponse'
import { ErrorInterceptor } from './middleware/apolloMiddleware'
import { ComplexityMiddleware } from './middleware/complexityMiddleware'

class FullstackBoilerplate extends ServerWithWebsocket {
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
    await this.setupWebsocket()
    await this.setupRoutes()
    this.start()
  }

  async setupDb() {
    await createDbConnection({ runMigrations: true })
    await addJobs()
    this.logger.info('DB ready')
  }

  async setUpAuth() {
    this.app.use(jwt(JWT_AUTH))
    this.app.use((err: any, _: any, __: any, next: any) => {
      if (err.name === 'UnauthorizedError') next()
    })
    this.logger.info('Auth ready')
  }

  async setupApollo() {
    const schema = await buildSchema({
      container: Container,
      resolvers: [__dirname + RESOLVER_PATHS],
      globalMiddlewares: [ErrorInterceptor],
    })

    const queryComplexityPlugin = {
      requestDidStart: ComplexityMiddleware(schema),
    }
    const DepthLimitRule = depthLimit(10)
    const apolloServer = new ApolloServer({
      context: ({ req, res }: ExpressContext) => ({ req, res }),
      plugins: [ApolloServerLoaderPlugin({ typeormGetConnection: getConnection }), queryComplexityPlugin],
      formatResponse,
      validationRules: [DepthLimitRule],
      introspection: true,
      playground: true,
      schema,
    })

    apolloServer.applyMiddleware({
      cors: CORS_OPTIONS,
      app: this.app,
    })
    this.logger.info('Apollo setup')
  }

  async setupControllers() {
    useContainer(Container)
    useExpressServer(this.app, {
      cors: {
        origin: WEB_ORIGIN,
        credentials: true,
      },
      routePrefix: '/v1',
      validation: true,
      controllers: [__dirname + CONTROLLER_PATHS],
    })
    this.logger.info('Controllers ready')
  }

  async setupRoutes() {
    this.app
      .engine('eta', Eta.renderFile)
      .set('view engine', 'eta')
      .set('views', path.join(__dirname, './pages'))
    this.logger.info('Routes ready')
  }
}

new FullstackBoilerplate()
