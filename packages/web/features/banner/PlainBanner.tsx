import { BellIcon } from '@chakra-ui/icons'
import { Box, Stack, HStack, Text, useColorModeValue } from '@chakra-ui/react'
import * as React from 'react'
import { ActionLink } from './ActionLink'

interface BannerProps {
  boldText?: string
  buttonText: string
  messageText: string
  showBanner: boolean
}

export const PlainBanner = (props: BannerProps) => {
  const { boldText, messageText, buttonText, showBanner } = props
  return (
    <Box as="section" pt="8" pb="12" hidden={!showBanner}>
      <Stack
        direction={{ base: 'column', sm: 'row' }}
        py="3"
        px={{ base: '3', md: '6', lg: '8' }}
        color="white"
        bg={useColorModeValue('blue.600', 'blue.400')}
        justifyContent="center"
        alignItems="center"
      >
        <HStack direction="row" spacing="3">
          <Box as={BellIcon} fontSize="2xl" h="10" />
          <Text fontWeight="medium" marginEnd="2">
            <b>{`${boldText},`} </b>
            {messageText}{' '}
          </Text>
        </HStack>
        <ActionLink w={{ base: 'full', sm: 'auto' }} flexShrink={0}>
          {buttonText}
        </ActionLink>
      </Stack>
    </Box>
  )
}
