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
    let authAPI: any;
    let dummyToken: string;

    beforeAll(() => {
        dummyToken = 'dummy_token'
        authAPI = new TestAuthAPI()
        server = new ApolloServer({
            typeDefs,
            resolvers,
            dataSources: () => ({
                [AUTH]: authAPI
            }),
            context: () => ({ token: dummyToken }), // Mock the token in the context
        });
        const testClient = createTestClient(server);

        query = testClient.query;
        mutate = testClient.mutate;
    })

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return the current user', async () => {
        const mockedGet = jest.spyOn(authAPI, 'get');
        mockedGet.mockResolvedValueOnce({ id: 1 });

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

    it('should register a user', async () => {
        const mockedPost = jest.spyOn(authAPI, 'post');
        mockedPost.mockResolvedValueOnce({ token: dummyToken });

        const REGISTER_USER = gql`
            mutation {
                registerUser(email: "test@example.com", password: "password")
            }
        `;

        const response = await mutate({ mutation: REGISTER_USER });
        expect(response.data).toEqual({ registerUser: dummyToken });
        expect(mockedPost).toHaveBeenCalledWith('users', { email: 'test@example.com', password: 'password' });
    });

    it('should login a user', async () => {
        const mockedPost = jest.spyOn(authAPI, 'post');
        mockedPost.mockResolvedValueOnce({ token: dummyToken });

        const LOGIN_USER = gql`
            mutation {
                loginUser(email: "test@example.com", password: "password")
            }
        `;

        const response = await mutate({ mutation: LOGIN_USER });
        expect(response.data).toEqual({ loginUser: dummyToken });
        expect(mockedPost).toHaveBeenCalledWith('login', { email: 'test@example.com', password: 'password' });
    });
});
