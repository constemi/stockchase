import { Resolver, Query } from 'type-graphql'
import { Inject, Service } from 'typedi'
import { Payment } from './payment.entity'
import { PaymentService } from './payment.service'
import { PaymentRespository } from './payment.repository'
import { ContextUser } from '../shared/context/contextUser'

@Service()
@Resolver(() => Payment)
export class PaymentResolver {
  @Inject(() => PaymentService)
  paymentService: PaymentService
  @Inject(() => PaymentRespository)
  paymentRepo: PaymentRespository

  // Payments

  @Query(() => [Payment], { nullable: 'items' })
  async getPayments(@ContextUser() user: ContextUser): Promise<Payment[] | null> {
    if (!user) {
      return null
    }
    const where = { userId: user?.id }
    const payments = await this.paymentRepo.findAll({ where })
    return payments
  }

  // FIELD RESOLVERS
}
