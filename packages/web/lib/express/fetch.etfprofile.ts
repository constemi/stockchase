import { client } from './client'
import * as Resources from './uriMap'

export interface EtfProfile {
  profile: {
    assetClass: string
    aum: number
    avgVolume: number
    cusip: string
    description: string
    domicile: string
    etfCompany: string
    expenseRatio: number
    inceptionDate: string
    investmentSegment: string
    isin: string
    name: string
    nav: number
    navCurrency: string
    priceToBook: number
    priceToEarnings: number
    trackingIndex: string
    website: string
  }
  symbol: string
}

export const getEtfProfile = async (symbol: string): Promise<EtfProfile> => {
  const data = await client(Resources.GET_ETF_PROFILE, {
    inputData: { symbol },
  })

  return data
}
