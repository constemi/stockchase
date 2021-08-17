import * as React from 'react'
import sub from 'date-fns/sub'
import dynamic from 'next/dynamic'
import {
  Box,
  Select,
  Table,
  Thead,
  Tr,
  Td,
  Th,
  Tbody,
  IconButton,
  useColorModeValue as mode,
  Stack,
  StackDivider,
  StackItem,
  Heading,
} from '@chakra-ui/react'
import { PlusSquareIcon } from '@chakra-ui/icons'
import { scaleLog } from 'd3-scale'
import { useRouter } from 'next/router'
import { ButtonPanel } from 'features/chart/ButtonPanel'
import { FullScreenSeriesHeader } from 'features/chart/FullScreenSeriesHeader'
import { Interval } from 'features/chart/utils'

const FullScreenSeries = dynamic(() => import('features/chart/FullScreenCandleSeries'), { ssr: false })

function MarketDataTable() {
  return (
    <Table size="sm">
      <Thead>
        <Tr>
          <Th>Symbol</Th>
          <Th isNumeric>Last</Th>
          <Th isNumeric>Chg</Th>
          <Th>Chg%</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td>SPX</Td>
          <Td isNumeric>4438.05</Td>
          <Td isNumeric>25.4</Td>
          <Td>-0.94%</Td>
        </Tr>
        <Tr>
          <Td>NDX</Td>
          <Td isNumeric>14977.76</Td>
          <Td isNumeric>-164.74</Td>
          <Td>-1.10%</Td>
        </Tr>
        <Tr>
          <Td>DJI</Td>
          <Td isNumeric>35271.12</Td>
          <Td isNumeric>-354.25</Td>
          <Td>-0.99%</Td>
        </Tr>
        <Tr>
          <Td>VIX</Td>
          <Td isNumeric>18.00</Td>
          <Td isNumeric>1.88</Td>
          <Td>11.79%</Td>
        </Tr>
        <Tr>
          <Td>DXY</Td>
          <Td isNumeric>93.101</Td>
          <Td isNumeric>0.489</Td>
          <Td>0.53%</Td>
        </Tr>
      </Tbody>
    </Table>
  )
}

function MarketDrawer() {
  return (
    <Box display="flex" flex="1" bg={mode('white.100', 'gray.900')}>
      <Box
        bg={mode('white', 'gray.900')}
        shadow="md"
        w="full"
        maxW="lg"
        mx="auto"
        rounded="md"
        overflow="hidden"
        borderLeft="7px solid"
        borderLeftColor={mode('gray.200', 'gray.700')}
      >
        <Stack>
          <Box display="flex" direction="row" justifyContent="space-between" pb="5">
            <Select placeholder="Watchlist" variant="filled" w="50%" />
            <IconButton w="40px" h="40px" aria-label="add symbol" icon={<PlusSquareIcon />} />
          </Box>
          <MarketDataTable />
          <StackItem displayName="Stocks" pl="4" py="4">
            <Heading fontSize="13px" color="gray.300">
              STOCKS
            </Heading>
          </StackItem>
          <StackDivider />
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
