export interface Dict {
  [key: string]: any
}

export interface OHLCCandles {
  c: Array<number>
  h: Array<number>
  l: Array<number>
  o: Array<number>
  s: string
  t: Array<number>
  v: Array<number>
}

export interface Quote {
  o: number
  h: number
  l: number
  c: number
  pc: number
}

export interface StockProfile {
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
