import { Field } from 'type-graphql'
import { Column } from 'typeorm'

import { composeMethodDecorators, MethodDecoratorFactory } from './utils'

interface UuidFieldOptions {
  nullable?: boolean
  unique?: boolean
  protected?: boolean
  deprecationReason?: string
}

export function UuidField({ deprecationReason, ...args }: UuidFieldOptions = {}): any {
  const nullableOption = args.nullable === true ? { nullable: true } : {}
  const uniqueOption = args.unique ? { unique: true } : {}

  const factories = []
  if (!args.protected) {
    factories.push(
      Field(() => String, {
        ...nullableOption,
        deprecationReason,
      }),
    )
  }
  factories.push(
    Column({
      type: 'character varying',
      ...nullableOption,
      ...uniqueOption,
    }) as MethodDecoratorFactory,
  )

  return composeMethodDecorators(...factories)
}
