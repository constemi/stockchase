import { Field } from 'type-graphql'
import { Column } from 'typeorm'

import { composeMethodDecorators, MethodDecoratorFactory } from './utils'

interface TsVectorFieldOptions {
  nullable?: boolean
  select?: boolean
  protected?: boolean
  deprecationReason?: string
}

export function TsVectorField({ deprecationReason, ...args }: TsVectorFieldOptions = {}): any {
  const nullableOption = args.nullable === true ? { nullable: true } : {}
  const selectableOption = args.select === false ? { select: false } : {} // select defaults to true

  const factories = []
  if (!args.protected) {
    factories.push(
      Field(() => Number, {
        ...nullableOption,
        ...selectableOption,
        deprecationReason,
      }),
    )
  }
  factories.push(
    Column({
      type: 'tsvector',
      ...nullableOption,
      ...selectableOption,
    }) as MethodDecoratorFactory,
  )

  return composeMethodDecorators(...factories)
}
