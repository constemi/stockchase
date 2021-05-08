import Redis from 'ioredis'
import { REDIS_PORT, REDIS_URL } from './config'

export const redisOptions: Redis.RedisOptions = {
  host: REDIS_URL,
  port: REDIS_PORT,
  retryStrategy: (times) => {
    // reconnect after
    return Math.min(times * 50, 2000)
  },
}

export const redis = new Redis(redisOptions)
