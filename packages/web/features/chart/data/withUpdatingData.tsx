import * as React from 'react'
// import sub from 'date-fns/sub'
import { csvParse } from 'd3-dsv'
import { timeParse } from 'd3-time-format'
import { FOHLCData } from './fOHLCData'
import { getCandles } from 'lib/express/getcandles'
import { ChartProps } from '../BasicBaselineSeries'

const parseDate = timeParse('%s')

const parseData = () => {
  return (d: any) => {
    const date = parseDate(d.t)
    if (date === null) {
      d.t = new Date(Number(d.t))
    } else {
      d.t = new Date(date)
    }

    for (const key in d) {
      if (key !== 't' && Object.prototype.hasOwnProperty.call(d, key)) {
        d[key] = +d[key]
      }
    }

    return d as FOHLCData
  }
}

interface WithOHLCDataProps extends Omit<ChartProps, 'data'> {
  readonly symbol: string
  readonly resolution: string
  readonly intervalStart: number
  readonly intervalEnd: number
  readonly data: FOHLCData[]
}

// interface WithOHLCState {
//   data: FOHLCData[]
//   length: number
// }

export function withUpdatingData(initialLength = 120, interval = 1_000) {
  return <TProps extends WithOHLCDataProps>(OriginalComponent: React.ComponentClass<TProps>) => {
    return function (props: Omit<TProps, 'data'>) {
      const [data, setData] = React.useState<FOHLCData[]>([])
      const [lastFetch, setLastFetch] = React.useState(0)

      React.useEffect(() => {
        console.log(lastFetch)
        const { symbol, resolution, intervalStart, intervalEnd } = props

        const fetchInterval = window.setInterval(() => {
          const fetchData = async () => {
            // -1 year sub(new Date(), { years: 1 })
            const candles = await getCandles(symbol, resolution, intervalStart, intervalEnd)
            const parsed = csvParse(candles, parseData())
            setData(data.concat(parsed))
            setLastFetch(parsed[parsed.length - 1]['t'])
          }
          fetchData()
        }, interval)
        return function cleanup() {
          window.clearInterval(fetchInterval)
        }
      })

      // const connectionStatus = {
      //   [ReadyState.CONNECTING]: 'Connecting',
      //   [ReadyState.OPEN]: 'Open',
      //   [ReadyState.CLOSING]: 'Closing',
      //   [ReadyState.CLOSED]: 'Closed',
      //   [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
      // }[readyState]

      return <OriginalComponent {...(props as TProps)} data={data} />
    }
  }
}
