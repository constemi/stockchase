import * as React from 'react'
import { format } from 'd3-format'
import { timeFormat } from 'd3-time-format'
import { ScaleLogarithmic } from 'd3-scale'
import {
  EdgeIndicator,
  CrossHairCursor,
  MouseCoordinateX,
  MouseCoordinateY,
  OHLCTooltip,
} from 'react-financial-charts'
import { Chart, ChartCanvas, mouseBasedZoomAnchor } from '@react-financial-charts/core'
import { XAxis, YAxis } from '@react-financial-charts/axes'
import { discontinuousTimeScaleProviderBuilder } from '@react-financial-charts/scales'
import { AreaSeries, AreaSeriesProps } from '@react-financial-charts/series'
import { withDeviceRatio, withSize } from '@react-financial-charts/utils'
import { IOHLCData, withOHLCData, withUpdatingData } from './data'

export interface ChartProps extends Partial<AreaSeriesProps> {
  readonly data: IOHLCData[]
  readonly height: number
  readonly ratio: number
  readonly width: number
  readonly yScale?: ScaleLogarithmic<number, number> | undefined | false
  readonly tickLabelFill: string // x-y axis label color
}

class BasicAreaSeries extends React.Component<ChartProps> {
  private readonly margin = { left: 0, right: 40, top: 0, bottom: 24 }
  private readonly pricesDisplayFormat = format('.2f')
  private readonly xScaleProvider = discontinuousTimeScaleProviderBuilder().inputDateAccessor(
    (d: IOHLCData) => d.date,
  )

  public render() {
    const { data: initialData, height, ratio, width, tickLabelFill, yScale, ...rest } = this.props

    const { data, xScale, xAccessor, displayXAccessor } = this.xScaleProvider(initialData)

    const gridHeight = height - this.margin.top - this.margin.bottom
    const barChartHeight = gridHeight
    const barChartOrigin = (_: number, h: number) => [0, h - barChartHeight]
    const max = xAccessor(data[data.length - 1])
    const min = xAccessor(data[Math.max(0, data.length - 100)])
    const xExtents = [min, max]

    const { margin } = this
    const timeDisplayFormat = timeFormat('%d %b')

    return (
      <ChartCanvas
        height={height}
        ratio={ratio}
        width={width}
        margin={this.margin}
        data={data}
        displayXAccessor={displayXAccessor}
        seriesName="Data"
        xScale={xScale}
        xAccessor={xAccessor}
        xExtents={xExtents}
        zoomAnchor={mouseBasedZoomAnchor}
      >
        <Chart
          id={1}
          height={barChartHeight}
          origin={barChartOrigin}
          yExtents={this.yExtents}
          yScale={yScale || undefined}
        >
          <AreaSeries yAccessor={this.yAccessor} {...rest} />
          <XAxis tickLabelFill={tickLabelFill} />
          <YAxis tickLabelFill={tickLabelFill} tickFormat={yScale ? format('.2f') : undefined} />
          <MouseCoordinateX displayFormat={timeDisplayFormat} />
          <MouseCoordinateY rectWidth={margin.right} displayFormat={this.pricesDisplayFormat} />
          <EdgeIndicator
            fullWidth
            itemType="last"
            rectWidth={margin.right}
            fill={this.openCloseColor}
            lineStroke={this.openCloseColor}
            displayFormat={this.pricesDisplayFormat}
            yAccessor={this.yEdgeIndicator}
          />
          <OHLCTooltip origin={[8, 24]} textFill="#2196f3" />
        </Chart>
        <CrossHairCursor />
      </ChartCanvas>
    )
  }

  private readonly yAccessor = (data: IOHLCData) => {
    return data.close
  }

  private readonly yEdgeIndicator = (data: IOHLCData) => {
    return data.close
  }

  private readonly yExtents = (data: IOHLCData) => {
    return [data.high, data.low]
  }

  private readonly openCloseColor = (data: IOHLCData) => {
    return data.close > data.open ? '#2196f3' : '#ef5350'
  }
}

export const SimpleAreaSeries = withOHLCData('SECONDS')(
  withUpdatingData()(withSize({ style: { minHeight: 600 } })(withDeviceRatio()(BasicLineSeries))),
)

export const Intraday = withOHLCData('MINUTES')(
  withSize({ style: { minHeight: 500 } })(withDeviceRatio()(BasicAreaSeries)),
)
