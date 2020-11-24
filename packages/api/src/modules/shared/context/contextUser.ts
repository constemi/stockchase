import { createParamDecorator } from "type-graphql"
import { ResolverContext } from "./resolver"
import { User } from "../../user/user.entity"

export function ContextUser() {
  return createParamDecorator<ResolverContext>(async ({ context }) => {
    if (context.req.user) {
      const user = await User.findOne(context.req.user.id)
      return user || null
    } else {
      return null
    }
  })
}
export type ContextUser = User | null
