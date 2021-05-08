import { Field, Int } from 'type-graphql'
import { Column } from 'typeorm'

import { composeMethodDecorators, MethodDecoratorFactory } from './utils'

interface IntFieldOptions {
  nullable?: boolean
  default?: number
  protected?: boolean
  deprecationReason?: string
}

export function IntField({ deprecationReason, ...args }: IntFieldOptions = {}): any {
  const nullableOption = args.nullable === true ? { nullable: true } : {}
  const defaultOption = args.default === undefined ? {} : { default: args.default }
  const factories = []
  if (!args.protected) {
    factories.push(
      Field(() => Int, {
        ...nullableOption,
        deprecationReason,
      }),
    )
  }
  factories.push(
    Column({
      type: 'int',
      ...nullableOption,
      ...defaultOption,
    }) as MethodDecoratorFactory,
  )

  return composeMethodDecorators(...factories)
}
