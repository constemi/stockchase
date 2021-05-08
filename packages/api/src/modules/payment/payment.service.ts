// import { UserInputError } from "apollo-server-express"
import { Service, Inject } from 'typedi'
import { Payment } from './payment.entity'
import { CreatePaymentInput } from './inputs/createPayment.input'
import { PaymentRespository } from './payment.repository'

@Service()
export class PaymentService {
  @Inject(() => PaymentRespository)
  paymentRepository: PaymentRespository

  async create(data: CreatePaymentInput) {
    const payment = await Payment.create(data).save()
    return payment
  }
}
