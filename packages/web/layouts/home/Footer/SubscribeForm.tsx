import { Box, Button, FormControl, FormLabel, Input, useColorModeValue as mode } from '@chakra-ui/react'
import * as React from 'react'

interface SubscribeFormProps {
  handleSubmit: (event: React.SyntheticEvent) => void
}

export const SubscribeForm = (props: SubscribeFormProps) => {
  const { handleSubmit } = props
  return (
    <form data-testid="form" onSubmit={(e: React.SyntheticEvent) => handleSubmit(e)}>
      <Box mt="8" display={{ md: 'flex' }} maxW="xl">
        <FormControl id="email" marginEnd="-1px">
          <FormLabel srOnly>Enter your email</FormLabel>
          <Input
            data-testid="input"
            roundedRight={{ md: '0' }}
            mb={{ base: '2', lg: '0' }}
            flex="1"
            bg={mode('white', 'gray.900')}
            placeholder="Your email"
          />
        </FormControl>
        <Button
          w={{ base: 'full', md: 'auto' }}
          fontSize="sm"
          px="8"
          roundedLeft={{ md: '0' }}
          colorScheme="blue"
          textTransform="uppercase"
          fontWeight="bold"
          letterSpacing="wide"
        >
          Subscribe
        </Button>
      </Box>
    </form>
  )
}
