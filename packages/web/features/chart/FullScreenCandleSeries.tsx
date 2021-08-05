import { format } from 'd3-format'
import { timeFormat } from 'd3-time-format'
import * as React from 'react'
import {
  ema,
  discontinuousTimeScaleProviderBuilder,
  Chart,
  ChartCanvas,
  CurrentCoordinate,
  BarSeries,
  CandlestickSeries,
  LineSeries,
  MovingAverageTooltip,
  OHLCTooltip,
  lastVisibleItemBasedZoomAnchor,
  XAxis,
  YAxis,
  CrossHairCursor,
  EdgeIndicator,
  MouseCoordinateY,
  ZoomButtons,
  withDeviceRatio,
  withSize,
} from 'react-financial-charts'
import { ScaleLogarithmic } from 'd3-scale'
import { IOHLCData, withUpdatingData } from './data'

interface StockChartProps {
  readonly data: IOHLCData[]
  readonly height: number
  readonly dateTimeFormat?: string
  readonly width: number
  readonly ratio: number
  readonly yScale?: ScaleLogarithmic<number, number> | undefined | false
  readonly tickLabelFill?: string // x-y axis label color
}

class StockChart extends React.Component<StockChartProps> {
  private readonly margin = { left: 0, right: 48, top: 0, bottom: 24 }
  private readonly pricesDisplayFormat = format('.2f')
  private readonly xScaleProvider = discontinuousTimeScaleProviderBuilder().inputDateAccessor(
    (d: IOHLCData) => d.date,
  )

  public render() {
    const {
      data: initialData,
      dateTimeFormat = '%d %b',
      tickLabelFill,
      yScale,
      height,
      ratio,
      width,
    } = this.props

    const ema12 = ema()
      .id(1)
      .options({ windowSize: 50 })
      .merge((d: any, c: any) => {
        d.ema12 = c
      })
      .accessor((d: any) => d.ema12)

    const ema26 = ema()
      .id(2)
      .options({ windowSize: 26 })
      .merge((d: any, c: any) => {
        d.ema26 = c
      })
      .accessor((d: any) => d.ema26)

    const calculatedData = ema26(ema12(initialData))

    const { margin, xScaleProvider } = this

    const { data, xScale, xAccessor, displayXAccessor } = xScaleProvider(calculatedData)

    const max = xAccessor(data[data.length - 1])
    const min = xAccessor(data[Math.max(0, data.length - 100)])
    const xExtents = [min, max + 5]

    const gridHeight = height - margin.top - margin.bottom

    const barChartHeight = gridHeight / 4
    const barChartOrigin = (_: number, h: number) => [0, h - barChartHeight]
    const chartHeight = gridHeight

    const timeDisplayFormat = timeFormat(dateTimeFormat)
    console.log(timeDisplayFormat)

    return (
      <ChartCanvas
        height={height}
        ratio={ratio}
        width={width}
        margin={margin}
        data={data}
        displayXAccessor={displayXAccessor}
        seriesName="Data"
        xScale={xScale}
        xAccessor={xAccessor}
        xExtents={xExtents}
        zoomAnchor={lastVisibleItemBasedZoomAnchor}
      >
        <Chart
          id={2}
          height={barChartHeight}
          origin={barChartOrigin}
          yExtents={this.barChartExtents}
          yScale={yScale || undefined}
        >
          <BarSeries fillStyle={this.volumeColor} yAccessor={this.volumeSeries} />
        </Chart>
        <Chart id={3} height={chartHeight} yExtents={this.candleChartExtents}>
          <XAxis
            showGridLines
            gridLinesStrokeStyle="rgb(49, 51, 60)"
            showTicks={false}
            tickLabelFill={tickLabelFill}
            showTickLabel={false}
          />
          <YAxis
            showGridLines
            gridLinesStrokeStyle="rgb(49, 51, 60)"
            tickFormat={this.pricesDisplayFormat}
            tickLabelFill={tickLabelFill}
          />
          <CandlestickSeries />
          <LineSeries yAccessor={ema26.accessor()} strokeStyle={ema26.stroke()} />
          <CurrentCoordinate yAccessor={ema26.accessor()} fillStyle={ema26.stroke()} />
          <LineSeries yAccessor={ema12.accessor()} strokeStyle={ema12.stroke()} />
          <CurrentCoordinate yAccessor={ema12.accessor()} fillStyle={ema12.stroke()} />
          <MouseCoordinateY rectWidth={margin.right} displayFormat={this.pricesDisplayFormat} />
          <EdgeIndicator
            itemType="last"
            rectWidth={margin.right}
            fill={this.openCloseColor}
            lineStroke={this.openCloseColor}
            displayFormat={this.pricesDisplayFormat}
            yAccessor={this.yEdgeIndicator}
          />
          <MovingAverageTooltip
            origin={[8, 24]}
            options={[
              {
                yAccessor: ema26.accessor(),
                type: 'EMA',
                stroke: ema26.stroke(),
                windowSize: ema26.options().windowSize,
              },
              {
                yAccessor: ema12.accessor(),
                type: 'EMA',
                stroke: ema12.stroke(),
                windowSize: ema12.options().windowSize,
              },
            ]}
          />
          <ZoomButtons />
          <OHLCTooltip origin={[8, 16]} textFill="#2196f3" />
        </Chart>
        <CrossHairCursor />
      </ChartCanvas>
    )
  }

  private readonly barChartExtents = (data: IOHLCData) => {
    return data.volume
  }

  private readonly candleChartExtents = (data: IOHLCData) => {
    return [data.high, data.low]
  }

  private readonly yEdgeIndicator = (data: IOHLCData) => {
    return data.close
  }

  private readonly volumeColor = (data: IOHLCData) => {
    return data.close > data.open ? 'rgba(38, 166, 154, 0.3)' : 'rgba(239, 83, 80, 0.3)'
  }

  private readonly volumeSeries = (data: IOHLCData) => {
    return data.volume
  }

  private readonly openCloseColor = (data: IOHLCData) => {
    return data.close > data.open ? '#2196f3' : '#ef5350'
  }
}

const FullScreenCandleSeries = withUpdatingData()(
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error: TS doesn't detect HOC props passthrough
  withSize({ style: { minHeight: 'calc(100vh - 80px)' } })(withDeviceRatio()(StockChart)),
)

export default FullScreenCandleSeries
