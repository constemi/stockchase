import { Button, Stack } from '@chakra-ui/react'
import React, { useState } from 'react'
import cookie from 'cookie'
import * as Yup from 'yup'
import { gql, useApolloClient } from '@apollo/client'
import { useRouter } from 'next/router'
import { Captcha } from 'features/captcha/Captcha'
import { InputField } from './InputField'
import { Form } from 'components/Form'
import { MeFragmentDoc, RegisterInput, MeQuery, MeDocument, useRegisterMutation } from 'lib/graphql'
import { SESSION_TOKEN } from 'lib/config'
import { FormError } from 'components/FormError'
import { useForm } from 'lib/hooks/useForm'

export const REGISTER = gql`
  mutation Register($data: RegisterInput!) {
    register(data: $data) {
      user {
        ...Me
      }
      token
    }
  }
  ${MeFragmentDoc}
`

const RegisterSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(8, 'Must be at least 8 characters').required('Required'),
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
})

interface SignupFormProps {
  setEmail: (email: string) => void
}

export const SignupForm = (props: SignupFormProps) => {
  const client = useApolloClient()

  const [hasFocus, setFocus] = useState(false)
  const [isSolved, setSolved] = useState(false)
  const [register, { loading }] = useRegisterMutation()
  const router = useRouter()
  const redirectTo = router.query.redirectTo as string | undefined
  const form = useForm({ schema: RegisterSchema })

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

  const onSubmit = (values: RegisterInput) => {
    if (!isSolved) return
    return form.handler(() => register({ variables: { data: values } }), {
      onSuccess: (data) => {
        props.setEmail(values.email)
        document.cookie = cookie.serialize(SESSION_TOKEN, data.register.token, {
          path: '/',
          maxAge: 30 * 24 * 60 * 60, // 30 days
        })
        client.writeQuery<MeQuery>({
          query: MeDocument,
          data: { me: data.register.user },
        })
        router.replace(redirectTo || '/')
      },
    })
  }
  return (
    <Form onSubmit={onSubmit} {...form}>
      <div onFocus={onFocus}>
        <Stack spacing="4">
          <InputField name="firstName" label="First Name" autoComplete="name" />
          <InputField name="lastName" label="Last Name" autoComplete="name" />
          <InputField name="email" label="Email" type="email" autoComplete="email" />
          <InputField name="password" label="Password" type="password" autoComplete="current-password" />
          <Captcha hasFocus={hasFocus} onSolve={onSolve} />

          <Button
            type="submit"
            colorScheme="blue"
            size="lg"
            fontSize="md"
            isLoading={loading}
            disabled={!isSolved || loading}
          >
            Create my account
          </Button>
          <FormError />
        </Stack>
      </div>
    </Form>
  )
}
