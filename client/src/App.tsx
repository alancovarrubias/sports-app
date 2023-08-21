import React from 'react'
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from 'app/routes/Routes'
import client from 'app/apollo/client'

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