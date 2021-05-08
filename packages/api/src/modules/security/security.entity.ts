import cuid from 'cuid'
import { BeforeInsert, Entity, OneToMany } from 'typeorm'
import { ObjectType, Field } from 'type-graphql'

import { BaseEntity } from '../shared/base.entity'
import { StringField, NumericField, BooleanField, TsVectorField } from '../shared/fields'
import { Message } from '../message/message.entity'

// const sample = {
//   currency: 'CAD',
//   description: 'LABRADOR IRON ORE ROYALTY CO',
//   displaySymbol: 'LIF.TO',
//   figi: 'BBG000HRCWP0',
//   mic: 'XTSE',
//   symbol: 'LIF.TO',
//   type: 'Common Stock',
// }

@ObjectType()
@Entity()
export class Security extends BaseEntity<Security> {
  @StringField()
  currency: string

  @StringField()
  description: string

  @StringField()
  displaySymbol: string

  @StringField()
  figi: string

  @StringField()
  mic: string

  @StringField()
  symbolId: string

  @StringField()
  symbol: string

  @StringField()
  simple: string

  @StringField()
  type: string

  @BooleanField()
  trending: boolean

  @NumericField({ nullable: true })
  trendingScore: number

  @TsVectorField({ select: false, nullable: true })
  documentWithWeights: any

  // RELATIONS
  @Field(() => [Message], { nullable: 'items' })
  @OneToMany(() => Message, (message) => message.security, { lazy: true })
  messages: Message[]

  // ENTITY HELPERS
  async update(data: Partial<Security>) {
    Object.assign(this, data)
    return this.save()
  }

  // HOOKS
  @BeforeInsert()
  async initValues(): Promise<void> {
    this.symbolId = cuid()
  }
}
