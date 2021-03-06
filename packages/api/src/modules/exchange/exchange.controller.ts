import fetch from 'cross-fetch'
import { json } from 'body-parser'
import { Service } from 'typedi'
import { IsString, IsNumber } from 'class-validator'
import { Body, Post, Controller, UseBefore, BadRequestError } from 'routing-controllers'
import { AuthMiddleware } from '../../middleware/expressAuthMiddlewate'
import { FINNHUB_KEY, POLYGON_KEY } from '../../lib/config'

class OHLCRequestParams {
  @IsString()
  symbol: string
  @IsString()
  resolution: string
  @IsNumber()
  intervalStart: number
  @IsNumber()
  intervalEnd: number
}

class QuoteRequestParams {
  @IsString()
  symbol: string
}

class ProfileRequestParams {
  @IsString()
  symbol: string
}

class NewsRequestParams {
  @IsString()
  symbol: string
  @IsString()
  intervalStart: string
  @IsString()
  intervalEnd: string
}

@Service()
@Controller()
export class ExchangeController {
  @Post('/stock/candle')
  @UseBefore(AuthMiddleware)
  @UseBefore(json())
  async candles(@Body({ required: true }) body: OHLCRequestParams) {
    const { symbol, resolution, intervalStart, intervalEnd } = body
    const params = {
      symbol,
      resolution,
      from: `${intervalStart}`,
      to: `${intervalEnd}`,
      token: FINNHUB_KEY,
    }
    try {
      const response = await fetch('https://finnhub.io/api/v1/stock/candle?' + new URLSearchParams(params))
      const data: Record<string, any> = response.json()
      if ('error' in data) {
        throw new BadRequestError(data['error'])
      }
      return data
    } catch (error: any) {
      throw new BadRequestError(error?.message)
    }
  }

  @Post('/quote')
  @UseBefore(AuthMiddleware)
  @UseBefore(json())
  async quote(@Body({ required: true }) body: QuoteRequestParams) {
    const { symbol } = body
    const params = {
      symbol,
      token: FINNHUB_KEY,
    }
    try {
      const response = await fetch('https://finnhub.io/api/v1/quote?' + new URLSearchParams(params))
      const data: Record<string, any> = response.json()
      if ('error' in data) {
        throw new BadRequestError(data['error'])
      }
      return data
    } catch (error: any) {
      throw new BadRequestError(error?.message)
    }
  }

  @Post('/stock/profile2')
  @UseBefore(AuthMiddleware)
  @UseBefore(json())
  async simpleProfile(@Body({ required: true }) body: ProfileRequestParams) {
    const { symbol } = body
    const params = { symbol, token: FINNHUB_KEY }
    try {
      const response = await fetch('https://finnhub.io/api/v1/stock/profile2?' + new URLSearchParams(params))
      const data: Record<string, any> = response.json()
      if ('error' in data) {
        throw new BadRequestError(data['error'])
      }
      return data
    } catch (error: any) {
      throw new BadRequestError(error?.message)
    }
  }

  @Post('/etf/profile')
  @UseBefore(AuthMiddleware)
  @UseBefore(json())
  async etfProfile(@Body({ required: true }) body: ProfileRequestParams) {
    const { symbol } = body
    const params = { apiKey: POLYGON_KEY }
    try {
      const response = await fetch(
        `https://api.polygon.io/v1/meta/symbols/${symbol}/company?` + new URLSearchParams(params),
      )
      const data: Record<string, any> = response.json()
      if ('error' in data) {
        throw new BadRequestError(data['error'])
      }
      return data
    } catch (error: any) {
      throw new BadRequestError(error?.message)
    }
  }

  @Post('/news')
  @UseBefore(AuthMiddleware)
  @UseBefore(json())
  async companyNews(@Body({ required: true }) body: NewsRequestParams) {
    const { symbol, intervalStart, intervalEnd } = body
    const params = { symbol, token: FINNHUB_KEY, from: intervalStart, to: intervalEnd }
    try {
      const response = await fetch('https://finnhub.io/api/v1/company-news?' + new URLSearchParams(params))
      const data: Record<string, any> = response.json()
      if ('error' in data) {
        throw new BadRequestError(data['error'])
      }
      return data
    } catch (error: any) {
      throw new BadRequestError(error?.message)
    }
  }
}
