import { gql, useQuery } from '@apollo/client'

const CURRENT_USER_QUERY = gql`
  query {
    me {
      id
      name
      email
      products {
        id
        description
        price
      }
      carts {
        id
        product {
          id
          description
          price
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
