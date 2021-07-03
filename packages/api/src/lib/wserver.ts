import WebSocket from 'ws'
import * as Sentry from '@sentry/node'
import get from 'lodash/get'
import { Server as IOServer } from 'socket.io'
import { Server } from './server'
import { FINNHUB_KEY, WEB_ORIGIN } from './config'

const timestamp = () => new Date().toISOString().replace('T', ' ').substr(0, 19)

export class ServerWithWebsocket extends Server {
  private readonly _socketio: IOServer
  constructor() {
    super()
    this._socketio = new IOServer(this.httpServer, {
      cors: { origin: WEB_ORIGIN, methods: ['GET', 'POST'], credentials: true },
    })
  }

  public async setupWebsocket() {
    let client: WebSocket | undefined
    let connecting = false
    let backoff = 250

    // exchange connection
    const init = () => {
      connecting = false
      if (client !== undefined) {
        client.removeAllListeners()
      }
      client = new WebSocket(`wss://ws.finnhub.io?token=${FINNHUB_KEY}`)
      client.on('ping', () => {
        client?.send('pong')
      })
      client.on('open', () => {
        this.logger.info(`${timestamp()} :: connected to finnhub`)
      })
      client.on('message', (event: any) => {
        const data = JSON.parse(event)
        const room = get(data, 'data[0].s')
        if (room) {
          this.socketio.to(room).emit('message', data)
        }
      })
      client.on('close', (code) => {
        if (code !== 1000) {
          if (connecting === false) {
            // abnormal closure
            backoff = backoff === 8000 ? 250 : backoff * 2
            setTimeout(() => init(), backoff)
            connecting = true
          }
        }
        this.logger.error(`${timestamp()} :: socket was closed attempting reconnection...`)
      })
      client.on('error', (error) => {
        if (error.name === 'ECONREFUSED') {
          if (connecting === false) {
            // abnormal closure
            backoff = backoff === 8000 ? 250 : backoff * 2
            setTimeout(() => init(), backoff)
            connecting = true
          }
        }
        Sentry.captureException(error)
        this.logger.error(`${timestamp()} :: socket error, attempting reconnection...`)
      })
    }
    init()

    // browser connection
    this.socketio.on('connection', (socket) => {
      socket.send('a user connected')

      socket.on('subscribe', (symbol: string) => {
        socket.join(symbol)
        client?.send(JSON.stringify({ type: 'subscribe', symbol }))
        console.log(socket.id, socket.rooms.size, symbol)
      })

      socket.on('unsubscribe', (symbol) => {
        socket.leave(symbol)
        client?.send(JSON.stringify({ type: 'unsubscribe', symbol }))
        console.log(socket.id, socket.rooms.size, symbol)
      })
    })

    this.logger.info('Tick data ready')
  }

  protected get socketio(): IOServer {
    return this._socketio
  }
}
