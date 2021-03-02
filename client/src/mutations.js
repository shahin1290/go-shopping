import { gql } from '@apollo/client'

export const REGISTER_USER = gql`
  mutation registerUser($name: String!, $email: String!, $password: String!) {
    registerUser(name: $name, email: $email, password: $password) {
      name
      email
      id
    }
  }
`

export const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
      bookCount
      id
    }
  }
`

export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      id
      email
      name
      token
    }
  }
`
export const CREATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT_MUTATION(
    $name: String!
    $description: String!
    $photo: Upload
    $price: Int!
  ) {
    createProduct(
      name: $name
      description: $description
      price: $price
      photo: $photo
    ) {
      id
      description
      name
      price
    }
  }
`;

export const CREATE_SUBSCRIPTION_MUTATION = gql `

  mutation CREATE_SUBSCRIPTION_MUTATION($source: String!) {
    createSubscription(source: $source){
      id
      email
    }
  }
`
