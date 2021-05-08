import { client } from './client'
import * as Endpoints from './endpoints'

export interface IOHLCData {
  readonly c: number
  readonly t: number
  readonly h: number
  readonly l: number
  readonly o: number
  readonly s: string
  readonly v: number
}

export const getCandles = (
  symbol: string,
  resolution: string,
  intervalStart: number,
  intervalEnd: number,
): Promise<string> => {
  const data = client(Endpoints.GET_CANDLES, {
    inputData: { symbol, resolution, intervalStart, intervalEnd },
  })
  return data
}
