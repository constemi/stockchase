import { client } from './client'
import * as Resources from './uriMap'

interface Dict {
  [key: string]: any
}

export interface IOHLCData {
  readonly close: number
  readonly date: Date
  readonly high: number
  readonly low: number
  readonly open: number
  readonly status: string
  readonly volume: number
}

const parser = (data: Dict) => {
  if (!data.t) return []
  return Object.keys(data.t).map((_, idx) => {
    return {
      open: data['o'][idx],
      high: data['h'][idx],
      low: data['l'][idx],
      close: data['c'][idx],
      volume: data['v'][idx],
      status: data['s'][idx],
      date: new Date(data['t'][idx] * 1000),
    }
  })
}

export const getCandles = async (
  symbol: string,
  resolution: string,
  intervalStart: number,
  intervalEnd: number,
): Promise<IOHLCData[]> => {
  const data = await client(Resources.GET_CANDLES, {
    inputData: { symbol, resolution, intervalStart, intervalEnd },
  })

  return parser(data)
}
