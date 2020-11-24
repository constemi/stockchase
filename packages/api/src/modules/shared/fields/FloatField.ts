import { Field, Float } from "type-graphql"
import { Column } from "typeorm"

import { composeMethodDecorators, MethodDecoratorFactory } from "./utils"

interface FloatFieldOptions {
  nullable?: boolean
  default?: number
  graphql?: boolean
  deprecationReason?: string
}

export function FloatField({ deprecationReason, ...args }: FloatFieldOptions = {}): any {
  const nullableOption = args.nullable === true ? { nullable: true } : {}
  const defaultOption = args.default === undefined ? {} : { default: args.default }
  const factories = []
  if (args.graphql !== false) {
    factories.push(
      Field(() => Float, {
        ...nullableOption,
        deprecationReason,
      }),
    )
  }
  factories.push(
    Column({
      type: "float",
      ...nullableOption,
      ...defaultOption,
    }) as MethodDecoratorFactory,
  )

  return composeMethodDecorators(...factories)
}
