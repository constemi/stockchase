import { UserInputError } from 'apollo-server-express'
import { Service } from 'typedi'
import { FindOneOptions, FindManyOptions } from 'typeorm'
import { Payment } from './payment.entity'

@Service()
export class PaymentRespository {
  findAll(options?: FindManyOptions<Payment>) {
    return Payment.find(options)
  }
  async findById(userId: string, options?: FindOneOptions<Payment>): Promise<Payment> {
    try {
      return await Payment.findOneOrFail(userId, options)
    } catch {
      throw new UserInputError('Payment not found')
    }
  }
}
