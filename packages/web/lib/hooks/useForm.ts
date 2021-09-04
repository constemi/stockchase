import * as React from 'react'
import {
  useForm as useHookForm,
  UseFormOptions,
  useFormContext as useHookFormContext,
  FieldError,
  UseFormMethods,
} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { ExecutionResult } from 'graphql'

import { MutationHandler, useMutationHandler } from './useMutationHandler'
import * as Yup from 'yup'

interface Props<T> extends UseFormOptions<T> {
  schema?: Yup.ObjectSchema<any>
}
export function useForm<T extends Record<string, any>>(props?: Props<T>) {
  const [appError, setAppError] = React.useState<string | null | undefined>()
  const mutationHandler = useMutationHandler()
  const form = useHookForm<T>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    criteriaMode: 'all',
    resolver: props?.schema && yupResolver(props.schema),
    ...props,
  })

  const setFieldErrors = (errors: FieldError[]) =>
    errors.forEach((error) => form.setError(error.type as any, error))

  async function handler<T>(
    mutation: () => Promise<ExecutionResult<NonNullable<T>> | void>,
    handler?: MutationHandler<T>,
  ) {
    setAppError(null)
    return mutationHandler(mutation, handler, { setAppError, setFieldErrors })
  }

  return {
    ...form,
    appError,
    setAppError,
    handler,
    handleSubmit: form.handleSubmit as UseFormMethods<T>['handleSubmit'],
  }
}

export type UseAppFormContextOptions = UseFormMethods<any> & {
  appError?: string
}

export function useFormContext() {
  return useHookFormContext() as UseAppFormContextOptions
}
