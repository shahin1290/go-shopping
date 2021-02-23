import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import mongoose from 'mongoose';
import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';

import { DATABASE_URL, APP_PORT, IN_PROD } from './config';

const app = express();

app.disable('x-powered-by');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({ req, res })
});

const connectDb = () => {
  console.log('connecting to', DATABASE_URL);

  mongoose
    .connect(DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    })
    .then(() => {
      console.log('connected to MongoDB');
    })
    .catch((error) => {
      console.log('error connection to MongoDB:', error.message);
    });
};

connectDb();

server.applyMiddleware({ app, cors: false });

app.listen({ port: APP_PORT }, () =>
  console.log(`http://localhost:${APP_PORT}${server.graphqlPath}`)
);
