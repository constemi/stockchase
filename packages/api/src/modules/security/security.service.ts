// import { UserInputError } from "apollo-server-express"
import { UserInputError } from 'apollo-server-errors'
import { Service, Inject } from 'typedi'
import { SecurityRespository } from './security.repository'

@Service()
export class SecurityService {
  @Inject(() => SecurityRespository)
  securityRepository: SecurityRespository

  async search(query: string) {
    const securities = await this.securityRepository.findByVector(query.trim())
    if (securities.length === 0) {
      throw new UserInputError('No securities were found')
    }
    return securities
  }
}
