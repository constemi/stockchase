import { Badge, Box, Link, Stack, useColorModeValue as mode } from '@chakra-ui/react'
import * as React from 'react'

interface DescriptionProps {
  icon: React.ReactElement
  title: string
  uri: string
  children: React.ReactNode
  isRecommended?: boolean
}

export const Description = (props: DescriptionProps) => {
  const { title, uri, children, icon, isRecommended } = props

  return (
    <Stack direction={{ base: 'column', sm: 'row' }} spacing="5" justify="space-between" pos="relative">
      <Stack direction={{ base: 'column', sm: 'row' }} spacing="4" align="flex-start" flex="1">
        <Box aria-hidden fontSize="2xl" pt="1" color="gray.500">
          {icon}
        </Box>
        <Box flex="1">
          <Box as="h4" fontWeight="bold" maxW="xl">
            <Link href={uri} isExternal>
              <span>{title}</span> {isRecommended && <Badge marginStart="1">Recommended</Badge>}
            </Link>
          </Box>

          <Box maxW={{ base: 'xs', md: 'unset' }} color={mode('gray.600', 'gray.400')} fontSize="sm">
            {children}
          </Box>
        </Box>
      </Stack>
    </Stack>
  )
}
