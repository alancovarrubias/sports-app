import { ApolloClient, ApolloLink, createHttpLink, InMemoryCache } from '@apollo/client';
import fetch from 'cross-fetch'
import { getToken } from 'app/utils/auth';

async function createApolloClient() {
  const response = await fetch('/config.json');
  const config = await response.json();
  const host = config.HOST || process.env.HOST;
  const protocol = process.env.PROTOCOL;

  const httpLink = createHttpLink({
    uri: `${protocol}://${host}/graphql`,
    fetch,
  })
  const authLink = new ApolloLink((operation, forward) => {
    const token = getToken()
    if (token) {
      operation.setContext({
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    return forward(operation);
  });
  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  })
  return client
}

export default createApolloClient