import React from 'react'
import App from './App'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { AuthProvider } from './auth'

import { createUploadLink } from 'apollo-upload-client'
import { setContext } from 'apollo-link-context'

const httpLink = createUploadLink({
  uri: 'http://localhost:4000/graphql'
})

const authLink = setContext(() => {
  const token = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo')).token
    : null
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
    <AuthProvider>
      <App />
    </AuthProvider>
  </ApolloProvider>
)
