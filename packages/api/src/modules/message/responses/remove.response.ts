// import { Message } from '../message.entity'
import { ObjectType, Field } from 'type-graphql'

@ObjectType()
export class RemoveMessageResponse {
  @Field()
  deleted: number

  @Field()
  messageId: string
}
