import { ObjectType, Field } from "type-graphql"

@ObjectType()
export class BulkSignedResponse {
  @Field()
  url: string

  @Field()
  key: string
}
