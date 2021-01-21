import { ApolloServer } from 'apollo-server'

import resolvers from './resolvers'
import typeDefs from './type-defs'
import dataSources from './datasources'

const server = new ApolloServer({
  cors: {
    origin: '*', // <- allow request from all domains
  },
  resolvers,
  typeDefs,
  dataSources,
  context: ({ req }) => {
    // Note! This example uses the `req` object to access headers,
    // but the arguments received by `context` vary by integration.
    // This means they will vary for Express, Koa, Lambda, etc.!
    //
    // To find out the correct arguments for a specific integration,
    // see the `context` option in the API reference for `apollo-server`:
    // https://www.apollographql.com/docs/apollo-server/api/apollo-server/

    // Get the user token from the headers.
    const token = req.headers.authorization || '';

    // try to retrieve a user with the token
    // const user = getUser(token);

    // add the user to the context
    return { user: token };
  },
})

server
  .listen({ port: process.env.PORT || 4000 })
  .then(({ url }) => console.log(`Server ready at ${url}. `))

if (module.hot) {
  module.hot.accept()
  module.hot.dispose(() => server.stop())
}
