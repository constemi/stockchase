import * as React from "react"
import { FormControl, FormErrorMessage } from "@chakra-ui/react"
import { useFormContext, UseFormMethods } from "react-hook-form"

interface Props {
  error?: string
}
export const FormError: React.FC<Props> = (props) => {
  const { appError } = useFormContext() as UseFormMethods<Record<string, any>> & {
    appError?: string
  }
  if (!appError && !props.error) return null
  return (
    <FormControl isInvalid={!!appError || !!props.error}>
      <FormErrorMessage>{appError || props.error}</FormErrorMessage>
    </FormControl>
  )
}
