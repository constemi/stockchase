import { InputType, Field } from 'type-graphql'
import { IsNotEmpty, MinLength } from 'class-validator'
import { User } from '../user.entity'

@InputType()
export class ResetPasswordInput implements Partial<User> {
  @MinLength(8)
  @IsNotEmpty()
  @Field()
  password: string

  @IsNotEmpty()
  @Field()
  token: string
}
