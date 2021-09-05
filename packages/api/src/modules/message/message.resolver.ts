import { Inject, Service } from 'typedi'
import { getManager } from 'typeorm'
import { Resolver, Query, Mutation, Arg } from 'type-graphql'

import { User } from '../user/user.entity'
import { Message } from './message.entity'
import { MessageService } from './message.service'
import { MessageRespository } from './message.repository'
import { CreateMessageInput } from './inputs/createMessage.input'
import { RemoveMessageInput } from './inputs/removeMessage.input'
import { ReplyToMessageInput } from './inputs/replyMessage.input'
import { GetMessagesInput } from './inputs/getMessages.input'
import { GetMessageChildrenInput } from './inputs/getChildren.input'
import { AuthMiddleware } from '../../middleware/apolloAuthMiddleware'
import { RemoveMessageResponse } from './responses/remove.response'
import { MessageChildrenResponse } from './responses/children.response'
import { CurrentUser } from '../shared/context/currentUser'
import { Security } from '../security/security.entity'

@Service()
@Resolver(() => Message)
export class MessageResolver {
  @Inject(() => MessageService)
  messageService: MessageService
  @Inject(() => MessageRespository)
  messageRepo: MessageRespository

  // MUTATIONS
  @AuthMiddleware()
  @Mutation(() => Message)
  async createMessage(
    @CurrentUser() currentUser: User,
    @Arg('data') data: CreateMessageInput,
  ): Promise<Message> {
    return this.messageService.create(data, currentUser)
  }

  @AuthMiddleware()
  @Mutation(() => Message)
  async replyToMessage(
    @CurrentUser() currentUser: User,
    @Arg('data') data: ReplyToMessageInput,
  ): Promise<Message> {
    return this.messageService.reply(data, currentUser)
  }

  @AuthMiddleware()
  @Mutation(() => Message)
  async removeMessage(
    @CurrentUser() currentUser: User,
    @Arg('data') data: RemoveMessageInput,
  ): Promise<RemoveMessageResponse> {
    return this.messageService.remove(data, currentUser)
  }

  // QUERIES
  @Query(() => [Message], { nullable: true })
  async getMessages(@Arg('data') data: GetMessagesInput) {
    const security = await Security.findOneOrFail({ where: { symbolId: data.symbolId.trim() } })
    return await this.messageRepo.findAll({
      where: { security: { id: security.id }, parent: { id: null } },
      order: { createdAt: 'DESC' },
      take: 50,
    })
  }

  @Query(() => MessageChildrenResponse, { nullable: true })
  async getChildMessages(@Arg('data') data: GetMessageChildrenInput): Promise<MessageChildrenResponse> {
    const manager = getManager()
    const repository = manager.getTreeRepository(Message)
    const parent = await Message.findOneOrFail({
      where: { messageId: data.messageId },
    })
    const childMessageTree = await repository.findDescendantsTree(parent)
    const decendantsCount = await repository.countDescendants(parent)
    return {
      message: childMessageTree,
      descendants: decendantsCount,
    }
  }

  // FIELD RESOLVERS
}
