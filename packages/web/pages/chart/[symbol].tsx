import React, { useState, useEffect } from 'react'
import { Box, useColorModeValue as mode } from '@chakra-ui/react'
import sub from 'date-fns/sub'
import dynamic from 'next/dynamic'
import { scaleLog } from 'd3-scale'
import { useRouter } from 'next/router'
import { ButtonPanel } from 'features/chart/ButtonPanel'
import { MarketDrawer } from 'layouts/chart/MarketDrawer'
import { Interval as IntervalMap } from 'features/chart/utils'
import { FullScreenSeriesHeader } from 'features/chart/FullScreenSeriesHeader'

const FullScreenSeries = dynamic(() => import('features/chart/FullScreenCandleSeries'), { ssr: false })

interface ChartInterval {
  intervalStart: number
  intervalEnd: number
}

function FullScreenChart() {
  const [resolution, setResolution] = useState('1Y')
  const [logarithmic, setLogScale] = useState(false)
  const [currentInterval, setInterval] = useState<ChartInterval>({ intervalStart: 0, intervalEnd: 0 })

  const { query } = useRouter()
  const symbol = query.symbol as string
  const Interval = React.useMemo(() => new IntervalMap(), [])

  useEffect(() => {
    const interval = {
      intervalStart: Math.round(sub(new Date(), Interval.getChartInterval(resolution)).getTime() / 1000),
      intervalEnd: Math.round(new Date().getTime() / 1000),
    }
    setInterval(interval)
  }, [resolution, Interval])

  return (
    <Box display="flex" minH="100vh" direction="row">
      <Box w="80%">
        <FullScreenSeriesHeader />
        <Box flexDirection="column" flex="1" bg={mode('white.100', 'gray.900')}>
          <FullScreenSeries
            symbol={symbol}
            resolution={Interval.labels[resolution] as string}
            yScale={logarithmic && scaleLog()}
            tickLabelFill={mode('gray', 'currentColor')}
            gridLinesStrokeStyle={mode('lightGray', 'rgb(49, 51, 60)')}
            {...currentInterval}
          />
        </Box>
        <ButtonPanel
          isActive={resolution}
          logarithmic={logarithmic}
          setLogScale={setLogScale}
          setResolution={setResolution}
        />
      </Box>
      <Box display="flex" flex="1">
        <MarketDrawer />
      </Box>
    </Box>
  )
}

export default FullScreenChart
