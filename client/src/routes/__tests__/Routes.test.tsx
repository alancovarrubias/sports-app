import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { GraphQLError } from 'graphql';
import Routes from 'app/routes/Routes'
import { Paths } from 'app/const'
import { AuthProvider, CURRENT_USER } from 'app/contexts/AuthContext'
import { renderWithMocks, screen, waitFor } from '@test-utils/index'

jest.mock('app/components/Login')
jest.mock('app/components/Home')

const USER = { email: 'testemail' }
const request = {
    query: CURRENT_USER,
}
const currentUserSuccessMock = [{ request, result: { data: { currentUser: USER } } }]
const loginFailureMock = [{ request, result: { errors: [new GraphQLError('User is not authenticated')] } }]
export const renderRoutes = (path, isLoggedIn) => {
    const mocks = isLoggedIn ? currentUserSuccessMock : loginFailureMock
    return renderWithMocks(
        <AuthProvider>
            <MemoryRouter initialEntries={[path]}>
                <Routes />
            </MemoryRouter>
        </AuthProvider>,
        mocks
    )
}

describe('Routes', () => {
    describe('authorized user', () => {
        test('root path redirects to home page', async () => {
            renderRoutes(Paths.Root, true)
            await waitFor(() => expect(screen.getByText(/mock home/i)).toBeInTheDocument());
        });
        test('home path renders home page', async () => {
            renderRoutes(Paths.Home, true)
            await waitFor(() => expect(screen.getByText(/mock home/i)).toBeInTheDocument());
        });
    })
    describe('unauthorized user', () => {
        test('root path redirects to login page', async () => {
            renderRoutes(Paths.Root, false)
            await waitFor(() => expect(screen.getByText(/mock login/i)).toBeInTheDocument());
        });
        test('home path redirects to login page', async () => {
            renderRoutes(Paths.Home, false)
            await waitFor(() => expect(screen.getByText(/mock login/i)).toBeInTheDocument());
        });
    })
})