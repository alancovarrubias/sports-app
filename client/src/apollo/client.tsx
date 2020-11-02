import { ApolloClient, InMemoryCache } from '@apollo/client'
const client = new ApolloClient({
  uri: `http://${process.env.HOST}/graphql`,
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
