import * as React from "react"
import { Textarea as CTextarea, FormControl, Flex, TextareaProps } from "@chakra-ui/react"
import { useFormContext, FieldError } from "react-hook-form"
import { InlineInputError, InputError } from "./InputError"
import { InputLabel, InlineInputLabel } from "./InputLabel"

interface Props extends TextareaProps {
  name: string
  label: string
  subLabel?: string
}

export const Textarea = ({ label, subLabel, ...props }: Props) => {
  const { register, errors } = useFormContext()
  const fieldError = errors?.[props.name] as FieldError | string

  return (
    <FormControl isInvalid={!!fieldError} isRequired={props.isRequired}>
      <InputLabel label={label} subLabel={subLabel} name={props.name} />
      <CTextarea ref={register} mb={0} variant="outline" bg="transparent" size="sm" {...props} />
      <InputError error={fieldError} />
    </FormControl>
  )
}

export const InlineTextarea = ({ label, subLabel, ...props }: Props) => {
  const { register, errors } = useFormContext()
  const fieldError = errors?.[props.name] as FieldError | string

  return (
    <FormControl isInvalid={!!fieldError} isRequired={props.isRequired}>
      <Flex>
        <InlineInputLabel label={label} subLabel={subLabel} name={props.name} />
        <CTextarea ref={register} mb={0} variant="outline" bg="transparent" size="sm" {...props} />
      </Flex>
      <InlineInputError error={fieldError} />
    </FormControl>
  )
}
