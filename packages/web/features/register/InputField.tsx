import { FormControl, FormLabel, Input, InputProps } from '@chakra-ui/react'
import { InputError } from 'components/InputError'
import { useFormContext, FieldError } from 'react-hook-form'
import * as React from 'react'

interface InputFieldProps extends InputProps {
  name: string
  label?: string
  subLabel?: string
}

export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>((props, ref) => {
  const { register, errors } = useFormContext()
  const fieldError = errors?.[props.name] as FieldError | string

  const { label, ...rest } = props
  return (
    <FormControl position="relative" isInvalid={!!fieldError}>
      <FormLabel mb={1}>{label}</FormLabel>
      <Input ref={register} size="lg" fontSize="md" {...rest} />
      <InputError error={fieldError} />
    </FormControl>
  )
})

InputField.displayName = 'InputField'
