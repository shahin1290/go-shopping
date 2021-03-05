import { gql } from '@apollo/client'

export const ALL_PRODUCTS = gql`
  query {
    allProducts {
      id
      name
      price
      description
      photos {
        imageUrl
      }
    }
  }
`
