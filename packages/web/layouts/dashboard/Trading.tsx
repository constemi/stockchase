import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  HStack,
  Stack,
  Text,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import * as React from 'react'
import { HiChevronRight } from 'react-icons/hi'
import { getQuote } from 'lib/express/fetch.quote'

interface Trade {
  c: string[]
  p: number
  s: string
  t: number
  v: number
}

export interface SimpleProfile {
  country: string
  currency: string
  exchange: string
  ipo: string
  marketCapitalization: number
  name: string
  phone: string
  shareOutstanding: number
  ticker: string
  weburl: string
  logo: string
  finnhubIndustry: string
}

export interface EtfProfile {
  logo: string
  listdate: string
  cik: string
  bloomberg: string
  figi: string | null
  lei: string | null
  country: string
  industry: string
  sector: string
  marketcap: number
  employees: number | null
  phone: string
  ceo: string
  url: string
  description: string
  exchange: string
  name: string
  symbol: string
  exchangeSymbol: string
  hq_address: string
  hq_state: string
  hq_country: string
  type: string
  updated: string
  tags: Array<string | null>
  similar: Array<string | null>
  active: boolean
}

interface TradingProps {
  security?: EtfProfile & SimpleProfile
  securityType: string
  currentSymbol: string
  messageHistory: MessageEvent | undefined
}

export function Trading(props: TradingProps) {
  const [previousClose, setPreviousClose] = React.useState(0)
  const { messageHistory, currentSymbol, security, securityType } = props

  React.useEffect(() => {
    async function fetchQuote() {
      const quote = await getQuote(currentSymbol)
      setPreviousClose(quote.pc)
    }
    fetchQuote()
  }, [currentSymbol, setPreviousClose])

  const events = messageHistory?.data?.filter((trade: Trade) => trade.s === currentSymbol) || []
  const { 0: firstTrade, length, [length - 1]: lastTrade } = events
  const intradayMove = lastTrade ? ((lastTrade.p - previousClose) / lastTrade.p) * 100 : 0

  let color = 'white'
  if (lastTrade && lastTrade.p > firstTrade.p) {
    color = 'green.300'
  } else if (lastTrade && lastTrade.p < firstTrade.p) {
    color = 'red.300'
  } else {
    color = mode('blackAlpha.700', 'whiteAlpha.800')
  }

  const currency = security?.currency || (security?.country === 'united states' && 'USD')

  return (
    <Box bg={mode('white', 'gray.900')} as="section" minH="140px" position="relative">
      <Box py="17" position="relative" zIndex={1}>
        <Box maxW={{ base: 'xl', md: '8xl' }} mx="auto" px={{ base: '6', md: '8' }} color="white">
          <Box py="10" color={mode('blackAlpha.900', 'white')}>
            <Heading
              as="h1"
              color={mode('blackAlpha.700', 'whiteAlpha.800')}
              size="xl"
              fontWeight="extrabold"
            >
              {security?.name || security?.name}
            </Heading>
            <Text color={mode('blackAlpha.700', 'whiteAlpha.800')} fontSize={{ md: '2xl' }} maxW="lg">
              {currentSymbol} 🇺🇸 {security?.exchange}
            </Text>
            <Stack direction="row" justifyContent="space-between" py="4">
              <Box display="flex" direction="row">
                <Heading fontSize={{ md: '3xl' }} color={color}>
                  <Box direction="row">{(lastTrade && lastTrade.p) || previousClose}</Box>
                </Heading>
                <Text size="xs" color={mode('blackAlpha.700', 'whiteAlpha.800')} pl="2">
                  {currency && currency}
                </Text>
                <Text color={intradayMove > 0 ? 'green.300' : 'red.400'} pl="1">
                  {intradayMove.toFixed(2)}%
                </Text>
              </Box>
              <Stack direction="row" spacing={12}>
                <Image borderRadius="full" boxSize="25px" src={security?.logo} />
                <Text fontWeight="extrabold">{security?.ipo || security?.listdate}</Text>
                <Text fontWeight="extrabold">{security?.marketCapitalization || security?.marketcap}</Text>
                <Text fontWeight="extrabold">{security?.shareOutstanding || security?.type}</Text>
              </Stack>
            </Stack>
            <Stack direction="row" justifyContent="space-between" py="2">
              <Text fontSize="xs" color={lastTrade ? 'gray.500' : 'gray.500'}>
                MARKET {`${lastTrade ? 'OPEN ' : 'CLOSED '}`}
                {`${new Date().toLocaleString()}`}
              </Text>
              <Box>
                {securityType === 'Common Stock' && (
                  <Stack direction="row" spacing={14}>
                    <Text fontSize="xs">COMPANY</Text>
                    <Text fontSize="xs">IPO DATE</Text>
                    <Text fontSize="xs">MARKETCAP</Text>
                    <Text fontSize="xs">OUTSTANDING</Text>
                  </Stack>
                )}
                {securityType === 'ETP' && (
                  <Stack direction="row" spacing={14}>
                    <Text fontSize="xs">COMPANY</Text>
                    <Text fontSize="xs">IPO DATE</Text>
                    <Text fontSize="xs">MARKETCAP</Text>
                    <Text fontSize="xs">TYPE</Text>
                  </Stack>
                )}
              </Box>
            </Stack>
            <Stack direction={{ base: 'column', md: 'row' }} mt="10" spacing="4">
              <Button
                as="a"
                href="#"
                colorScheme="blue"
                px="8"
                rounded="full"
                size="lg"
                fontSize="md"
                fontWeight="bold"
              >
                Get Started for Free
              </Button>
              <HStack
                as="a"
                transition="background 0.2s"
                justify={{ base: 'center', md: 'flex-start' }}
                href="#"
                color={mode('gray.600', 'white')}
                rounded="full"
                fontWeight="bold"
                px="6"
                py="3"
                _hover={{ bg: mode('gray.300', 'whiteAlpha.200') }}
              >
                <span>Full-featured chart</span>
                <HiChevronRight />
              </HStack>
            </Stack>
          </Box>
        </Box>
      </Box>
      <Flex
        id="image-wrapper"
        position="absolute"
        insetX="0"
        insetY="0"
        w="full"
        h="full"
        overflow="hidden"
        align="center"
      >
        <Box position="relative" w="full" h="full" bg={mode('gray.100', '#393d4f1c')}>
          <Box position="absolute" w="full" h="full" />
        </Box>
      </Flex>
    </Box>
  )
}
