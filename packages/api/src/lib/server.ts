import 'reflect-metadata'
import 'dotenv/config'
import express from 'express'
import helmet from 'helmet'
import http from 'http'
import chalk from 'chalk'
import morgan from 'morgan'
import { PORT } from './config'

export class Server {
  private readonly _app: express.Application
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

  start(): void {
    this._http_server.listen(PORT, () =>
      this.logger.info(`Server started at http://localhost:${PORT} 🚀` + '\n'),
    )
  }
}
