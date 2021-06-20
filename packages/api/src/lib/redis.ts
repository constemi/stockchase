import Redis from 'ioredis'
import { REDIS_PORT, REDIS_URL, REDIS_PASS } from './config'

export const redisOptions: Redis.RedisOptions = {
  host: REDIS_URL,
  port: +REDIS_PORT,
  password: REDIS_PASS,
  tls: {
    port: +REDIS_PORT,
    host: REDIS_URL,
  },
  retryStrategy: (times) => {
    // reconnect after
    return Math.min(times * 50, 2000)
  },
}

// export const redis = new Redis(redisOptions)
