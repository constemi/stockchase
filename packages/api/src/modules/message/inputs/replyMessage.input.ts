import { InputType, Field } from 'type-graphql'
import { IsNotEmpty, IsOptional, IsFQDN } from 'class-validator'
import { Message } from '../message.entity'

@InputType()
export class ReplyToMessageInput implements Partial<Message> {
  @IsNotEmpty()
  @Field()
  messageId: string

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
