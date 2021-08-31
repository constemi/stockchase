import { format } from 'd3-format'
import { timeFormat } from 'd3-time-format'
import * as React from 'react'
import {
  discontinuousTimeScaleProviderBuilder,
  Chart,
  ChartCanvas,
  BarSeries,
  CandlestickSeries,
  OHLCTooltip,
  lastVisibleItemBasedZoomAnchor,
  XAxis,
  YAxis,
  CrossHairCursor,
  EdgeIndicator,
  MouseCoordinateX,
  MouseCoordinateY,
  ZoomButtons,
  withDeviceRatio,
  withSize,
} from 'react-financial-charts'
import { ScaleLogarithmic } from 'd3-scale'
import { IOHLCData, withUpdatingData } from './data'

interface StockChartProps {
  data: IOHLCData[]
  height: number
  dateTimeFormat?: string
  width: number
  ratio: number
  yScale?: ScaleLogarithmic<number, number> | undefined | false
  tickLabelFill?: string // x-y axis label color
  gridLinesStrokeStyle?: string
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
      gridLinesStrokeStyle,
      dateTimeFormat = '%d %b',
      tickLabelFill,
      yScale,
      height,
      ratio,
      width,
    } = this.props

    const { margin, xScaleProvider } = this

    const { data, xScale, xAccessor, displayXAccessor } = xScaleProvider(initialData)

    const max = xAccessor(data[data.length - 1])
    const min = xAccessor(data[Math.max(0, data.length - 100)])
    const xExtents = [min, max + 5]

    const gridHeight = height - margin.top - margin.bottom

    const barChartHeight = gridHeight / 4
    const barChartOrigin = (_: number, h: number) => [0, h - barChartHeight]
    const chartHeight = gridHeight

    const timeDisplayFormat = timeFormat(dateTimeFormat)

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
          id="basic-candle-series"
          height={barChartHeight}
          origin={barChartOrigin}
          yExtents={this.barChartExtents}
          yScale={yScale || undefined}
        >
          <BarSeries fillStyle={this.volumeColor} yAccessor={this.volumeSeries} />
        </Chart>
        <Chart id={3} height={chartHeight} yExtents={this.candleChartExtents}>
          <XAxis
            showTicks
            showTickLabel
            tickLabelFill={tickLabelFill}
            showGridLines
            gridLinesStrokeStyle={gridLinesStrokeStyle}
          />
          <YAxis
            showTicks
            showTickLabel
            tickFormat={this.pricesDisplayFormat}
            tickLabelFill={tickLabelFill}
            showGridLines
            gridLinesStrokeStyle={gridLinesStrokeStyle}
          />
          <CandlestickSeries />
          <MouseCoordinateX displayFormat={timeDisplayFormat} />
          <MouseCoordinateY rectWidth={margin.right} displayFormat={this.pricesDisplayFormat} />
          <EdgeIndicator
            itemType="last"
            rectWidth={margin.right}
            fill={this.openCloseColor}
            lineStroke={this.openCloseColor}
            displayFormat={this.pricesDisplayFormat}
            yAccessor={this.yEdgeIndicator}
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
  withSize({ style: { minHeight: '93vh' } })(withDeviceRatio()(StockChart)),
)

export default FullScreenCandleSeries
