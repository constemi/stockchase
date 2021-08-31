import cookie from 'cookie'
import * as Yup from 'yup'
import { gql, useApolloClient } from '@apollo/client'
import { Box, Button, Flex, LightMode, Stack, Text, useColorModeValue as mode } from '@chakra-ui/react'
import React, { useState } from 'react'
import { InputField } from './InputField'
import { Captcha } from 'features/captcha/Captcha'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { MeFragmentDoc, LoginInput, MeQuery, MeDocument, useLoginMutation } from 'lib/graphql'
import { Form } from 'components/Form'
import { SESSION_TOKEN } from 'lib/config'
import { FormError } from 'components/FormError'
import { useForm } from 'lib/hooks/useForm'

export const LOGIN = gql`
  mutation Login($data: LoginInput!) {
    login(data: $data) {
      user {
        ...Me
      }
      token
    }
  }
  ${MeFragmentDoc}
`

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(8, 'Must be at least 8 characters'),
})

export function SigninForm() {
  const client = useApolloClient()

  const [hasFocus, setFocus] = useState(false)
  const [isSolved, setSolved] = useState(false)
  const [login, { loading }] = useLoginMutation()
  const router = useRouter()
  const redirectTo = router.query.redirectTo as string | undefined
  const form = useForm({ schema: LoginSchema })

  const onFocus = (event: React.FocusEvent<HTMLDivElement>) => {
    if (event.currentTarget !== event.target) {
      setFocus(true)
    }
  }

  const onSolve = (solution: string) => {
    if (solution) {
      setSolved(true)
    }
  }

  const onSubmit = (values: LoginInput) => {
    if (!isSolved) return
    return form.handler(() => login({ variables: { data: values } }), {
      onSuccess: (data) => {
        document.cookie = cookie.serialize(SESSION_TOKEN, data.login.token, {
          path: '/',
          secure: true,
          maxAge: 30 * 24 * 60 * 60, // 30 days
        })
        client.writeQuery<MeQuery>({
          query: MeDocument,
          data: { me: data.login.user },
        })
        router.replace(redirectTo || '/')
      },
    })
  }

  return (
    <Form onSubmit={onSubmit} {...form}>
      <Stack spacing="8">
        <div onFocus={onFocus}>
          <InputField name="email" label="Email" type="email" />
        </div>
        <Box>
          <InputField name="password" label="Password" type="password" />
          <Link passHref href="/forgot-password">
            <Box
              display="inline-block"
              as="a"
              href="#"
              color={mode('blue.600', 'blue.300')}
              fontWeight="semibold"
              fontSize="sm"
              mt="3"
            >
              Forgot password?
            </Box>
          </Link>
          <Captcha hasFocus={hasFocus} onSolve={onSolve} />
        </Box>
      </Stack>
      <Flex
        spacing="4"
        direction={{ base: 'column-reverse', md: 'row' }}
        mt="6"
        align="center"
        justify="space-between"
      >
        <Text color={mode('gray.600', 'gray.400')} fontSize="sm" fontWeight="semibold">
          New user?{' '}
          <Link passHref href="/register">
            <Box as="a" color={mode('blue.600', 'blue.300')}>
              Create account
            </Box>
          </Link>
        </Text>
        <LightMode>
          <Button
            mb={{ base: '4', md: '0' }}
            w={{ base: 'full', md: 'auto' }}
            type="submit"
            colorScheme="blue"
            size="lg"
            fontSize="md"
            fontWeight="bold"
            isLoading={loading}
            isDisabled={!isSolved || loading}
          >
            Sign in
          </Button>
          <FormError />
        </LightMode>
      </Flex>
    </Form>
  )
}
