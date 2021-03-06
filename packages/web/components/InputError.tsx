import * as React from 'react'
import { FieldError } from 'react-hook-form'
import { Box, Flex, FormErrorMessage } from '@chakra-ui/react'

interface Props {
  error: FieldError | string
}

export const InputError: React.FC<Props> = (props) => {
  if (!props.error) return null
  return (
    <>
      {typeof props.error === 'string' ? (
        <FormErrorMessage>{props.error}</FormErrorMessage>
      ) : props.error.message ? (
        <FormErrorMessage>{props.error.message}</FormErrorMessage>
      ) : (
        props.error.types &&
        Object.values(props.error.types).map((error, i) => (
          <FormErrorMessage key={i}>{error}</FormErrorMessage>
        ))
      )}
    </>
  )
}
export const InlineInputError: React.FC<Props> = (props) => {
  if (!props.error) return null
  return (
    <Flex justify="flex-end">
      <Box>
        {typeof props.error === 'string' ? (
          <FormErrorMessage fontSize="0.7rem">{props.error}</FormErrorMessage>
        ) : props.error.message ? (
          <FormErrorMessage fontSize="0.7rem">{props.error.message}</FormErrorMessage>
        ) : (
          props.error.types &&
          Object.values(props.error.types).map((error, i) => (
            <FormErrorMessage key={i} fontSize="0.7rem">
              {error}
            </FormErrorMessage>
          ))
        )}
      </Box>
    </Flex>
  )
}
