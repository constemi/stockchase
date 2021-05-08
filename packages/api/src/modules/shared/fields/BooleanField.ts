import { Field } from 'type-graphql'
import { Column } from 'typeorm'

import { composeMethodDecorators, MethodDecoratorFactory } from './utils'

interface BooleanFieldOptions {
  default: boolean
  nullable?: boolean
  protected?: boolean
  deprecationReason?: string
}

export function BooleanField(
  { deprecationReason, ...args }: BooleanFieldOptions = {
    default: false,
    nullable: false,
  },
): any {
  // remove the protected key before passing args to col/field
  const restArgs = Object.fromEntries(Object.entries(args).filter(([k]) => k !== 'protected'))

  const factories = []
  if (!args.protected) {
    factories.push(
      Field(() => Boolean, {
        ...restArgs,
        deprecationReason,
      }),
    )
  }
  factories.push(
    Column({
      type: 'boolean',
      ...restArgs,
    }) as MethodDecoratorFactory,
  )

  return composeMethodDecorators(...factories)
}
