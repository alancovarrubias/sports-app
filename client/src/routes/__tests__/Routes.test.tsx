import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import Routes from 'app/routes/Routes'
import { Paths } from 'app/const'
import { renderWithMocks, screen, waitFor } from '@test-utils/index'
import UserProvider, { CURRENT_USER } from 'app/contexts/UserProvider'
import { GraphQLError } from 'graphql'
import { clearToken, setToken } from 'app/utils/auth'

const USER = { email: 'testemail' }
const request = {
    query: CURRENT_USER,
}
export const renderRoutes = (path, mocks) => {
    return renderWithMocks(
        <UserProvider>
            <MemoryRouter initialEntries={[path]}>
                <Routes />
            </MemoryRouter>
        </UserProvider>,
        mocks
    )
}

describe('Routes', () => {
    describe('without token', () => {
        beforeEach(() => {
            clearToken()
        })
        test('no query is made', async () => {
            renderRoutes(Paths.Root, [])
            await waitFor(() => expect(screen.getByText(/login/i)).toBeInTheDocument());
        })
    })
    describe('with token', () => {
        beforeEach(() => {
            setToken('TOKEN')
        })
        describe('authorized user', () => {
            const currentUserSuccessMock = [{ request, result: { data: { currentUser: USER } } }]
            test('root path redirects to home page', async () => {
                renderRoutes(Paths.Root, currentUserSuccessMock)
                await waitFor(() => expect(screen.getByText(/home/i)).toBeInTheDocument());
            });
            test('home path renders home page', async () => {
                renderRoutes(Paths.Home, currentUserSuccessMock)
                await waitFor(() => expect(screen.getByText(/home/i)).toBeInTheDocument());
            });
            test('games path renders games page', async () => {
                renderRoutes(Paths.Games, currentUserSuccessMock)
                await waitFor(() => expect(screen.getByText(/games/i)).toBeInTheDocument());
            });
        })
        describe('unauthorized user', () => {
            const currentUserFailureMock = [{ request, result: { errors: [new GraphQLError('User is not authenticated')] } }]
            test('root path redirects to login page', async () => {
                renderRoutes(Paths.Root, currentUserFailureMock)
                await waitFor(() => expect(screen.getByText(/login/i)).toBeInTheDocument());
            });
            test('home path redirects to login page', async () => {
                renderRoutes(Paths.Home, currentUserFailureMock)
                await waitFor(() => expect(screen.getByText(/login/i)).toBeInTheDocument());
            });
            test('games path redirects to login page', async () => {
                renderRoutes(Paths.Games, currentUserFailureMock)
                await waitFor(() => expect(screen.getByText(/login/i)).toBeInTheDocument());
            });
        })
    })
})