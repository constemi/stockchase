import { Box, Stack, Text } from '@chakra-ui/react'
import * as React from 'react'
import { LinkGroupData } from '../shared/_data'

interface LinkGroupProps {
  data: LinkGroupData
}

export const LinkGroup = (props: LinkGroupProps) => {
  const {
    data: { links, title },
  } = props

  return (
    <Box>
      <Text textTransform="uppercase" mb={{ base: '6', md: '10' }} fontWeight="bold" letterSpacing="wide">
        {title}
      </Text>
      <Stack as="ul" spacing={{ base: 2, md: 4 }} listStyleType="none">
        {links.map((link, idx) => (
          <Box as="li" key={idx}>
            <Box as="a" href={link.href} _hover={{ textDecoration: 'underline' }}>
              <span>{link.label}</span>
              {link.badge && (
                <Box as="span" ml="2">
                  {link.badge}
                </Box>
              )}
            </Box>
          </Box>
        ))}
      </Stack>
    </Box>
  )
}
