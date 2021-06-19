import { ButtonProps } from '@chakra-ui/button'
import { Button } from '@chakra-ui/react'
import * as React from 'react'
import { FaGoogle } from 'react-icons/fa'

export const RegisteredButton = (props: ButtonProps) => (
  <Button
    fontSize="sm"
    fontWeight="bold"
    size="lg"
    leftIcon={<FaGoogle fontSize="18px" />}
    iconSpacing="3"
    colorScheme="red"
    width="full"
    {...props}
  >
    Already Registered
  </Button>
)
