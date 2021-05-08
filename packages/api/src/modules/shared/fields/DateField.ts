import { Field } from 'type-graphql'
import { Column } from 'typeorm'

import { composeMethodDecorators, MethodDecoratorFactory } from './utils'

interface DateFieldOptions {
  nullable?: boolean
  protected?: boolean
}

export function DateField(args: DateFieldOptions = {}): any {
  const nullableOption = args.nullable === true ? { nullable: true } : {}

  const factories = []
  if (!args.protected) {
    factories.push(
      Field(() => String, {
        ...nullableOption,
      }),
    )
  }
  factories.push(
    Column({
      type: 'date',
      ...nullableOption,
    }) as MethodDecoratorFactory,
  )

  return composeMethodDecorators(...factories)
}
