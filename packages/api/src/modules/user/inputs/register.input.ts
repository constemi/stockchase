import { InputType, Field } from 'type-graphql'
import { IsNotEmpty, IsEmail } from 'class-validator'
import { User } from '../user.entity'

@InputType()
export class RegisterInput implements Partial<User> {
  @IsNotEmpty()
  @Field()
  firstName: string

  @IsNotEmpty()
  @Field()
  lastName: string

  @IsEmail()
  @Field()
  email: string

  @IsNotEmpty()
  @Field()
  password: string
}
