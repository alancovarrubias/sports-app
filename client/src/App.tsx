import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { ApolloProvider } from '@apollo/client'
import client from './apollo/client'
import Main from './components/Main'
import "normalize.css/normalize.css";
import "./@setproduct-ui/styles/setproduct.css"




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
