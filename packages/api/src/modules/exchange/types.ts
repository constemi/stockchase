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
