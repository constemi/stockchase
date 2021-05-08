import { InputType, Field } from 'type-graphql'
import { IsNotEmpty } from 'class-validator'
import { Security } from '../../security/security.entity'

@InputType()
export class GetMessagesInput implements Partial<Security> {
  @IsNotEmpty()
  @Field()
  symbolId: string
}
