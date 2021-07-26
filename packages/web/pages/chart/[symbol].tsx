import { Box, useColorModeValue as mode } from '@chakra-ui/react'
import * as React from 'react'
import sub from 'date-fns/sub'
import dynamic from 'next/dynamic'
import { scaleLog } from 'd3-scale'
import { useRouter } from 'next/router'
import { ButtonPanel } from 'features/chart/ButtonPanel'
import { FullScreenSeriesHeader } from 'features/chart/FullScreenSeriesHeader'
import { Interval } from 'features/chart/utils'

const FullScreenSeries = dynamic(() => import('features/chart/FullScreenCandleSeries'), { ssr: false })

function FullScreenChart() {
  const [resolution, setResolution] = React.useState('1Y')
  const [logarithmic, setLogScale] = React.useState(false)
  const [currentInterval, setIntervals] = React.useState<any>()

  const router = useRouter()
  const { symbol } = router.query

  const intervalMap = React.useMemo(() => new Interval(), [])

  React.useEffect(() => {
    const interval = {
      intervalStart: Math.round(sub(new Date(), intervalMap.get(resolution)).getTime() / 1000),
      intervalEnd: Math.round(new Date().getTime() / 1000),
    }
    setIntervals(interval)
  }, [resolution, intervalMap])

  return (
    <>
      <FullScreenSeriesHeader />

      <Box
        display="flex"
        flexDirection="column"
        flex="1"
        bgGradient={mode('none', 'linear(to-t, #393d4f1c, gray.900)')}
      >
        <FullScreenSeries
          yScale={logarithmic && scaleLog()}
          tickLabelFill={mode('inherit', 'currentColor')}
          symbol={symbol}
          resolution={intervalMap.labels[resolution]}
          {...currentInterval}
        />
      </Box>
      <ButtonPanel
        isActive={resolution}
        logarithmic={logarithmic}
        setLogScale={setLogScale}
        setResolution={setResolution}
      />
    </>
  )
}

export default FullScreenChart
