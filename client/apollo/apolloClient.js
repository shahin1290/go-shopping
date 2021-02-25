import { ApolloClient, InMemoryCache } from '@apollo/client'
import withApollo from 'next-with-apollo'

export default withApollo(({ initialState }) => {
  return new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache().restore(initialState || {})
  })
})
