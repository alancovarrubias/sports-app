import { ApolloLink, execute, gql, Observable } from '@apollo/client';
import { authLink } from 'app/apollo/client'
import { clearToken, setToken } from 'app/utils/auth';

const MockQuery = gql`
  query {
    foo
  }
`;
const mockOperation = {
    query: MockQuery,
    variables: {},
};

const mockForward = jest.fn(operation => {
    return new Observable(observer => {
        observer.next(operation);
        observer.complete();
    });
});

it('should add token to request headers', async () => {
    setToken('ACCESS_TOKEN');
    const link = authLink.concat(
        new ApolloLink(operation => {
            expect(operation.getContext().headers.Authorization).toBe(
                'Bearer ACCESS_TOKEN'
            );
            return mockForward(operation);
        })
    );
    await execute(link, mockOperation);
    clearToken()
});