import { FindOneOptions, FindManyOptions } from 'typeorm'
import { UserInputError } from 'apollo-server-express'
import { Service } from 'typedi'
import { Message } from './message.entity'

@Service()
export class MessageRespository {
  findAll(options?: FindManyOptions<Message>) {
    return Message.find(options)
  }
  async findById(messageId: string, options?: FindOneOptions<Message>): Promise<Message> {
    try {
      return await Message.findOneOrFail(messageId, options)
    } catch {
      throw new UserInputError('Message not found')
    }
  }
}
