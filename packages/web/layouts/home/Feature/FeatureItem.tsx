import { Box, Stack, Text, useColorModeValue as mode } from '@chakra-ui/react'
import * as React from 'react'

interface FeatureProps {
  title: string
  children: string
  icon: React.ReactElement
}

export const FeatureItem = (props: FeatureProps) => {
  const { title, children, icon } = props
  return (
    <Stack spacing="6" direction={{ base: 'column', md: 'row' }}>
      <Box data-testid="iconContainer" fontSize="6xl">
        {icon}
      </Box>
      <Stack spacing="1">
        <Text fontWeight="extrabold" fontSize="lg">
          {title}
        </Text>
        <Box color={mode('gray.600', 'gray.400')}>{children}</Box>
      </Stack>
    </Stack>
  )
}
