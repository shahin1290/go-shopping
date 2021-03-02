const { gql } = require('apollo-server-express')

module.exports = gql`
  scalar Date
  type Photo {
    imageUrl: String!
    id: ID!
    product: Product!
  }

  type Product {
    name: String!
    description: String!
    price: Int!
    photos: [Photo]
    id: ID!
  }

  type User {
    name: String!
    email: String!
    password: String!
    token: String!
    id: ID!
  }

  type AuthorizationPayload {
    accessToken: String!
    expiresAt: Date!
  }

  type CartItem {
    id: ID!
    product: Product!
    quantity: Int!
    user: User!
    createdAt: Date!
  }

  type Query {
    allProducts: [Product!]!
    allPhotos: [Photo]
    product(id: ID!): Product!
    me: User
  }

  type Mutation {
    createProduct(
      name: String!
      description: String!
      price: Int!
      photo: Upload
    ): Product

    uploadPhoto(photo: Upload!): Photo!

    updateProduct(
      id: ID!
      name: String
      description: String
      price: Int
    ): Product

    deleteProduct(id: ID!): Product

    registerUser(name: String!, email: String!, password: String!): User!

    loginUser(email: String!, password: String!): User!

    createSubscription(source: String!): User

    addToCart(id: ID!): CartItem!
  }
`
