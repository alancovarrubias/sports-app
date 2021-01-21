import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context';
import { AUTH_TOKEN } from '../const'

const httpLink = createHttpLink({
  uri: `http://${process.env.HOST}/graphql`,
})
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem(AUTH_TOKEN);
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Season: {
        keyFields: ['id', 'sport'],
      },
      Game: {
        keyFields: ['id', 'sport'],
      },
      Player: {
        keyFields: ['id', 'sport'],
      },
    },
  }),
})
export default client
