import React from 'react'
import { ApolloProvider, ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from 'app/routes/Routes'
import fetch from 'cross-fetch'

const httpLink = createHttpLink({
  uri: `${process.env.PROTOCOL}://${process.env.HOST}/graphql`,
  fetch,
})
const client = new ApolloClient({ link: httpLink, cache: new InMemoryCache() })

const App = (): JSX.Element => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes />
      </Router>
    </ApolloProvider>
  )
}

export default App