import { Field } from 'type-graphql'
import { Column } from 'typeorm'

import { composeMethodDecorators, MethodDecoratorFactory } from './utils'

interface NumericFieldOptions {
  nullable?: boolean
  default?: number
  protected?: boolean
  deprecationReason?: string
}

export function NumericField({ deprecationReason, ...args }: NumericFieldOptions = {}): any {
  const nullableOption = args.nullable === true ? { nullable: true } : {}
  const defaultOption = args.default === undefined ? {} : { default: args.default }

  const factories = []
  if (!args.protected) {
    factories.push(
      Field(() => Number, {
        ...nullableOption,
        deprecationReason,
      }),
    )
  }
  factories.push(
    Column({
      type: 'numeric',
      ...nullableOption,
      ...defaultOption,
    }) as MethodDecoratorFactory,
  )

  return composeMethodDecorators(...factories)
}
