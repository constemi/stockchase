import { Box, Button, Flex, Heading, HStack, Stack, Text, useColorModeValue as mode } from '@chakra-ui/react'
import * as React from 'react'
import { HiChevronRight } from 'react-icons/hi'

interface SectionProps {
  type?: string
  currency?: string
  description?: string
  displaySymbol?: string
}

export const Section = (props: SectionProps) => {
  return (
    <Box bg={mode('white', 'gray.900')} as="section" minH="140px" position="relative">
      <Box py="17" position="relative" zIndex={1}>
        <Box maxW={{ base: 'xl', md: '7xl' }} mx="auto" px={{ base: '6', md: '8' }} color="white">
          <Box py="10" color={mode('blackAlpha.900', 'white')}>
            <Heading as="h1" size="xl" fontWeight="extrabold">
              S&P 500 ETF
            </Heading>
            <Text fontSize={{ md: '2xl' }} maxW="lg">
              SPY 🇺🇸 NYSE
            </Text>
            <Stack direction="row" justifyContent="space-between" py="4">
              <Box display="flex" direction="row">
                <Heading fontSize={{ md: '2xl' }}>4183.75 USD</Heading>
                <Text color="red.300" pl="1">
                  −2.00 (−0.05%)
                </Text>
              </Box>
              <Stack direction="row" spacing={12}>
                <Text fontWeight="extrabold">Jul 28</Text>
                <Text fontWeight="extrabold">2.83</Text>
                <Text fontWeight="extrabold">40.096B</Text>
                <Text fontWeight="extrabold">3.20%</Text>
              </Stack>
            </Stack>
            <Stack direction="row" justifyContent="space-between" py="2">
              <Text fontSize="xs">MARKET OPEN (May 03 17:49 UTC-5)</Text>
              <Stack direction="row" spacing={10}>
                <Text fontSize="xs">NEXT EARNINGS</Text>
                <Text fontSize="xs">EPS</Text>
                <Text fontSize="xs">MARKETCAP</Text>
                <Text fontSize="xs">DIV YIELD</Text>
              </Stack>
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
