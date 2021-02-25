const express = require('express')
const connectDb = require('./config/db')
const { ApolloServer } = require('apollo-server-express')
const cors = require('cors')
const typeDefs = require('./graphql/types')
const resolvers = require('./graphql/resolvers')
const models = require('./models')
const authContext = require('./graphql/context')

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
  context: ({ req }) => ({
    currentUser: authContext(req),
    models
  })
})

server.applyMiddleware({ app, cors: false })

app.listen({ port: process.env.APP_PORT }, () =>
  console.log(`http://localhost:${process.env.APP_PORT}${server.graphqlPath}`)
)
