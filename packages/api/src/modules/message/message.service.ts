import { UserInputError } from 'apollo-server-express'
import { Service, Inject } from 'typedi'
import { User } from '../user/user.entity'
import { Message } from './message.entity'
import { Security } from '../security/security.entity'
import { MessageRespository } from './message.repository'
import { CreateMessageInput } from './inputs/createMessage.input'
import { RemoveMessageInput } from './inputs/removeMessage.input'
import { ReplyToMessageInput } from './inputs/replyMessage.input'

@Service()
export class MessageService {
  @Inject(() => MessageRespository)
  messageRepository: MessageRespository

  async create(data: CreateMessageInput, user: User) {
    const security = await Security.findOne({ where: { symbolId: data.symbolId } })
    if (!security) throw new UserInputError('Symbol not found')
    const message = await Message.create({ ...data, security, user }).save()
    return message
  }

  async reply(data: ReplyToMessageInput, user: User) {
    const where = { messageId: data.messageId }
    const parent = await Message.findOne({ where })
    if (!parent) throw new UserInputError('Message not found')
    const reply = { ...data, user, parent, security: parent.security }
    const message = await Message.create(reply).save()
    return message
  }

  async remove(data: RemoveMessageInput, user: User) {
    const message = await Message.findOneOrFail({
      where: { user: { id: user.id }, messageId: data.messageId },
    })
    if (!message) throw new UserInputError('Message not found')
    const deleted = await Message.softRemove([message, ...message.children])
    return {
      deleted: deleted.length,
      messageId: data.messageId,
    }
  }
}
