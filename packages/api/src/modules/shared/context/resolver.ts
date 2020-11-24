import { ResolverData } from "type-graphql"
import { ExpressContext } from "../../../lib/types"

export type ResolverContext = ExpressContext

export type AbilityContext = ResolverData<ResolverContext>
