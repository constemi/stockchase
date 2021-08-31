import * as React from 'react'
import {
  Box,
  Select,
  IconButton,
  Stack,
  StackDivider,
  StackItem,
  Heading,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import { PlusSquareIcon } from '@chakra-ui/icons'
import { MarketDataTable } from './MarketDataTable'

export function MarketDrawer() {
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
          <MarketDataTable symbols={['SPY', 'QQQ', 'DIA', 'IWM', 'VXX', 'UUP']} />
          <StackItem pl="4" py="4">
            <Heading fontSize="12px" color={mode('gray.600', 'gray.400')}>
              STOCKS
            </Heading>
          </StackItem>
          <StackDivider />
        </Stack>
      </Box>
    </Box>
  )
}
