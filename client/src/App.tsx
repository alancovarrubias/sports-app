import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { ApolloProvider } from '@apollo/client'
import client from 'app/apollo/client'
import AppRoutes from './AppRoutes'
import 'app/scss/Grid.scss'
import 'app/scss/style.scss'

const App = (): JSX.Element => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <AppRoutes />
      </Router>
    </ApolloProvider>
  )
}

export default App