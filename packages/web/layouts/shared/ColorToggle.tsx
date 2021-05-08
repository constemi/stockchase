import { BiMoon, BiSun } from 'react-icons/bi'
import { Box, IconButton, useColorMode } from '@chakra-ui/react'
import * as React from 'react'

export const ColorToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const isDark = colorMode === 'dark'
  return (
    <Box pos="absolute" bottom={4} right={4} zIndex={99}>
      <IconButton
        borderRadius="full"
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        variant="ghost"
        onClick={toggleColorMode}
        icon={<Box as={isDark ? BiSun : BiMoon} boxSize="20px" />}
      />
    </Box>
  )
}
