import { MiddlewareFn } from 'type-graphql'
import { getClientIp } from 'request-ip'
import { redis } from '../lib/redis'
import { UserInputError } from 'apollo-server-express'
import { ResolverContext } from '../modules/shared/context/resolver'

const ONE_DAY = 60 * 60 * 24

export const RateLimitMiddleware: (limit?: number) => MiddlewareFn<ResolverContext> = (
  limit = 50,
  time = ONE_DAY,
) => async ({ context: { req }, info }, next) => {
  const ip = getClientIp(req)
  const key = `rate-limit:${info.fieldName}:${ip}`

  const current = await redis.incr(key)
  if (current > limit) {
    throw new UserInputError('rate limit reached please wait and retry')
  } else if (current === 1) {
    await redis.expire(key, time)
  }

  return next()
}
