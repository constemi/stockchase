import { InputType, Field } from 'type-graphql'
import { IsNotEmpty, IsString } from 'class-validator'
import { Message } from '../message.entity'

@InputType()
export class RemoveMessageInput implements Partial<Message> {
  @IsNotEmpty()
  @IsString()
  @Field()
  messageId: string
}
