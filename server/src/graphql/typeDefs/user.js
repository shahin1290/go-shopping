import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    me: User
    user(id: ID!): User
    users: [User!]!
  }

  extend type Mutation {
    signUp(name: String!, email: String!, password: String!): User!
    signIn(email: String!, password: String): User!
    signOut: Boolean
  }

  type User {
    name: String!
    email: String!
    id: ID!
    createdAt: String!
  }
`;
