const _MS_PER_DAY = 1000 * 60 * 60 * 24

function distanceInDays(a: Date, b: Date) {
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate())
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate())

  return Math.floor((utc2 - utc1) / _MS_PER_DAY)
}

function includeWeekend(date: Date): number {
  switch (date.getDay()) {
    case 0:
      return 3
    case 6:
      return 2
    default:
      return 1
  }
}

export const chartIntervals = {
  '1D': { days: includeWeekend(new Date()) },
  '5D': { days: 5 },
  '1M': { months: 1 },
  '3M': { months: 3 },
  '6M': { months: 6 },
  YTD: { days: distanceInDays(new Date(new Date().getFullYear(), 0, 1, 1), new Date()) },
  '1Y': { years: 1 },
  '5Y': { years: 5 },
  All: { years: 10 },
}

export const intervalMap = {
  '1D': '1',
  '5D': '5',
  '1M': 'D',
  '3M': 'D',
  '6M': 'D',
  YTD: 'D',
  '1Y': 'W',
  '5Y': 'W',
  All: 'M',
}
