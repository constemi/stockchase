import { client } from './client'
import * as Resources from './uriMap'

export interface EtfProfile {
  logo: string
  listdate: string
  cik: string
  bloomberg: string
  figi: string | null
  lei: string | null
  country: string
  industry: string
  sector: string
  marketcap: number
  employees: number | null
  phone: string
  ceo: string
  url: string
  description: string
  exchange: string
  name: string
  symbol: string
  exchangeSymbol: string
  hq_address: string
  hq_state: string
  hq_country: string
  type: string
  updated: string
  tags: Array<string | null>
  similar: Array<string | null>
  active: boolean
}

export const getEtfProfile = async (symbol: string): Promise<EtfProfile> => {
  const data = await client(Resources.GET_ETF_PROFILE, {
    inputData: { symbol },
  })

  return data
}
