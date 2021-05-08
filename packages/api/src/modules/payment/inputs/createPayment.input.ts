import { InputType, Field } from 'type-graphql'
import { IsNotEmpty } from 'class-validator'
import { Payment } from '../payment.entity'

@InputType()
export class CreatePaymentInput implements Partial<Payment> {
  @IsNotEmpty()
  @Field()
  paymentId: string

  @IsNotEmpty()
  @Field()
  productId: string
}
