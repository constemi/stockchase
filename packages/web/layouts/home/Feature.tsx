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
            We encrypt and hash all pertinent data, we do not sell or provide user data to third parties
          </FeatureItem>
          <FeatureItem title="Always up to date" icon={<FcTimeline />}>
            Consistent updates and research anchors our ability to provide meaningful utility
          </FeatureItem>
          <FeatureItem title="Incredible statistics" icon={<FcDoughnutChart />}>
            Deep fundamental analysis of markets and capital flows paint a picture of human behavior
          </FeatureItem>
          <FeatureItem title="Support for multiple devices" icon={<FcMultipleDevices />}>
            We support a mobile and tablet devices first design methodology
          </FeatureItem>
        </SimpleGrid>
      </Box>
    </Box>
  )
}
