import { Resolver, Query, Arg } from 'type-graphql'
import { Inject } from 'typedi'
// import { User } from '../user/user.entity'
import { Security } from './security.entity'
import { SecurityService } from './security.service'
import { SecurityRespository } from './security.repository'
import { ContextUser } from '../shared/context/contextUser'
// import { CurrentUser } from '../shared/context/currentUser'
import { SearchSecurityInput } from './inputs/SearchSecurity.input'
import { SearchSecurityResponse } from './responses/SearchSecurity.response'

@Resolver(() => Security)
export class SecurityResolver {
  @Inject(() => SecurityService)
  securityService: SecurityService
  @Inject(() => SecurityRespository)
  securityRepo: SecurityRespository

  // MUTATIONS

  // QUERIES
  @Query(() => [SearchSecurityResponse])
  search(
    @ContextUser() user: ContextUser,
    @Arg('data') data: SearchSecurityInput,
  ): Promise<SearchSecurityResponse[]> {
    return this.securityService.search(data.symbol)
  }

  // FIELD RESOLVERS
}
