import { SelectQueryBuilder } from 'typeorm'
import { TableArgs } from './args/table.args'

export interface EntityFilters {
  [key: string]: { [key: string]: string[] }
}

interface Args extends TableArgs {
  filters?: EntityFilters | any
}

export class BaseRepository<T> {
  async findAllWithCount(entity: string, query: SelectQueryBuilder<T>, args: Args) {
    if (args.relations) this.applyRelations(query, args.relations)
    if (args.filters) this.applyFilters(query, args.filters)
    if (args.search && args.searchFields) this.applySearch(query, args.searchFields, args.search)
    this.applyPagination(entity, query, args)
    return this.getMany(query)
  }

  applyRelations(query: SelectQueryBuilder<T>, relations: string[]) {
    relations.forEach((join) => {
      const entity = join.split('.')[0]
      const relation = join.split('.')[1]
      query.leftJoinAndSelect(`${entity}.${relation}`, relation)
    })
  }

  applyFilters(query: SelectQueryBuilder<T>, filters: EntityFilters) {
    Object.entries(filters).map(([entity, fields]: [string, { [key: string]: string[] }]) => {
      if (fields) {
        Object.entries(fields).map(([field, value]) => {
          if (value && value.length > 0)
            query.andWhere(`${entity}.${field} IN (:...${field})`, {
              [field]: value,
            })
        })
      }
    })
  }

  applySearch(query: SelectQueryBuilder<T>, fields: string[], search: string) {
    const searchQuery = fields.reduce((acc, field, i) => {
      const fieldQuery = `${field} ilike :search`
      if (i === 0) {
        acc += fieldQuery
      } else {
        acc += ` OR ${fieldQuery}`
      }
      return acc
    }, '')
    query.andWhere(`(${searchQuery})`, {
      search: `%${search}%`,
    })
  }

  applyPagination(
    entity: string,
    query: SelectQueryBuilder<T>,
    args: {
      orderBy?: string
      skip?: number
      take?: number
      order?: 'ASC' | 'DESC'
    },
  ) {
    query
      .skip(args.skip)
      .take(args.take)
      .orderBy(args.orderBy || `${entity}.createdAt`, args.order || 'DESC')
  }

  async getMany(query: SelectQueryBuilder<T>) {
    const itemsAndCount = await query.getManyAndCount()
    return { items: itemsAndCount[0], count: itemsAndCount[1] }
  }
}
