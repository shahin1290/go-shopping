import withApollo from 'next-with-apollo'
import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client'
import { createUploadLink } from 'apollo-upload-client';

export default withApollo(
  ({ headers, initialState }) => {
    return new ApolloClient({
      link: ApolloLink.from([
        createUploadLink({
          uri: 'http://localhost:4000/graphql',
          // pass the headers along from this request. This enables SSR with logged in state
          headers
        })
      ]),
      cache: new InMemoryCache({
        typePolicies: {
          Query: {
            fields: {
              // TODO: We will add this together!
              // allProducts: paginationField(),
            }
          }
        }
      }).restore(initialState || {})
    })
  }
  // {
  //   render: ({ Page, props }) => {
  //     return (
  //       <ApolloProvider client={props.apollo}>
  //         <Page {...props} />
  //       </ApolloProvider>
  //     )
  //   }
  // }
)
