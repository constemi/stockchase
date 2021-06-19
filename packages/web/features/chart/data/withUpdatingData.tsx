import * as React from 'react'
import * as Sentry from '@sentry/react'
import { ScaleLogarithmic } from 'd3-scale'
import { IOHLCData } from './iOHLCData'
import { getCandles } from 'lib/express/fetch.candles'

interface WithOHLCLocalProps {
  readonly symbol: string
  readonly resolution: string
  readonly intervalStart: number
  readonly intervalEnd: number
  readonly yScale?: ScaleLogarithmic<number, number> | undefined | false
  readonly tickLabelFill?: string // x-y axis label color
}

interface WithOHLCState {
  data: IOHLCData[]
  lastCandle: number
}

export function withUpdatingData(initialLength = 120, interval = 1_000 * 60) {
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
        // this.interval = window.setInterval(() => {
        //   this.updateChart()
        // }, interval)
      }

      public componentDidUpdate(prevProps: WithOHLCLocalProps, prevState: WithOHLCState) {
        if (
          prevProps.symbol !== this.props.symbol ||
          prevProps.resolution !== this.props.resolution ||
          prevProps.intervalStart !== this.props.intervalStart ||
          prevProps.intervalEnd !== this.props.intervalEnd
        ) {
          this.setState({ data: [], lastCandle: 0 }, this.updateChart)
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

      private async updateChart() {
        const { symbol, resolution, intervalStart, intervalEnd } = this.props
        const dynamicStart = this.state.lastCandle || intervalStart
        const dynamicEnd = this.state.lastCandle ? Math.round(new Date().getTime() / 1000) : intervalEnd

        const candles = await getCandles(symbol, resolution, dynamicStart, dynamicEnd)
        const lastCandle = candles[candles.length - 1]?.['date']

        this.setState((prevState) => ({
          data: prevState.data.concat(candles),
          lastCandle: Math.round(lastCandle?.getTime() / 1000),
        }))
      }
    }
  }
}
