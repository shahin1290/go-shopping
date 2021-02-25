import PageLayout from '../components/PageLayout'
import apolloClient from '../apollo/apolloClient'
import {
  ApolloProvider,
  
} from '@apollo/react-hooks'



function MyApp({ Component, pageProps, apollo }) {
  return (
    <ApolloProvider client={apollo}>
      <PageLayout>
        <Component {...pageProps} />
      </PageLayout>
    </ApolloProvider>
  )
}

export default apolloClient(MyApp)
