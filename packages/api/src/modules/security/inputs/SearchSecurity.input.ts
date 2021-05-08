import { InputType, Field } from 'type-graphql'
import { Length } from 'class-validator'
import { Security } from '../security.entity'

@InputType()
export class SearchSecurityInput implements Partial<Security> {
  @Length(1, 25)
  @Field()
  symbol: string
}
