// import { Security } from '../security.entity'
import { ObjectType, Field } from 'type-graphql'

@ObjectType()
export class SearchSecurityResponse {
  @Field()
  symbolId: string

  @Field()
  displaySymbol: string

  @Field()
  figi: string

  @Field()
  type: string

  @Field()
  currency: string

  @Field()
  description: string
}
