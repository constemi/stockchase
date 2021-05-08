// import { User } from '../user.entity'
import { ObjectType, Field } from 'type-graphql'

@ObjectType()
export class MeResponse {
  @Field()
  email: string

  @Field()
  emailVerified: boolean

  @Field()
  firstName: string

  @Field()
  lastName: string
}
