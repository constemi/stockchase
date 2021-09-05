import cookie from 'cookie'
import Yup from 'lib/yup'
import { gql, useApolloClient } from '@apollo/client'
import { Box, Button, Flex, Input, LightMode, Stack, Text, useColorModeValue as mode } from '@chakra-ui/react'
import React, { useState } from 'react'
import { InputField } from './InputField'
import { Captcha } from 'features/captcha/Captcha'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { MutationForgotPasswordArgs, useForgotPasswordMutation } from 'lib/graphql'
import { Form } from 'components/Form'
import { SESSION_TOKEN } from 'lib/config'
import { FormError } from 'components/FormError'
import { useForm } from 'lib/hooks/useForm'
import { useToast } from 'lib/hooks/useToast'

export const FORGOT_PASSWORD = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`

const ResetSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
})

export function ForgotPassForm() {
  const [hasFocus, setFocus] = useState(false)
  const [isSolved, setSolved] = useState(false)
  const [reset, { loading }] = useForgotPasswordMutation()

  const toast = useToast()
  const router = useRouter()
  const client = useApolloClient()

  const redirectTo = router.query.redirectTo as string | undefined
  const defaultValues = { email: '' }
  const form = useForm({ schema: ResetSchema, defaultValues })

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

  const handleSubmit = (values: MutationForgotPasswordArgs) => {
    if (!isSolved) return
    return form.handler(() => reset({ variables: values }), {
      onSuccess: (data) => {
        console.log(data)
        toast({
          status: 'success',
          description: 'Email has been sent to ' + values.email,
        })
        router.push('/')
      },
    })
  }

  return (
    <Form {...form} onSubmit={handleSubmit}>
      <Stack spacing="8">
        <div onFocus={onFocus}>
          <InputField name="email" label="Email" type="email" />
          {/* <Input autoFocus name="email" placeholder="Email" /> */}
        </div>
        {/* <Box>
          <Captcha hasFocus={hasFocus} onSolve={onSolve} />
        </Box> */}
      </Stack>
      <Flex
        spacing="4"
        direction={{ base: 'column-reverse', md: 'row' }}
        mt="6"
        align="center"
        justify="space-between"
      >
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
            // isDisabled={!isSolved || loading}
          >
            Submit
          </Button>
          <FormError />
        </LightMode>
      </Flex>
    </Form>
  )
}
