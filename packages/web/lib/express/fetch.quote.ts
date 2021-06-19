import { client } from './client'
import * as Resources from './uriMap'

interface Quote {
  o: number
  h: number
  l: number
  c: number
  pc: number
}

export const getQuote = async (symbol: string): Promise<Quote> => {
  const data = await client(Resources.GET_QUOTE, {
    inputData: { symbol },
  })

  return data
}
