const { gql } = require('apollo-server-express')

module.exports = gql`
  scalar Date

  type Photo {
    imageUrl: String!
    id: ID!
    product: Product!
  }

  type Product {
    id: ID!
    name: String!
    description: String!
    image: String!
    price: Float!
    brand: String!
    category: String!
    countInStock: Int!
    rating: Float!
    numReviews: Int!
  }

  enum Role {
    ADMIN
    USER
  }

  type User {
    name: String!
    email: String!
    token: String!
    isAdmin: Boolean!
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

  type OrderItem {
    id: ID!
    name: String!
    description: String!
    price: Int!
    quantity: Int!
    photo: Photo!
  }

  type Order {
    id: ID!
    charge: String!
    total: Int!
    user: User!
    items: [OrderItem!]!
  }

  type Query {
    allProducts: [Product!]!
    allPhotos: [Photo]
    product(id: ID!): Product!
    me: User
    allOrders: [Order!]!
    order(id: ID!): Order!
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

    registerUser(name: String!, email: String!, password: String!, passwordConfirm: String!): User!

    loginUser(email: String!, password: String!): User!

    addToCart(id: ID!): CartItem!

    createOrder(token: String): Order

    removeFromCart(id: ID!): CartItem!
  }
`
