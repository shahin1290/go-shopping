import React from 'react'
import App from './App'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

import { createUploadLink } from 'apollo-upload-client'
import { setContext } from 'apollo-link-context'

const httpLink = createUploadLink({
  uri: 'http://localhost:4000/graphql'
})

const authLink = setContext(() => {
  const token = localStorage.getItem('jwtToken')
  return {
    headers: {
      Authorization: token ? `bearer ${token}` : null
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)
