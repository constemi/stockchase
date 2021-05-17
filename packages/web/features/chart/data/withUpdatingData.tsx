import * as React from 'react'
// import sub from 'date-fns/sub'
import { csvParse } from 'd3-dsv'
import { timeParse } from 'd3-time-format'
import { ScaleLogarithmic } from 'd3-scale'
import { IOHLCData } from './iOHLCData'
import { getCandles } from 'lib/express/getcandles'

interface Dict {
  [key: string]: any
}

const parseKeys = (obj: Dict, ohlcKeys: Dict) => {
  const keyValues = Object.keys(obj).map((key) => {
    if (key !== 't' && Object.prototype.hasOwnProperty.call(obj, key)) {
      obj[key] = +obj[key]
    }
    const newKey = ohlcKeys[key] || key
    return { [newKey]: obj[key] }
  })
  return Object.assign({}, ...keyValues)
}

const parseDate = timeParse('%s')

const parseData = () => {
  return (d: any) => {
    const date = parseDate(d.t)
    if (date === null) {
      d.t = new Date(Number(d.t))
    } else {
      d.t = new Date(date)
    }
    const ohlcKeys = { c: 'close', t: 'date', h: 'high', l: 'low', o: 'open', v: 'volume' }

    return parseKeys(d, ohlcKeys) as IOHLCData
  }
}

interface WithOHLCLocalProps {
  readonly symbol?: string
  readonly resolution?: string
  readonly intervalStart?: number
  readonly intervalEnd?: number
  readonly yScale?: ScaleLogarithmic<number, number> | undefined | false
  readonly tickLabelFill?: string // x-y axis label color
}

interface WithOHLCState {
  data: IOHLCData[]
  lastCandle: number
}

export function withUpdatingData(initialLength = 120, interval = 1_000) {
  return <TProps extends WithOHLCLocalProps>(OriginalComponent: React.ComponentClass<TProps>) => {
    return class WithOHLCData extends React.Component<TProps, WithOHLCState> {
      public fetchInterval?: number

      public constructor(props: TProps) {
        super(props)

        this.state = {
          data: [],
          lastCandle: 0,
        }
      }

      public componentDidMount() {
        console.log(this.state.lastCandle)
        const { symbol, resolution, intervalStart, intervalEnd } = this.props

        this.fetchInterval = window.setInterval(() => {
          const fetchData = async () => {
            // -1 year sub(new Date(), { years: 1 })
            const candles = await getCandles(
              symbol as string,
              resolution as string,
              intervalStart as number,
              intervalEnd as number,
            )

            const parsed = csvParse(candles, parseData())
            this.setData(this.state.data.concat(parsed))
            const lastCandle = parsed[parsed.length - 1]['date']
            this.setlastCandle(Math.round(lastCandle.getTime() / 1000))
          }
          fetchData()
        }, interval)
      }

      public componentWillUnmount() {
        window.clearInterval(this.fetchInterval)
      }

      public render() {
        const { symbol, resolution, intervalStart, intervalEnd, ...restProps } = this.props
        const { data } = this.state

        return <OriginalComponent {...(restProps as TProps)} data={data} />
      }

      private readonly setData = (data: IOHLCData[]) => {
        this.setState({ data })
      }

      private readonly setlastCandle = (lastCandle: number) => {
        this.setState({ lastCandle })
      }
    }
  }
}
