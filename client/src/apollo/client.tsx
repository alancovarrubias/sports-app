import { ApolloClient, createHttpLink, gql } from '@apollo/client'
import { setContext } from '@apollo/client/link/context';
import { AUTH_TOKEN } from '../const'
import { cache } from './cache'

const httpLink = createHttpLink({
  uri: `${process.env.PROTOCOL}://${process.env.HOST}/graphql`,
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

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
  }
`;


const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  typeDefs,
  connectToDevTools: true,
})
export default client
