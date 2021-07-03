import { Box, Flex, Heading, LightMode, Link, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import * as React from 'react'
// import NextLink from 'next/link'
// import { GradientBanner } from 'features/banner/GradientBanner'
import { Logo } from 'layouts/shared/Logo'
import { Card } from 'features/passwordless/Card'
import { EmailLoginForm } from 'features/passwordless/EmailLoginForm'
import { RegisteredButton } from 'features/passwordless/RegisteredButton'

function Register() {
  return (
    <Box as="section" h="100vh" bgGradient={{ md: 'linear(to-r, blue.600, purple.600)' }} py="20">
      <Card maxW="2xl" mx="auto" textAlign="center">
        <Stack maxW="xs" mx="auto" spacing="8">
          <Flex justifyContent="center">
            <Logo />
          </Flex>
          <Stack spacing="3">
            <Heading as="h1" letterSpacing="tight">
              Hire the top freelancers in Dubai
            </Heading>
            <Text fontWeight="medium" color={useColorModeValue('gray.600', 'gray.400')}>
              Create an account and get 20% discount
            </Text>
          </Stack>

          <LightMode>
            <RegisteredButton />
          </LightMode>
          <EmailLoginForm onSubmit={(e) => e.preventDefault()} />

          <Box fontSize="sm">
            <Text fontWeight="medium" color={useColorModeValue('gray.600', 'gray.400')}>
              Already have an account?
            </Text>
            <Link fontWeight="semibold" color={useColorModeValue('blue.600', 'blue.300')}>
              Log back in
            </Link>
          </Box>
        </Stack>
        <Text mt="16" fontSize="xs" mx="auto" maxW="md" color={useColorModeValue('gray.600', 'gray.400')}>
          By continuing, you acknowledge that you have read, understood, and agree to our terms and condition
        </Text>
      </Card>
    </Box>
  )
}

export default Register
