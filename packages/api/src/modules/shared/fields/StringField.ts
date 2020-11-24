import { MaxLength, MinLength } from "class-validator"
import { Field } from "type-graphql"
import { Column, ColumnOptions } from "typeorm"

import { composeMethodDecorators, MethodDecoratorFactory } from "./utils"

interface StringFieldOptions extends ColumnOptions {
  maxLength?: number
  minLength?: number
  nullable?: boolean
  unique?: boolean
  default?: string
  graphql?: boolean
  deprecationReason?: string
}

export function StringField({ deprecationReason, ...args }: StringFieldOptions = {}): any {
  const nullableOption = args.nullable === true ? { nullable: true } : {}
  const maxLenOption = args.maxLength ? { length: args.maxLength } : {}
  const uniqueOption = args.unique ? { unique: true } : {}
  const defaultOpion = args.default ? { default: args.default } : {}

  const factories = []
  if (args.graphql !== false) {
    factories.push(
      Field(() => String, {
        ...nullableOption,
        deprecationReason,
      }),
    )
  }
  factories.push(
    Column({
      type: "character varying",
      ...maxLenOption,
      ...nullableOption,
      ...uniqueOption,
      ...defaultOpion,
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
