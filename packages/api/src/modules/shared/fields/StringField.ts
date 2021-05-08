import { MaxLength, MinLength } from 'class-validator'
import { Field } from 'type-graphql'
import { Column, ColumnOptions } from 'typeorm'
import { EncryptionTransformer } from 'typeorm-encrypted'
import { composeMethodDecorators, MethodDecoratorFactory } from './utils'
import { ENCRYPTION_KEY, INITIAL_VECTOR } from '../../../lib/config'

interface StringFieldOptions extends ColumnOptions {
  maxLength?: number
  minLength?: number
  nullable?: boolean
  unique?: boolean
  encrypt?: boolean
  default?: string
  protected?: boolean
  deprecationReason?: string
}

export const EncryptionTransformerConfig = {
  key: ENCRYPTION_KEY as string,
  algorithm: 'aes-256-cbc',
  ivLength: 16,
  iv: INITIAL_VECTOR as string,
}

export function StringField({ deprecationReason, ...args }: StringFieldOptions = {}): any {
  const nullableOption = args.nullable === true ? { nullable: true } : {}
  const maxLenOption = args.maxLength ? { length: args.maxLength } : {}
  const uniqueOption = args.unique ? { unique: true } : {}
  const defaultOption = args.default ? { default: args.default } : {}
  const transformerOption = args.encrypt
    ? {
        transformer: new EncryptionTransformer({
          ...EncryptionTransformerConfig,
        }),
      }
    : {}

  const factories = []
  factories.push(
    Field(() => String, {
      ...nullableOption,
      deprecationReason,
    }),
  )
  factories.push(
    Column({
      type: 'character varying',
      ...maxLenOption,
      ...nullableOption,
      ...uniqueOption,
      ...defaultOption,
      ...transformerOption,
    }) as MethodDecoratorFactory,
  )

  if (args.minLength) {
    factories.push(MinLength(args.minLength))
  }
  if (args.maxLength) {
    factories.push(MaxLength(args.maxLength))
  }

  return composeMethodDecorators(...factories)
}
