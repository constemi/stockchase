import { client } from './client'
import * as Endpoints from './endpoints'

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
