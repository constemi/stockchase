import { InputType, Field } from 'type-graphql'
import { IsNotEmpty, IsEmail } from 'class-validator'
import { User } from '../user.entity'

@InputType()
export class LoginInput implements Partial<User> {
  @IsEmail()
  @Field()
  email: string

  @IsNotEmpty()
  @Field()
  password: string
}
