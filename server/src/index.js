const express = require('express')
const connectDb = require('./config/db')
const { ApolloServer } = require('apollo-server-express')
const cors = require('cors')
const typeDefs = require('./graphql/types')
const resolvers = require('./graphql/resolvers')
const models = require('./models')
const createAuthService = require('./utils/authService')

connectDb()

const app = express()

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true
  })
)

app.disable('x-powered-by')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const authorization = req.headers.authorization
    const accessToken = authorization ? authorization.split(' ')[1] : undefined

    return {
      authService: createAuthService({
        accessToken,
        jwtSecret: process.env.JWT_SECRET
      }),

      models
    }
  }
})

server.applyMiddleware({ app, cors: false })

app.listen({ port: process.env.APP_PORT }, () =>
  console.log(`http://localhost:${process.env.APP_PORT}${server.graphqlPath}`)
)
