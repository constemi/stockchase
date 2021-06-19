import * as React from 'react'
import dynamic from 'next/dynamic'
import sub from 'date-fns/sub'
import { scaleLog } from 'd3-scale'
import { useSocketio } from 'components/providers/IOProvider'
import { SearchSecurityResponse } from 'lib/graphql'
import { Box, Container, Heading, useColorModeValue as mode } from '@chakra-ui/react'
import { NewsFeed } from 'features/news/NewsFeed'
import { Page } from 'layouts/page/Page'
import { Trading } from 'layouts/dashboard/Trading'
import { ButtonPanel } from 'features/chart/ButtonPanel'
import { getEtfProfile } from 'lib/express/fetch.etfprofile'
import { getSimpleProfile } from 'lib/express/fetch.simpleprofile'
import { chartIntervals, intervalMap } from 'features/chart/utils'
import { MeFragment } from 'lib/graphql'

import type { EtfProfile } from 'lib/express/fetch.etfprofile'
import type { SimpleProfile } from 'lib/express/fetch.simpleprofile'

const Series = dynamic(() => import('features/chart/BasicBaselineSeries'), { ssr: false })

type MeType = MeFragment | null | undefined
interface DashboardProps {
  me: MeType
}
type IntervalKeys = keyof typeof chartIntervals

export interface Action {
  ETP?: () => EtfProfile
  'Common Stock'?: () => SimpleProfile
}

const actions = {
  ETP: getEtfProfile,
  'Common Stock': getSimpleProfile,
}

export const Dashboard = (props: DashboardProps) => {
  const [isActive, setActiveButton] = React.useState('1Y')
  const [securityType, setSecurityType] = React.useState('ETP')
  const [currentSymbol, setCurrentSymbol] = React.useState('SPY')
  const [security, setSecurity] = React.useState<any>()
  const [logarithmic, setLogScale] = React.useState(false)
  const [messageHistory, setMessage] = React.useState()
  const [currentInterval, setIntervals] = React.useState<any>()

  const socket = useSocketio()
  socket.on('message', (message) => {
    setMessage(message)
  })

  React.useEffect(() => {
    socket.emit('subscribe', currentSymbol)
  }, [socket, currentSymbol])

  React.useEffect(() => {
    const interval = {
      intervalStart: Math.round(sub(new Date(), chartIntervals[isActive as IntervalKeys]).getTime() / 1000),
      intervalEnd: Math.round(new Date().getTime() / 1000),
    }
    setIntervals(interval)
  }, [isActive])

  React.useEffect(() => {
    const fetchProfile = async () => {
      const get = actions[securityType as keyof Action]
      const profile = await get(currentSymbol)
      setSecurity(profile)
    }
    fetchProfile()
  }, [securityType, currentSymbol])

  const handleResult = (result: SearchSecurityResponse) => {
    socket.emit('unsubscribe', currentSymbol)

    setSecurityType(result.type)
    setCurrentSymbol(result.displaySymbol)
  }

  const { me } = props
  type IntervalLabelKeys = keyof typeof intervalMap
  const resolution = intervalMap[isActive as IntervalLabelKeys]

  return (
    <Page tradeContext me={me} heading="" handleResult={handleResult}>
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
              yScale={logarithmic && scaleLog()}
              tickLabelFill={mode('inherit', 'currentColor')}
              symbol={currentSymbol}
              resolution={resolution}
              {...currentInterval}
            />
            <ButtonPanel
              isActive={isActive}
              logarithmic={logarithmic}
              setLogScale={setLogScale}
              setActiveButton={setActiveButton}
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
