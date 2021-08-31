interface Dict {
  [key: string]: string | number
}

export const formatCountry = (currency: string | undefined): string => {
  switch (currency) {
    case 'CA':
    case 'CAD':
      return '🇨🇦'
    case 'US':
    case 'USD':
      return '🇺🇸'
    default:
      return ''
  }
}

export class Interval {
  _MS_PER_DAY = 1000 * 60 * 60 * 24
  _YTD = this.distanceInDays(new Date(new Date().getFullYear(), 0, 1, 1), new Date())
  _1D = this.includeWeekend(new Date())

  private distanceInDays(a: Date, b: Date): number {
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate())
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate())

    return Math.floor((utc2 - utc1) / this._MS_PER_DAY)
  }

  private includeWeekend(date: Date): number {
    switch (date.getDay()) {
      case 0:
        return 3
      case 6:
        return 2
      default:
        return 1
    }
  }

  public labels: Dict = {
    '1D': '1',
    '5D': '5',
    '1M': '15',
    '3M': 'D',
    '6M': 'D',
    YTD: 'D',
    '1Y': 'D',
    '5Y': 'W',
    All: 'M',
  }

  public getChartInterval(key: string): Dict {
    const durationMap = {
      '1D': { days: this._1D },
      '5D': { days: 5 },
      '1M': { months: 1 },
      '3M': { months: 3 },
      '6M': { months: 6 },
      YTD: { days: this._YTD },
      '1Y': { years: 1 },
      '5Y': { years: 5 },
      All: { years: 10 },
    }
    return durationMap[key as keyof typeof durationMap]
  }
}
