import React from 'react'
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProvider } from 'app/contexts/AuthContext';
import Routes from 'app/routes/Routes'
import client from 'app/apollo/client'

const App = (): JSX.Element => {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <Router>
          <Routes />
        </Router>
      </AuthProvider>
    </ApolloProvider>
  )
}

export default App