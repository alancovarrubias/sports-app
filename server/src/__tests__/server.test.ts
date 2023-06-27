import { ApolloServer, gql } from 'apollo-server';
import { createTestClient } from 'apollo-server-testing';

import { AUTH } from '../const'
import AuthAPI from '../datasources/authAPI'
import resolvers from '../resolvers'
import typeDefs from '../type-defs'

class TestAuthAPI extends AuthAPI {
    // Expose protected methods for testing
    public async get(url: string) {
        return super.get(url);
    }

    public async post(url: string, body: any) {
        return super.post(url, body);
    }
}

describe('Apollo Server', () => {
    let server: ApolloServer;
    let query: any;
    let mutate: any;

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return the current user', async () => {
        const authAPI = new TestAuthAPI();
        const mockedGet = jest.fn();
        mockedGet.mockResolvedValueOnce({ id: 1 });
        authAPI.get = mockedGet;
        server = new ApolloServer({
            typeDefs,
            resolvers,
            dataSources: () => ({
                [AUTH]: authAPI,
            }),
            context: () => ({ token: 'dummy_token' }), // Mock the token in the context
        });

        const testClient = createTestClient(server);
        query = testClient.query;
        mutate = testClient.mutate;

        const GET_CURRENT_USER = gql`
            query {
                currentUser {
                    id
                }
            }
        `;

        const response = await query({ query: GET_CURRENT_USER });
        expect(response.data).toEqual({ currentUser: { id: '1' } });
        expect(mockedGet).toHaveBeenCalledWith('users/current');
    });
});
