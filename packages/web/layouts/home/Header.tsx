import * as React from 'react'
import { Box, useColorModeValue as mode } from '@chakra-ui/react'
import { NavContent } from './Header/NavContent'

export function Header() {
  return (
    <Box pb="5rem">
      <Box as="header" bg={mode('white', 'gray.800')} position="relative" zIndex="10">
        <Box as="nav" aria-label="Main navigation" maxW="7xl" mx="auto" px={{ base: '6', md: '8' }}>
          <NavContent.Mobile display={{ base: 'flex', lg: 'none' }} />
          <NavContent.Desktop display={{ base: 'none', lg: 'flex' }} />
        </Box>
      </Box>
    </Box>
  )
}
