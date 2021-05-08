import cuid from 'cuid'
import { BeforeInsert, Entity, Tree, ManyToOne, TreeChildren, TreeParent } from 'typeorm'
import { Field, ObjectType } from 'type-graphql'

import { BaseEntity } from '../shared/base.entity'
import { StringField } from '../shared/fields'
import { User } from '../user/user.entity'
import { Security } from '../security/security.entity'

@ObjectType()
@Entity()
@Tree('materialized-path')
export class Message extends BaseEntity<Message> {
  @StringField()
  messageId: string

  @StringField()
  content: string

  @StringField({ nullable: true })
  embedUrl: string | null

  @StringField({ nullable: true })
  fileUrl: string | null

  // RELATIONS

  @Field(() => [Message])
  @TreeChildren()
  children: Message[]

  @TreeParent()
  parent: Message

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.messages, { lazy: true })
  user: User

  @Field(() => Security)
  @ManyToOne(() => Security, (security) => security.messages, { eager: true, onDelete: 'CASCADE' })
  security: Security

  // FIELD HELPERS

  // ENTITY HELPERS
  async update(data: Partial<Message>) {
    if (data.fileUrl) {
      data.fileUrl = data.fileUrl.trim()
    }
    if (data.embedUrl) {
      data.embedUrl = data.embedUrl.trim()
    }
    Object.assign(this, data)
    return this.save()
  }

  // HOOKS
  @BeforeInsert()
  async initValues(): Promise<void> {
    this.messageId = cuid()
  }
}

// https://typeorm.io/#/tree-entities/adjacency-list #materialized-path
// const childMessageTree = await repository.findDescendantsTree(parent);
// returns all direct submessages (with their nested messages) of a parent

// const hasCommentsCount = await repository.countDescendants(parent);

// Saving
// const parentMessage = new Message({ id: 1, content: "hello"}).save()
// const replyToParent = new Message({ id: 2, content: "hello back", parent: 1 }).save()
// const replytoChild = new Message({ id: 3, content: "hey both of you", parent: 2 }).save()
