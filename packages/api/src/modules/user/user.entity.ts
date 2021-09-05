import { BeforeInsert, Entity, OneToMany } from 'typeorm'
import { ObjectType, Field } from 'type-graphql'
import argon2 from 'argon2'
import { BaseEntity } from '../shared/base.entity'
import { BooleanField, StringField } from '../shared/fields'
import { Payment } from '../payment/payment.entity'
import { Message } from '../message/message.entity'

@ObjectType()
@Entity()
export class User extends BaseEntity<User> {
  @StringField({ unique: true, protected: true })
  email: string

  @StringField({ protected: true })
  password?: string

  @StringField({ nullable: true })
  username?: string

  @StringField({ nullable: true })
  firstName?: string

  @StringField({ nullable: true })
  lastName?: string

  @BooleanField({ default: false, protected: true })
  emailVerified: boolean

  // RELATIONS

  @Field(() => [Payment], { nullable: 'items' })
  @OneToMany(() => Payment, (payment) => payment.user, { lazy: true, cascade: true })
  payments: Payment[]

  @Field(() => [Message], { nullable: 'items' })
  @OneToMany(() => Message, (message) => message.user, { lazy: true, cascade: true })
  messages: Message[]

  // FIELD HELPERS

  @Field(() => String)
  fullName() {
    if (!this.firstName && !this.lastName) return ''
    return (this.firstName + ' ' + this.lastName).trim()
  }

  // ENTITY HELPERS
  async update(data: Partial<User>) {
    if (data.password) {
      data.password = await argon2.hash(data.password)
    }
    if (data.email) {
      data.email = data.email.trim().toLowerCase()
    }
    Object.assign(this, data)
    return this.save()
  }

  // HOOKS

  @BeforeInsert()
  async initValues(): Promise<void> {
    if (this.password) {
      this.password = await argon2.hash(this.password)
    }
    if (this.email) {
      this.email = this.email.trim().toLowerCase()
    }
  }
}
