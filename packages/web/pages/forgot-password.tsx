import * as React from 'react'
import { Box, Center } from '@chakra-ui/react'
import Head from 'next/head'
import { ForgotPassForm } from 'features/forgot/ForgotPassForm'

export default function ForgotPassword() {
  return (
    <Center minH="100vh">
      <Head>
        <title>Stockchase - Forgot password</title>
      </Head>
      <Box w={['100%', 400]}>
        <ForgotPassForm />
      </Box>
    </Center>
  )
}
