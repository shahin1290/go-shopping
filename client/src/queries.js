import { gql } from '@apollo/client'

export const ALL_PRODUCTS = gql`
  query {
    allProducts {
      name
    }
  }
`

