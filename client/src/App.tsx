import React from 'react'
import { ApolloProvider, ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import Login from 'app/components/Login'
import fetch from 'cross-fetch'

const httpLink = createHttpLink({
  uri: `${process.env.PROTOCOL}://${process.env.HOST}/graphql`,
  fetch,
})
const client = new ApolloClient({ link: httpLink, cache: new InMemoryCache() })

const App = (): JSX.Element => {
  return (
    <ApolloProvider client={client}>
      <Login />
    </ApolloProvider>
  )
}

export default App