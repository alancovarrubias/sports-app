import { ApolloServer, gql } from 'apollo-server'
import { createTestClient } from 'apollo-server-testing'

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
    Query: {
        hello: () => 'Hello, World!'
    }
};

describe('Apollo Server', () => {
    it('should return "Hello, World!"', async () => {
        const server = new ApolloServer({ typeDefs, resolvers });
        const { query } = createTestClient(server as any);

        const GET_HELLO = gql`
            query {
                hello
            }
        `;

        const response = await query({ query: GET_HELLO });

        expect(response.data.hello).toEqual('Hello, World!');
    });
});