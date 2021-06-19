import React from 'react'
import { Box, BoxProps, Icon, useColorModeValue as mode } from '@chakra-ui/react'
import { FaHeart } from 'react-icons/fa'

export const DonateButton = (props: BoxProps) => (
  <Box
    display={{ base: 'none', lg: 'flex' }}
    alignItems="center"
    as="a"
    aria-label="Sponsor Stockchase"
    href="/payments"
    target="_blank"
    rel="noopener noreferrer"
    bg={mode('gray.50', 'gray.800')}
    borderWidth="1px"
    borderColor="gray.200"
    px="1em"
    minH="36px"
    borderRadius="md"
    fontSize="sm"
    color={mode('gray.800', 'whiteAlpha.800')}
    outline="0"
    transition="all 0.3s"
    _hover={{
      bg: mode('gray.100', 'gray.700'),
      borderColor: 'gray.300',
    }}
    _active={{
      borderColor: 'gray.200',
    }}
    _focus={{
      boxShadow: 'outline',
    }}
    {...props}
  >
    <Icon as={FaHeart} w="4" h="4" color="red.500" mr="2" />
    <Box as="strong" lineHeight="inherit" fontWeight="semibold">
      Donate
    </Box>
  </Box>
)
