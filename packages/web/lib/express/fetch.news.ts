import { client } from './client'
import * as Resources from './uriMap'

export interface NewsType {
  category: string
  datetime: number
  headline: string
  id: number
  image: string
  related: string
  source: string
  summary: string
  url: string
}

export const getNews = async (
  symbol: string,
  intervalStart: string,
  intervalEnd: string,
): Promise<Array<NewsType>> => {
  const data = await client(Resources.GET_NEWS, {
    inputData: { symbol, intervalStart, intervalEnd },
  })

  return data
}
