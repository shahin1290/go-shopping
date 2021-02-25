import redis from 'redis'
import express from 'express'
import session from 'express-session'
import connectRedis from 'connect-redis'
import { ApolloServer } from 'apollo-server-express'
import mongoose from 'mongoose'
import cors from 'cors'
import typeDefs from './graphql/typeDefs'
import resolvers from './graphql/resolvers'

import {
  DATABASE_URL,
  APP_PORT,
  IN_PROD,
  REDIS_HOST,
  REDIS_PORT,
  REDIS_PASS,
  SESS_NAME,
  SESS_SECRET,
  SESS_LIFETIME
} from './config'

const app = express()
app.use(cors())


app.disable('x-powered-by')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({ req, res })
})

const connectDb = () => {
  console.log('connecting to', DATABASE_URL)

  mongoose
    .connect(DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    })
    .then(() => {
      console.log('connected to MongoDB')
    })
    .catch((error) => {
      console.log('error connection to MongoDB:', error.message)
    })
}

connectDb()

const RedisStore = connectRedis(session)

const redisClient = redis.createClient({
  host: REDIS_HOST,
  port: REDIS_PORT
})

redisClient.auth(REDIS_PASS)

redisClient.unref()
redisClient.on('error', console.log)

const store = new RedisStore({ client: redisClient })

app.use(
  session({
    store,
    name: SESS_NAME,
    secret: SESS_SECRET,
    resave: false,
    cookie: {
      maxAge: Number(SESS_LIFETIME),
      sameSite: true,
      secure: IN_PROD
    }
  })
)

server.applyMiddleware({ app })

app.listen({ port: APP_PORT }, () =>
  console.log(`http://localhost:${APP_PORT}${server.graphqlPath}`)
)
