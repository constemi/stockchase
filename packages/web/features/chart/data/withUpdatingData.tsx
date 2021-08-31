import * as React from 'react'
import * as Sentry from '@sentry/react'
import { ScaleLogarithmic } from 'd3-scale'
import { IOHLCData } from './iOHLCData'
import { getCandles } from 'lib/express/fetch.candles'

interface WithOHLCLocalProps {
  symbol: string
  resolution: string
  intervalStart: number
  intervalEnd: number
  yScale?: ScaleLogarithmic<number, number> | undefined | false
  tickLabelFill?: string // x-y axis label color
  gridLinesStrokeStyle?: string
}

interface WithOHLCState {
  data: IOHLCData[]
  lastCandle: number
}

export function withUpdatingData(initialLength = 120, interval = 1000 * 60 * 5) {
  return <TProps extends WithOHLCLocalProps>(OriginalComponent: React.ComponentClass<TProps>) => {
    return class WithOHLCData extends React.Component<TProps, WithOHLCState> {
      public interval?: number

      public constructor(props: TProps) {
        super(props)

        this.state = {
          data: [],
          lastCandle: 0,
        }
      }

      public async componentDidMount() {
        this.updateChart()
        this.interval = window.setInterval(() => {
          this.updateChart(true)
        }, interval)
      }

      public componentDidUpdate(prevProps: WithOHLCLocalProps, prevState: WithOHLCState) {
        if (
          prevProps.symbol !== this.props.symbol ||
          prevProps.resolution !== this.props.resolution ||
          prevProps.intervalStart !== this.props.intervalStart ||
          prevProps.intervalEnd !== this.props.intervalEnd
        ) {
          const initialState = { data: [], lastCandle: 0 }
          this.setState(initialState, this.updateChart)
        }
      }

      public componentWillUnmount() {
        window.clearInterval(this.interval)
      }

      public render() {
        const { symbol, resolution, intervalStart, intervalEnd, ...restProps } = this.props
        const { data } = this.state

        return (
          <Sentry.ErrorBoundary fallback={'An error has occurred'}>
            <OriginalComponent {...(restProps as TProps)} data={data} />
          </Sentry.ErrorBoundary>
        )
      }

      private async updateChart(merge?: boolean) {
        const { symbol, resolution, intervalStart, intervalEnd } = this.props
        const dynamicStart = this.state.lastCandle || intervalStart
        const dynamicEnd = this.state.lastCandle ? Math.round(new Date().getTime() / 1000) : intervalEnd

        const candles = await getCandles(symbol, resolution, dynamicStart, dynamicEnd)
        const lastCandle = candles[candles.length - 1]?.['date']

        this.setState((prevState) => ({
          data: merge ? prevState.data.concat(candles) : candles,
          lastCandle: Math.round(lastCandle?.getTime() / 1000),
        }))
      }
    }
  }
}
