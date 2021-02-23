import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    profile: User
    users: [User!]!
    refreshToken: Auth!
    login(email: String!, password: String): Auth!
  }

  extend type Mutation {
    register(name: String!, email: String!, password: String!): Auth!
  }

  type User {
    name: String!
    email: String!
    id: ID!
    createdAt: String!
  }

  type Auth {
    user: User
    token: String!
    refreshToken: String!
  }
`;
