import React, { useEffect, useState, useMemo } from 'react'
import dynamic from 'next/dynamic'
import sub from 'date-fns/sub'
import { scaleLog } from 'd3-scale'
import { Box, Container, Heading, useColorModeValue as mode } from '@chakra-ui/react'
import { useSocketio } from 'components/providers/IOProvider'
import { MeFragment, SearchSecurityResponse } from 'lib/graphql'
import { Page } from 'layouts/page/Page'
import { Hero } from 'layouts/dash/Hero'
import { NewsFeed } from 'features/news/NewsFeed'
import { ButtonPanel } from 'features/chart/ButtonPanel'
import { getEtfProfile } from 'lib/express/fetch.etfprofile'
import { getSimpleProfile } from 'lib/express/fetch.simpleprofile'
import { Interval as IntervalMap } from 'features/chart/utils'
import type { EtfProfile } from 'lib/express/fetch.etfprofile'
import type { SimpleProfile } from 'lib/express/fetch.simpleprofile'

const Series = dynamic(() => import('features/chart/BasicBaselineSeries'), { ssr: false })

type MeType = MeFragment | null | undefined
interface DashboardProps {
  me: MeType
}

type Security = (EtfProfile | SimpleProfile) | undefined
interface IntervalT {
  intervalStart: number
  intervalEnd: number
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
  const [symbol, setCurrentSymbol] = useState('SPY')
  const [resolution, setResolution] = useState('1Y')
  const [securityType, setSecurityType] = useState('ETP')
  const [security, setSecurity] = useState<Security>()
  const [logarithmic, setLogScale] = useState(false)
  const [chartTimeInterval, setChartTimeInterval] = useState<IntervalT>({ intervalStart: 0, intervalEnd: 0 })

  const Interval = useMemo(() => new IntervalMap(), [])

  const socket = useSocketio()

  useEffect(() => {
    socket.emit('subscribe', symbol)
    return function cleanup() {
      socket.emit('unsubscribe', symbol)
    }
  }, [socket, symbol])

  useEffect(() => {
    setChartTimeInterval({
      intervalStart: Math.round(sub(new Date(), Interval.getChartInterval(resolution)).getTime() / 1000),
      intervalEnd: Math.round(new Date().getTime() / 1000),
    })
  }, [resolution, Interval])

  useEffect(() => {
    const fetchProfile = async () => {
      const fetchSecurity = getAction(securityType as keyof Action)
      if (fetchSecurity) setSecurity(await fetchSecurity(symbol))
    }
    fetchProfile()
  }, [securityType, symbol])

  const handleSearchResult = (result: SearchSecurityResponse) => {
    setSecurityType(result.type)
    setCurrentSymbol(result.displaySymbol)
    socket.emit('unsubscribe', symbol)
  }

  return (
    <Page includeTabNavigation me={props.me} handleSearchResult={handleSearchResult}>
      <Hero
        security={security as (EtfProfile & SimpleProfile) | undefined}
        securityType={securityType}
        symbol={symbol}
      />
      <Container maxW="8xl" py="10">
        <Heading size="lg" mb="6" color={mode('blackAlpha.700', 'whiteAlpha.800')}>
          Chart
        </Heading>
        <Box bgGradient={mode('none', 'linear(to-t, #393d4f1c, gray.900)')} shadow="md" rounded="md">
          <Box h="500">
            <Series
              symbol={symbol}
              yScale={logarithmic && scaleLog()}
              resolution={Interval.labels[resolution] as string}
              tickLabelFill={mode('inherit', 'currentColor')}
              {...chartTimeInterval}
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
        <NewsFeed symbol={symbol} />
      </Box>
    </Page>
  )
}
