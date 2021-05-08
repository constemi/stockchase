import cuid from 'cuid'
import { BeforeInsert, Entity, ManyToOne } from 'typeorm'
import { Field, ObjectType } from 'type-graphql'

import { BaseEntity } from '../shared/base.entity'
import { BooleanField, StringField, IntField, NumericField } from '../shared/fields'
import { User } from '../user/user.entity'

/* 
{
    'quantity': "1",
    'amountExcludingTax': "450",
    'taxPercentage': "1111",
    'description': "Sunglasses",
    'id': "Item #1",
    'taxAmount': "50",
    'amountIncludingTax': "500",
    'taxCategory': "High"
}
*/

@ObjectType()
@Entity()
export class Payment extends BaseEntity<Payment> {
  @StringField({ unique: true, nullable: true })
  invoiceId: string

  @BooleanField()
  invoiceDelivered: boolean

  @StringField({ nullable: true, protected: true })
  paymentId: string | null // stripe or ayden payment object id

  @StringField({ nullable: true, protected: true })
  productId: string | null

  @IntField({ default: 1, nullable: false })
  quantity: number

  @StringField({ nullable: true })
  productDesc: string | null

  @StringField({ nullable: true, protected: true })
  discountToken: string | null

  @BooleanField({ default: false, nullable: false, protected: true })
  tokenRedeemed: boolean

  @NumericField({ nullable: true })
  taxAmount: number | undefined // BC 7%-PST + 5%-GST -> 0.012

  @NumericField({ nullable: true })
  amountExcludingTax: number | undefined // in cents

  @NumericField({ nullable: true })
  amountIncludingTax: number | undefined // in cents

  @StringField({ nullable: true })
  last4: string | undefined

  @StringField({ nullable: true })
  cardType: string | undefined

  @BooleanField({ default: false, nullable: false, protected: true })
  paid: boolean

  @BooleanField({ default: false, nullable: false, protected: true })
  refunded: boolean

  // RELATIONS

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.payments)
  user: User

  // FIELD HELPERS

  // ENTITY HELPERS

  async update(data: Partial<Payment>) {
    Object.assign(this, data)
    return this.save()
  }

  // HOOKS

  @BeforeInsert()
  async initValues(): Promise<void> {
    this.invoiceId = cuid()
  }
}
