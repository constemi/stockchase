import { createMethodDecorator } from "type-graphql"
import { AuthenticationError } from "apollo-server-express"

import { ResolverContext } from "../modules/shared/context/resolver"
import { User } from "../modules/user/user.entity"

export function AuthMiddleware(roles?: string[]) {
  return createMethodDecorator<ResolverContext>(async ({ context: { req } }, next) => {
    const argRoles = roles || []
    if (req?.user?.id) {
      if (argRoles.length === 0) return next()
      const currentUser = await User.createQueryBuilder().where({ id: req.user.id }).getOne()
      if (currentUser) return next()
      throw new AuthenticationError("Not authorized")
    } else {
      throw new AuthenticationError("Not authenticated")
    }
  })
}
