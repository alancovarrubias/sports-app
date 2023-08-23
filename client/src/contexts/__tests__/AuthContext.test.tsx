
import React, { useContext } from 'react';
import { GraphQLError } from 'graphql';
import { renderWithMocks, screen, waitFor } from '@test-utils/index';
import { AuthProvider, CURRENT_USER, AuthContext } from 'app/contexts/AuthContext';

const USER = { email: 'testemail' }
const request = {
    query: CURRENT_USER,
}
function RenderAuthComponent(): JSX.Element {
    const user = useContext(AuthContext)
    return (
        <div>{String(user.isLoggedIn)}</div>
    )
}
function renderAuthProvider(mocks) {
    renderWithMocks(
        <AuthProvider>
            <RenderAuthComponent />
        </AuthProvider>,
        mocks
    )

}
describe('AuthProvider', () => {
    describe('login success', () => {
        const currentUserSuccessMock = [{ request, result: { data: { currentUser: USER } } }]
        test('renders page with login text', async () => {
            renderAuthProvider(currentUserSuccessMock)
            await waitFor(() => expect(screen.getByText('true')).toBeInTheDocument());
        });
    })
    describe('login failure', () => {
        const failureMessage = 'User is not authenticated'
        const currentUserFailureMock = [{ request, result: { errors: [new GraphQLError(failureMessage)] } }]
        test('renders page with login text', async () => {
            renderAuthProvider(currentUserFailureMock)
            await waitFor(() => expect(screen.getByText('false')).toBeInTheDocument());
        });

    })
})