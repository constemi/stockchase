import { Box, Heading, Text, useColorModeValue as mode } from '@chakra-ui/react'
import * as React from 'react'
import NextLink from 'next/link'
import { GradientBanner } from 'features/banner/GradientBanner'
import { Logo } from 'layouts/shared/Logo'
import { SignupForm } from 'features/register/RegisterForm'

export default function Register() {
  const [submittedEmail, setEmail] = React.useState('')
  return (
    <Box minH="100vh" bg={{ md: mode('gray.100', 'inherit') }}>
      <GradientBanner
        showBanner={Boolean(submittedEmail)}
        boldText="Confirm your email"
        buttonText="Resend email"
        messageText={`we've sent a message to ${submittedEmail}`}
      />
      <Box maxW="6x1" mx="auto" py={{ base: '10', md: '20' }} px={{ base: '4', md: '10' }}>
        <Box w="full" maxW="xl" mx="auto">
          <Box
            bg={{ md: mode('white', 'gray.700') }}
            rounded={{ md: '2xl' }}
            p={{ base: '4', md: '12' }}
            borderWidth={{ md: '1px' }}
            borderColor={mode('gray.200', 'transparent')}
            shadow={{ md: 'lg' }}
          >
            <NextLink href="/" passHref>
              <Box as="a">
                <Logo
                  h="6"
                  mb={{ base: '16', md: '10' }}
                  iconColor="blue.600"
                  mx={{ base: 'auto', md: 'unset' }}
                />
              </Box>
            </NextLink>
            <Box mb="8" textAlign={{ base: 'center', md: 'start' }}>
              <Heading size="lg" mb="2" fontWeight="extrabold">
                Welcome to StockChase
              </Heading>
              <Text fontSize="lg" color={mode('gray.600', 'gray.400')} fontWeight="medium">
                Enter your info to get started
              </Text>
            </Box>
            <SignupForm setEmail={setEmail} />
          </Box>

          <Text mt="8" align="center" fontWeight="medium">
            Already have an account?{' '}
            <NextLink href="/login" passHref>
              <Box
                as="a"
                color={mode('blue.600', 'blue.200')}
                display={{ base: 'block', md: 'inline-block' }}
              >
                Log in to StockChase
              </Box>
            </NextLink>
          </Text>
        </Box>
      </Box>
    </Box>
  )
}
