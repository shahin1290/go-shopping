import {ApolloProvider} from '@apollo/react-hooks'
import apolloClient from '../apollo/apolloClient'

import PageLayout from '../components/PageLayout'


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
