import { InputType, Field } from 'type-graphql'
import { IsEmail } from 'class-validator'
import { User } from '../user.entity'

@InputType()
export class CreateInput implements Partial<User> {
  @IsEmail()
  @Field()
  email: string
}
