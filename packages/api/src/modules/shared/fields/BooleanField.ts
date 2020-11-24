import { Field } from "type-graphql"
import { Column } from "typeorm"

import { composeMethodDecorators, MethodDecoratorFactory } from "./utils"

interface BooleanFieldOptions {
  default: boolean
  nullable?: boolean
  graphql?: boolean
  deprecationReason?: string
}

export function BooleanField(
  { deprecationReason, ...args }: BooleanFieldOptions = {
    default: false,
    nullable: false,
  },
): any {
  const factories = []
  if (args.graphql !== false) {
    factories.push(
      Field(() => Boolean, {
        ...args,
        deprecationReason,
      }),
    )
  }
  factories.push(
    Column({
      type: "boolean",
      ...args,
    }) as MethodDecoratorFactory,
  )

  return composeMethodDecorators(...factories)
}
