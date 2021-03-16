import { gql, useQuery } from '@apollo/client'

const CURRENT_USER_QUERY = gql`
  query {
    me {
      id
      name
      email
      carts {
        product {
          id
          name
          description
          price
          image
          brand
          category
          countInStock
          rating
          numReviews
        }
        quantity
      }
    }
  }
`

export function useUser() {
  const { data } = useQuery(CURRENT_USER_QUERY)
  return data?.me
}

export { CURRENT_USER_QUERY }
