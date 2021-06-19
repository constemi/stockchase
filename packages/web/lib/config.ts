// don't import files or modules into this file
const { APP_ENV } = process.env
let env

if (APP_ENV) {
  env = APP_ENV
} else {
  const hostname = typeof window !== 'undefined' && window?.location?.hostname
  if (hostname) {
    if (hostname.includes('fullstack-boilerplate')) {
      env = 'production'
    } else {
      env = 'development'
    }
  } else {
    env = 'development'
  }
}

export const IS_PRODUCTION = env === 'production'
export const IS_DEV = !IS_PRODUCTION
export const API_VERSION = 'v1'

export const SENTRY_DSN = 'https://16a8c3d918984e9f91a466295074624c@o528463.ingest.sentry.io/5645842'
export const GRAPHQL_API_URL = IS_PRODUCTION
  ? 'https://fullstack-boilerplate.herokuapp.com/graphql'
  : 'http://localhost:5000/graphql'

export const EXPRESS_API_URL = IS_PRODUCTION
  ? 'https://fullstack-boilerplate.herokuapp.com'
  : 'http://localhost:5000' // api.stockchase.org/v1

export const SUBSCRIPTIONS_URL = IS_PRODUCTION
  ? 'wss://fullstack-boilerplate.herokuapp.com/subscriptions'
  : 'ws://localhost:5000/subscriptions'

export const WEB_URL = IS_PRODUCTION ? 'fullstack-boilerplate.co' : 'localhost:3000'

export const SESSION_TOKEN = 'fullstack-boilerplate:token'

export const HEADER_HEIGHT = 110
export const DAY_WIDTH = 110

export const TIMELINE_POLL_INTERVAL = 30000
