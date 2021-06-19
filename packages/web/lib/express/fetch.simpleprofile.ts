import { client } from './client'
import * as Resources from './uriMap'

export interface SimpleProfile {
  country: string
  currency: string
  exchange: string
  ipo: string
  marketCapitalization: number
  name: string
  phone: string
  shareOutstanding: number
  ticker: string
  weburl: string
  logo: string
  finnhubIndustry: string
}

export const getSimpleProfile = async (symbol: string): Promise<SimpleProfile> => {
  const data = await client(Resources.GET_STOCK_PROFILE2, {
    inputData: { symbol },
  })

  return data
}
