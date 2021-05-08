// import { Message } from '../message.entity'
import { ObjectType, Field } from 'type-graphql'

@ObjectType()
class Author {
  @Field()
  firstName?: string
}

@ObjectType()
export class MessageChildren {
  @Field()
  messageId: string

  @Field()
  content: string

  @Field()
  user: Author

  @Field(() => [MessageChildren])
  children: MessageChildren[]
}

@ObjectType()
export class MessageChildrenResponse {
  @Field()
  descendants: number

  @Field()
  message: MessageChildren
}
