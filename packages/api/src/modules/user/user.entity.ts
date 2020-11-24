import { BeforeInsert, Entity } from "typeorm"
import { ObjectType, Field } from "type-graphql"
import bcrypt from "bcryptjs"

import { BaseEntity } from "../shared/base.entity"
import { StringField } from "../shared/fields"

@ObjectType()
@Entity()
export class User extends BaseEntity<User> {
  @StringField({ unique: true })
  email: string

  @StringField()
  password: string

  @StringField({ nullable: true })
  firstName: string | null

  @StringField({ nullable: true })
  lastName: string | null

  // RELATIONS

  // FIELD HELPERS

  @Field(() => String)
  fullName() {
    if (!this.firstName && !this.lastName) return ""
    return (this.firstName + " " + this.lastName).trim()
  }

  // ENTITY HELPERS
  async update(data: Partial<User>) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10)
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
      this.password = await bcrypt.hash(this.password, 10)
    }
    if (this.email) {
      this.email = this.email.trim().toLowerCase()
    }
  }
}
