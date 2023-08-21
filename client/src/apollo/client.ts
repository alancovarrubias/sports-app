import { ApolloClient, ApolloLink, createHttpLink, InMemoryCache } from '@apollo/client';
import fetch from 'cross-fetch'
import { getToken } from 'app/utils/auth';

const httpLink = createHttpLink({
  uri: `${process.env.PROTOCOL}://${process.env.HOST}/graphql`,
  fetch,
})
export const authLink = new ApolloLink((operation, forward) => {
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
export default client