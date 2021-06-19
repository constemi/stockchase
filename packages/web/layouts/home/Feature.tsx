import { Box, SimpleGrid, useColorModeValue as mode } from '@chakra-ui/react'
import * as React from 'react'
import { FcDoughnutChart, FcMultipleDevices, FcPrivacy, FcTimeline } from 'react-icons/fc'
import { FeatureItem } from './Feature/FeatureItem'

export const Feature = () => {
  return (
    <Box as="section" py="24" bg={mode('white', 'gray.900')}>
      <Box maxW={{ base: 'xl', md: '5xl' }} mx="auto" px={{ base: '6', md: '8' }}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacingX="10" spacingY="14">
          <FeatureItem title="Secure by default" icon={<FcPrivacy />}>
            At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
            takimata sanctus.
          </FeatureItem>
          <FeatureItem title="Always up to date" icon={<FcTimeline />}>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
            labore.
          </FeatureItem>
          <FeatureItem title="Incredible statistics" icon={<FcDoughnutChart />}>
            At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
            takimata sanctus.
          </FeatureItem>
          <FeatureItem title="Support for multiple devices" icon={<FcMultipleDevices />}>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
            labore.
          </FeatureItem>
        </SimpleGrid>
      </Box>
    </Box>
  )
}
