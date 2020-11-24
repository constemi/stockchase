import { Field, ArgsType } from "type-graphql"
import { PaginationArgs } from "./pagination.args"

@ArgsType()
export class TableArgs extends PaginationArgs {
  @Field({ nullable: true, defaultValue: "DESC" })
  order: "ASC" | "DESC"

  @Field({ nullable: true })
  orderBy?: string

  @Field(() => [String], { nullable: true })
  relations?: string[]

  @Field({ nullable: true })
  search?: string

  @Field(() => [String], { nullable: true })
  searchFields?: string[]
}
