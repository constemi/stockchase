import { Box, HStack, Stack, Text } from '@chakra-ui/react'
import * as React from 'react'
import { CallToActionLink } from './CallToActionLink'
import { CloseButton } from './CloseButton'

interface BannerProps {
  boldText?: string
  buttonText: string
  messageText: string
  showBanner: boolean
}

export const GradientBanner = (props: BannerProps) => {
  const { boldText, messageText, buttonText, showBanner } = props
  return (
    <Box as="section" hidden={!showBanner}>
      <Box
        bgGradient="linear(to-r, blue.500, purple.500)"
        color="white"
        py="3"
        px={{ base: '3', md: '6', lg: '8' }}
      >
        <HStack spacing="3">
          <Stack
            direction={{ base: 'column', sm: 'row' }}
            justifyContent="center"
            alignItems="center"
            spacing={{ base: '3', md: '6' }}
            width="full"
          >
            <Text>
              <b>{`${boldText},`} </b>
              {messageText}
            </Text>
            <CallToActionLink textAlign="center" width={{ base: 'full', sm: 'auto' }}>
              {buttonText}
            </CallToActionLink>
          </Stack>
          <CloseButton alignSelf={{ base: 'self-start', sm: 'initial' }} aria-label="Close banner" />
        </HStack>
      </Box>
    </Box>
  )
}
