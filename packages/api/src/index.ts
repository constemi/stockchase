import 'reflect-metadata'
import 'dotenv/config'
import * as Sentry from '@sentry/node'
import jwt from 'express-jwt'
import WebSocket from 'ws'
import Redis from 'ioredis'
import path from 'path'
import express from 'express'
import depthLimit from 'graphql-depth-limit'
import { Integrations } from '@sentry/tracing'
import { getConnection } from 'typeorm'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { RedisPubSub } from 'graphql-redis-subscriptions'
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
  FINNHUB_KEY,
} from './lib/config'

Sentry.init({
  dsn: SENTRY_DSN,
  integrations: [new Integrations.Express()],
  enabled: IS_PRODUCTION,
  tracesSampleRate: 1.0,
})

import { ExpressContext } from './lib/types'
import { Server } from './lib/server'
import { redisOptions } from './lib/redis'
import { createDbConnection } from './db'
import { formatResponse } from './lib/formatResponse'
import { ErrorInterceptor } from './middleware/apolloMiddleware'
import { ComplexityMiddleware } from './middleware/complexityMiddleware'

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
    await this.setupRoutes()
    this.start()
  }

  async setupDb() {
    await createDbConnection({ runMigrations: true })
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
    const pubSub = new RedisPubSub({
      publisher: new Redis(redisOptions),
      subscriber: new Redis(redisOptions),
    })

    const schema = await buildSchema({
      container: Container,
      resolvers: [__dirname + RESOLVER_PATHS],
      globalMiddlewares: [ErrorInterceptor],
      pubSub,
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
      subscriptions: {
        path: '/subscriptions',
        onConnect: () => this.logger.info('Connected to websocket'),
      },
    })

    apolloServer.installSubscriptionHandlers(this.httpServer)
    apolloServer.applyMiddleware({
      cors: CORS_OPTIONS,
      app: this.app,
    })
    this.logger.info('Apollo setup')
  }

  async setupControllers() {
    useContainer(Container)
    useExpressServer(this.app, {
      controllers: [__dirname + CONTROLLER_PATHS],
    })
    this.logger.info('Controllers ready')
  }

  async setupRoutes() {
    this.wss.path = '/echo'
    this.wss.on('connection', (client) => {
      client.send('connected')

      client.on('message', (msg: string) => {
        client.send(`received ${msg}`)
      })

      const finnhub = new WebSocket(`wss://ws.finnhub.io?token=${FINNHUB_KEY}`)
      finnhub.addEventListener('open', () => {
        finnhub.send(JSON.stringify({ type: 'subscribe', symbol: 'AAPL' }))
      })
      finnhub.addEventListener('message', (event) => {
        client.send(event.data)
      })
    })

    this.app
      .use(express.static(path.join(__dirname, '../public')))
      .get('*', (_, res) => res.sendFile(path.join(__dirname, '../public/index.html')))
    this.logger.info('Routes ready')
  }
}

new FullstackBoilerplate()
