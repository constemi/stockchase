import { InputType, Field } from "type-graphql"
import { IsNotEmpty, Length } from "class-validator"
import { User } from "../user.entity"

@InputType()
export class RegisterInput implements Partial<User> {
  @IsNotEmpty()
  @Field()
  firstName: string

  @IsNotEmpty()
  @Field()
  lastName: string

  @IsNotEmpty()
  @Length(8)
  @Field()
  email: string

  @IsNotEmpty()
  @Field()
  password: string
}
