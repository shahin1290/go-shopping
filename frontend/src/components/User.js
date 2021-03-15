import { gql, useQuery } from '@apollo/client'

const CURRENT_USER_QUERY = gql`
  query {
    me {
      id
      name
      email
    }
  }
`

export function useUser() {
  const { data } = useQuery(CURRENT_USER_QUERY)
  return data?.me
}

export { CURRENT_USER_QUERY }
