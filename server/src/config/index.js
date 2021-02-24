import * as dotenv from 'dotenv'
dotenv.config()

export const {
  DATABASE_URL,
  APP_PORT,
  NODE_ENV,
  APP_SECRET,
  APP_REFRESH_SECRET,
  REDIS_HOST,
  REDIS_PORT,
  REDIS_PASS,
  SESS_NAME,
  SESS_SECRET,
  SESS_LIFETIME
// eslint-disable-next-line no-undef
} = process.env

export const IN_PROD = NODE_ENV === 'production'
