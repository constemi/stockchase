import { InputType, Field } from "type-graphql"
import { IsNotEmpty } from "class-validator"
import { User } from "../user.entity"

@InputType()
export class LoginInput implements Partial<User> {
  @IsNotEmpty()
  @Field()
  email: string

  @IsNotEmpty()
  @Field()
  password: string
}
