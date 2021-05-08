import 'reflect-metadata'
import 'dotenv/config'

import WebSocket from 'ws'
import express from 'express'
import helmet from 'helmet'
import http from 'http'
import chalk from 'chalk'
import morgan from 'morgan'
import * as finnhub from 'finnhub'
import { PORT, FINNHUB_KEY } from './config'

export class Server {
  private readonly _app: express.Application
  private readonly _wss: WebSocket.Server
  private readonly _fhub: finnhub.DefaultApi
  private readonly _http_server: http.Server

  readonly logger: {
    info: (message: string) => void
    error: (message: string) => void
  }

  constructor() {
    this._app = express()
      .enable('trust proxy')
      .use(
        helmet({
          contentSecurityPolicy: false,
        }),
      )
      .use(
        morgan('dev', {
          skip: (req) => req.method === 'OPTIONS',
          stream: { write: (message) => console.log(message + '\n\n') },
        }),
      )

    this._http_server = http.createServer(this._app)
    this._wss = new WebSocket.Server({ server: this._http_server, port: 8080 })

    const api_key = finnhub.ApiClient.instance.authentications['api_key']
    api_key.apiKey = FINNHUB_KEY
    this._fhub = new finnhub.DefaultApi()

    this.logger = {
      info: this.info,
      error: this.error,
    }
  }

  protected error(message: string) {
    console.log(`[${chalk.red('ERROR')}] `, message)
  }

  protected info(message: string) {
    console.log(`[${chalk.blue('INFO')}] `, message)
  }

  protected get app(): express.Application {
    return this._app
  }

  protected get httpServer(): http.Server {
    return this._http_server
  }

  protected get wss(): WebSocket.Server {
    return this._wss
  }

  protected get fhub(): any {
    return this._fhub
  }

  start(): void {
    this._http_server.listen(PORT, () =>
      this.logger.info(`Server started at http://localhost:${PORT} 🚀` + '\n'),
    )
  }
}
