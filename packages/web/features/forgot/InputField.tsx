import { FormControl, FormLabel, Input, InputProps, useColorModeValue as mode } from '@chakra-ui/react'
import { InputError } from 'components/InputError'
import { useFormContext, FieldError } from 'react-hook-form'
import * as React from 'react'

interface InputFieldProps extends InputProps {
  name: string
  label?: string
  subLabel?: string
}

export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>((props, ref) => {
  const {
    register,
    formState: { errors },
  } = useFormContext()
  const fieldError = errors?.[props.name] as FieldError | string

  const { label, ...rest } = props
  return (
    <FormControl position="relative" isInvalid={!!fieldError}>
      <FormLabel
        _focus={{ color: mode('blue.600', 'blue.300') }}
        fontWeight="semibold"
        position="absolute"
        color={mode('gray.600', 'white')}
        top="-3"
        insetStart="2"
        bg={{ base: mode('white', 'gray.700'), md: mode('white', 'gray.700'), sm: mode('white', 'gray.800') }}
        zIndex={2}
        px="2"
        mx="2"
      >
        {label}
      </FormLabel>
      <Input {...register(props.name)} size="lg" fontSize="md" />
      <InputError error={fieldError} />
    </FormControl>
  )
})

InputField.displayName = 'InputField'
