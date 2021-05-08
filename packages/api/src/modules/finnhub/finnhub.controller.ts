import * as finnhub from 'finnhub'
import { Post, Body, JsonController, UseBefore } from 'routing-controllers'
import { AuthMiddleware } from '../../middleware/expressAuthMiddlewate'
import { FINNHUB_KEY } from '../../lib/config'

interface CandlesInput {
  symbol: string
  resolution: string
  intervalStart: number
  intervalEnd: number
}

@JsonController()
export class FinnhubController {
  private readonly finnhubClient: finnhub.DefaultApi

  constructor() {
    const api_key = finnhub.ApiClient.instance.authentications['api_key']
    api_key.apiKey = FINNHUB_KEY
    this.finnhubClient = new finnhub.DefaultApi()
  }

  @Post('/candles')
  @UseBefore(AuthMiddleware)
  candles(@Body() body: CandlesInput) {
    const { symbol, resolution, intervalStart, intervalEnd } = body
    const data = this.finnub.stockCandles(symbol, resolution, intervalStart, intervalEnd, { format: 'csv' })
    return data
  }

  protected get finnub(): finnhub.DefaultApi {
    return this.finnhubClient
  }
}
