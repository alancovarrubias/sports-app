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
})

server
  .listen({ port: process.env.PORT || 4000 })
  .then(({ url }) => console.log(`Server ready at ${url}. `))

if (module.hot) {
  module.hot.accept()
  module.hot.dispose(() => server.stop())
}
