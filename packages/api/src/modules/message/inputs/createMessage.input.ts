import { InputType, Field } from 'type-graphql'
import { IsNotEmpty, IsOptional, IsFQDN } from 'class-validator'
import { Message } from '../../message/message.entity'

@InputType()
export class CreateMessageInput implements Partial<Message> {
  @IsNotEmpty()
  @Field()
  symbolId: string

  @IsNotEmpty()
  @Field()
  content: string

  @IsOptional()
  @IsFQDN()
  @Field({ nullable: true })
  embedUrl?: string

  @IsOptional()
  @IsFQDN()
  @Field({ nullable: true })
  fileUrl?: string
}
