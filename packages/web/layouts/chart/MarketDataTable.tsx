import React, { useState, useEffect } from 'react'
import { Table, Thead, Tr, Td, Th, Tbody } from '@chakra-ui/react'
import { getQuote } from 'lib/express/fetch.quote'
import { useSocketio } from 'components/providers/IOProvider'

interface Trade {
  c: string[]
  p: number
  s: string
  t: number
  v: number
}

interface Message {
  data: Trade[]
  type: string
  newEntry: string
}

interface Messages {
  [key: string]: Trade
}

interface Quote {
  c: number
  h: number
  l: number
  o: number
  pc: number
  t: number
}

interface Quotes {
  [symbol: string]: Quote
}

interface MarketDataTableProps {
  symbols: string[]
  updateInMs?: number
}

export function MarketDataTable(props: MarketDataTableProps) {
  const [quotes, setQuote] = useState<Quotes>({})
  const [messageHistory, setMessages] = useState<Messages>({})

  const socket = useSocketio()
  let state: Messages = {}

  socket.on('message', (msg: Message) => {
    const wsm = msg?.data?.reduce((prev, curr) => ({ ...prev, [curr['s']]: { ...curr } }), {}) || {}
    state = { ...state, ...wsm }
  })

  const { updateInMs } = props
  const interval = setInterval(() => {
    setMessages({ ...messageHistory, ...state })
  }, updateInMs || 1000 * 10)

  useEffect(() => {
    const { symbols = [] } = props
    let quoteData = {}

    const fetchQuotes = async () => {
      for (const symbol of symbols) {
        const quote = await getQuote(symbol)
        quoteData = { ...quoteData, [symbol]: quote }
        socket.emit('subscribe', symbol)
      }
      setQuote(quoteData)
    }
    fetchQuotes()

    return function cleanup() {
      for (const symbol of symbols) {
        socket.emit('unsubscribe', symbol)
        clearInterval(interval)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
        {Object.keys(quotes).map((symbol: string, idx: number) => {
          const previousClose = quotes[symbol] && quotes[symbol]['pc']
          const closingPrice = quotes[symbol] && quotes[symbol]['c']
          const currentPrice = (messageHistory[symbol] && messageHistory[symbol]['p']) || closingPrice
          return (
            <Tr key={`table-row-${idx}`}>
              <Td>{symbol}</Td>
              <Td isNumeric>{currentPrice.toFixed(2)}</Td>
              <Td isNumeric>{(currentPrice - previousClose).toFixed(2)}</Td>
              <Td>{(((currentPrice - previousClose) / currentPrice) * 100).toFixed(2)}%</Td>
            </Tr>
          )
        })}
      </Tbody>
    </Table>
  )
}
