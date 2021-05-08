import { InputType, Field } from 'type-graphql'
import { IsNotEmpty } from 'class-validator'
import { Message } from '../../message/message.entity'

@InputType()
export class GetMessageChildrenInput implements Partial<Message> {
  @IsNotEmpty()
  @Field()
  messageId: string
}
