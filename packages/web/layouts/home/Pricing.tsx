import { Box, Heading, HStack, SimpleGrid, Text, useColorModeValue as mode } from '@chakra-ui/react'
import * as React from 'react'
import { HiCheckCircle } from 'react-icons/hi'
import { PricingCard } from './Pricing/PricingCard'

const FeatureItem: React.FC = ({ children }) => (
  <HStack>
    <Box flexShrink={0} as={HiCheckCircle} fontSize="xl" color={mode('blue.500', 'blue.300')} />
    <Text>{children}</Text>
  </HStack>
)

export const Pricing = () => {
  return (
    <Box as="section" bg={mode('gray.50', 'gray.800')} py="20">
      <Box maxW={{ base: 'xl', md: '5xl' }} mx="auto" px={{ base: '6', md: '8' }}>
        <Box maxW="2xl" mx="auto" textAlign={{ sm: 'center' }}>
          <Text
            textTransform="uppercase"
            fontWeight="bold"
            letterSpacing="wide"
            mb="3"
            color={mode('gray.600', 'gray.400')}
          >
            Pricing
          </Text>
          <Heading as="h1" size="3xl" fontWeight="extrabold" letterSpacing="tight">
            Pay as you grow
          </Heading>
          <Text mt="6" fontSize="xl" color={mode('gray.600', 'gray.400')}>
            Try us out for free and consider a subscription to access our valuable research and analysis
          </Text>
        </Box>
        <SimpleGrid alignItems="flex-start" mt="16" columns={{ base: 1, lg: 2 }} spacing="10">
          <PricingCard
            colorScheme="blue"
            name="Investor"
            price={5}
            duration="/ mo"
            description="Basic subscription"
            features={[
              'US equities and ETFs',
              'Selected research articles',
              'Basic charting and analysis',
              'US Company balance sheet data',
            ]}
          />
          <PricingCard
            colorScheme="teal"
            name="Enterprise"
            price={50}
            duration="/ mo"
            description="Access to additional research and data sets"
            features={[
              'All North American equities and ETFs',
              'Additional research and OTC coverage',
              'Advanced charting and alternative data',
              'North American balance sheet data',
            ]}
          />
        </SimpleGrid>
        <Box
          mt="10"
          bg={mode('white', 'gray.700')}
          shadow="md"
          rounded="lg"
          px="10"
          pt="10"
          pb="12"
          mx="auto"
          maxW={{ base: 'lg', lg: 'unset' }}
        >
          <Text
            color={mode('blue.500', 'blue.300')}
            textTransform="uppercase"
            fontWeight="bold"
            letterSpacing="wide"
          >
            Features & Services
          </Text>
          <Text fontSize="3xl" mt="2" fontWeight="bold">
            Included in all plans
          </Text>
          <SimpleGrid columns={{ base: 1, lg: 2 }} mt="5" spacing="5">
            <FeatureItem>Basic Charting and fundamentals</FeatureItem>
            <FeatureItem>Dedicated support and updates</FeatureItem>
            <FeatureItem>Financial indicators</FeatureItem>
            <FeatureItem>Full visibility over all prices in real time</FeatureItem>
          </SimpleGrid>
        </Box>
      </Box>
    </Box>
  )
}
