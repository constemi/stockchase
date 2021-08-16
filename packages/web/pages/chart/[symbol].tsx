import * as React from 'react'
import sub from 'date-fns/sub'
import dynamic from 'next/dynamic'
import { Box, Stack, useColorModeValue as mode } from '@chakra-ui/react'
import { scaleLog } from 'd3-scale'
import { useRouter } from 'next/router'
import { ButtonPanel } from 'features/chart/ButtonPanel'
import { FullScreenSeriesHeader } from 'features/chart/FullScreenSeriesHeader'
import { Interval } from 'features/chart/utils'

const FullScreenSeries = dynamic(() => import('features/chart/FullScreenCandleSeries'), { ssr: false })

function MarketDrawer() {
  return (
    <Box p="25" display="flex" flex="1" bg={mode('white.100', 'gray.900')}>
      <Box
        bg={mode('white', 'gray.900')}
        shadow="md"
        w="full"
        maxW="lg"
        mx="auto"
        rounded="lg"
        overflow="hidden"
      >
        <Stack spacing="24px">
          <h2>Stock Price Info</h2>
        </Stack>
      </Box>
    </Box>
  )
}

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
    <Box display="flex" flex="1" direction="row">
      <Box w="80%">
        <FullScreenSeriesHeader />
        <Box display="flex" flexDirection="column" flex="1" bg={mode('white.100', 'gray.900')}>
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
      </Box>
      <Box display="flex" flex="1">
        <MarketDrawer />
      </Box>
    </Box>
  )
}

export default FullScreenChart
