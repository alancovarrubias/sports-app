import React, { useState, useEffect } from 'react';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router } from 'react-router-dom';
import UserProvider from 'app/contexts/UserProvider';
import Routes from 'app/routes/Routes';
import createApolloClient from 'app/apollo/client';

const App = (): JSX.Element => {
  const [client, setClient] = useState(null);

  useEffect(() => {
    const initializeClient = async () => {
      const apolloClient = await createApolloClient();
      setClient(apolloClient);
    };
    initializeClient();
  }, []);

  if (!client) {
    // Optionally, you can return a loading screen while waiting for the client to initialize
    return <div>Loading...</div>;
  }

  return (
    <ApolloProvider client={client}>
      <Router>
        <UserProvider>
          <Routes />
        </UserProvider>
      </Router>
    </ApolloProvider>
  );
}

export default App;
