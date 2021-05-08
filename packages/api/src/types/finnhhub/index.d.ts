// import * as Finnhub from 'finnhub'

interface Dict {
  [key: string]: any
}

interface StockCandles {
  c: Array<number>
  h: Array<number>
  l: Array<number>
  o: Array<number>
  s: string
  t: Array<number>
  v: Array<number>
}

declare module 'finnhub' {
  class ApiClient {
    static instance: ApiClient
    basePath: string
    authentications: Dict
    defaultHeaders: Dict
    timeout: number
    cache: boolean
    enableCookies: boolean
    agent?: any
    requestAgent?: null
    plugins?: null
  }

  class DefaultApi {
    apiClient?: any

    stockCandles: (
      symbol: string,
      resolution: string,
      from: number,
      to: number,
      opts?: Dict,
      callback?: () => void,
    ) => StockCandles
  }
}
