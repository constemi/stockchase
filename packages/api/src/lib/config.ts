import CORS from 'cors'
// ENV VARIABLES
export const {
  NODE_ENV = 'development',
  APP_ENV = 'development',
  APP_SECRET = 'APP_SECRET',
  APP_AUTH_SECRET = 'APP_AUTH_SECRET',
  PORT = 5000,
  AWS_S3_BUCKET = 'S3_BUCKET',
  SENDGRID_API_KEY = 'SENDGRID_API_KEY',
  WEB_URL = 'localhost:3001',
  DATABASE_URL = '',
  REDIS_URL = '127.0.0.1',
  REDIS_PORT = 6379,
  REDIS_PASS = '',
  SESSION_TOKEN = 'stockchase:token',
  EXCHANGE_URL = 'EXCHANGE_URL',
  FINNHUB_KEY = 'FINNHUB_KEY',
  SENTRY_DSN = 'SENTRY_URL',
  CDN_URL = 'CDN_URL',
  OTP_KEY = 'OTP_KEY',
  OTP_SALT = 'OTP_SALT',
} = process.env

// IS PRODUCTION
export const IS_PRODUCTION = APP_ENV === 'production'

// CORS
export const CORS_OPTIONS: CORS.CorsOptions = {
  origin: '*',
  maxAge: 86400,
}

// GRAPHQL PATH
export const GRAPHQL_PATH = '/graphql'

// RESOLVER PATHS
export const RESOLVER_PATHS = IS_PRODUCTION ? '/modules/**/*resolver.js' : '/modules/**/*resolver.ts'

// LOADER PATHS
export const LOADER_PATHS = IS_PRODUCTION ? '/modules/**/*.loader.js' : '/modules/**/*.loader.ts'

// CONTROLLER PATHS
export const CONTROLLER_PATHS = IS_PRODUCTION ? '/modules/**/*.controller.js' : '/modules/**/*.controller.ts'

// WORKER PATHS
export const WORKER_PATHS = IS_PRODUCTION ? '/modules/**/*.worker.js' : '/modules/**/*.worker.ts'

// DEV EMAIL
export const DEV_EMAIL_OPTIONS: any = {
  host: 'localhost',
  port: 1025,
  secure: false,
  debug: true,
  ignoreTLS: true,
}

//  JWT AUTH
export const JWT_AUTH = {
  secret: APP_AUTH_SECRET,
  credentialsRequired: false,
  algorithms: ['HS256'],
}

// S3
export const S3_CONFIG = {
  signatureVersion: 'v4',
  region: 'eu-central-1',
}

export const S3_URL = `https://${AWS_S3_BUCKET}.s3.amazonaws.com/`

// WEB URL
export const FULL_WEB_URL = `${IS_PRODUCTION ? 'https://' : 'http://'}${WEB_URL}`
