import { Field } from "type-graphql"
import { Column, ColumnType } from "typeorm"

import { composeMethodDecorators, MethodDecoratorFactory } from "./utils"

interface DateFieldOptions {
  nullable?: boolean
  graphql?: boolean
  type?: ColumnType
  deprecationReason?: string
}

export function DateTimeField({ deprecationReason, ...args }: DateFieldOptions = {}): any {
  const nullableOption = args.nullable === true ? { nullable: true } : {}
  const type = args.type || "timestamp with time zone"
  const factories = []
  if (args.graphql !== false) {
    factories.push(
      Field(() => Date, {
        ...nullableOption,
        deprecationReason,
      }),
    )
  }
  factories.push(
    Column({
      type,
      ...nullableOption,
    }) as MethodDecoratorFactory,
  )

  return composeMethodDecorators(...factories)
}
