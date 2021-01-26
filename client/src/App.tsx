import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { ApolloProvider } from '@apollo/client'
import client from './apollo/client'
import Main from './components/Main'




const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Main />
      </Router>
    </ApolloProvider>
  )
}

export default App
