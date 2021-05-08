import { UserInputError } from 'apollo-server-express'
import { Service } from 'typedi'
import { getManager, FindOneOptions, FindManyOptions } from 'typeorm'
import { Security } from './security.entity'

@Service()
export class SecurityRespository {
  findAll(options?: FindManyOptions<Security>) {
    return Security.find(options)
  }
  async findById(symbolId: string, options?: FindOneOptions<Security>): Promise<Security> {
    try {
      return await Security.findOneOrFail(symbolId, options)
    } catch {
      throw new UserInputError('Security not found')
    }
  }

  findBySymbol(symbol: string): Promise<Security | undefined> {
    const upperSymbol = symbol.trim().toUpperCase()
    const where: any = { displaySymbol: upperSymbol }
    return Security.findOne({ where })
  }

  async findByVector(query: string): Promise<Security[]> {
    const entities = await getManager()
      .createQueryBuilder(Security, 's')
      .select()
      .where('"documentWithWeights" @@ plainto_tsquery(:query)', {
        query: `${query}:*`,
      })
      .orderBy('ts_rank("documentWithWeights", plainto_tsquery(:query))', 'DESC')
      .limit(10)
      .getMany()

    return entities
  }
}
