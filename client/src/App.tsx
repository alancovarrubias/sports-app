import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { ApolloProvider } from '@apollo/client'
import client from 'app/apollo/client'
import Layout from './Layout'
import 'app/scss/Grid.scss'
import 'app/scss/style.scss'

const App = (): JSX.Element => (
  <ApolloProvider client={client}>
    <Router>
      <Layout />
    </Router>
  </ApolloProvider>
)

export default App