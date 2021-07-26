import * as React from 'react'
import dynamic from 'next/dynamic'
import sub from 'date-fns/sub'
import { scaleLog } from 'd3-scale'
import { useSocketio } from 'components/providers/IOProvider'
import { MeFragment, SearchSecurityResponse } from 'lib/graphql'
import { Box, Container, Heading, useColorModeValue as mode } from '@chakra-ui/react'
import { NewsFeed } from 'features/news/NewsFeed'
import { Page } from 'layouts/page/Page'
import { Trading } from 'layouts/dashboard/Trading'
import { ButtonPanel } from 'features/chart/ButtonPanel'
import { getEtfProfile } from 'lib/express/fetch.etfprofile'
import { getSimpleProfile } from 'lib/express/fetch.simpleprofile'
import { Interval } from 'features/chart/utils'
import type { EtfProfile } from 'lib/express/fetch.etfprofile'
import type { SimpleProfile } from 'lib/express/fetch.simpleprofile'

const Series = dynamic(() => import('features/chart/BasicBaselineSeries'), { ssr: false })

type MeType = MeFragment | null | undefined
interface DashboardProps {
  me: MeType
}

interface Messages {
  data: {
    c: string[]
    p: number
    s: string
    t: number
    v: number
  }[]
  type: string
  newEntry: string
}
export interface Action {
  ETP?: (symbol: string) => Promise<EtfProfile>
  ADR?: (symbol: string) => Promise<SimpleProfile>
  'Common Stock'?: (symbol: string) => Promise<SimpleProfile>
}

const getAction = (securityType: keyof Action) => {
  const actions: Action = {
    ETP: getEtfProfile,
    ADR: getSimpleProfile,
    'Common Stock': getSimpleProfile,
  }
  return actions[securityType]
}

export const Dashboard = (props: DashboardProps) => {
  const [resolution, setResolution] = React.useState('1Y')
  const [securityType, setSecurityType] = React.useState('ETP')
  const [currentSymbol, setCurrentSymbol] = React.useState('SPY')
  const [security, setSecurity] = React.useState<any>()
  const [logarithmic, setLogScale] = React.useState(false)
  const [messageHistory, setMessage] = React.useState<Messages>()
  const [currentInterval, setInterval] = React.useState<any>()

  const intervalMap = React.useMemo(() => new Interval(), [])

  const socket = useSocketio()
  const isEven = (count: number) => count % 2 === 0

  socket.on('message', (message) => {
    let count = 0
    if (isEven(count)) {
      setMessage(message)
      count++
    }
  })

  React.useEffect(() => {
    socket.emit('subscribe', currentSymbol)
  }, [socket, currentSymbol])

  React.useEffect(() => {
    setInterval({
      intervalStart: Math.round(sub(new Date(), intervalMap.get(resolution)).getTime() / 1000),
      intervalEnd: Math.round(new Date().getTime() / 1000),
    })
  }, [resolution, intervalMap])

  React.useEffect(() => {
    const fetchSecurityProfile = async () => {
      const fetchSecurity = getAction(securityType as keyof Action)
      if (fetchSecurity) setSecurity(await fetchSecurity(currentSymbol))
    }
    fetchSecurityProfile()
  }, [securityType, currentSymbol])

  const handleResult = (result: SearchSecurityResponse) => {
    socket.emit('unsubscribe', currentSymbol)
    setSecurityType(result.type)
    setCurrentSymbol(result.displaySymbol)
  }

  return (
    <Page tradeContext me={props.me} heading="" handleResult={handleResult}>
      <Trading
        security={security}
        securityType={securityType}
        currentSymbol={currentSymbol}
        messageHistory={messageHistory}
      />
      <Container maxW="8xl" py="10">
        <Heading size="lg" mb="6" color={mode('blackAlpha.700', 'whiteAlpha.800')}>
          Chart
        </Heading>
        <Box bgGradient={mode('none', 'linear(to-t, #393d4f1c, gray.900)')} shadow="md" rounded="md">
          <Box h="500">
            <Series
              symbol={currentSymbol}
              yScale={logarithmic && scaleLog()}
              resolution={intervalMap.labels[resolution]}
              tickLabelFill={mode('inherit', 'currentColor')}
              {...currentInterval}
            />
            <ButtonPanel
              isActive={resolution}
              logarithmic={logarithmic}
              setLogScale={setLogScale}
              setResolution={setResolution}
            />
          </Box>
        </Box>
      </Container>
      <Box py="10">
        <NewsFeed currentSymbol={currentSymbol} />
      </Box>
    </Page>
  )
}
