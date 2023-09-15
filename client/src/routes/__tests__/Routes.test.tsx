import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import Routes from 'app/routes/Routes'
import { Paths } from 'app/const'
import { renderWithMocks, screen, waitFor } from '@test-utils/index'
import UserProvider, { CURRENT_USER } from 'app/contexts/UserProvider'
import { GraphQLError } from 'graphql'
import { clearToken, setToken } from 'app/utils/auth'

jest.mock('app/components/Games')
export const renderRoutes = (path, result) => {
    return renderWithMocks(
        <UserProvider>
            <MemoryRouter initialEntries={[path]}>
                <Routes />
            </MemoryRouter>
        </UserProvider>,
        [{ request: { query: CURRENT_USER }, result }]
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
            const currentUserSuccess = { data: { currentUser: { email: 'testemail' } } }
            test('root path redirects to home page', async () => {
                renderRoutes(Paths.Root, currentUserSuccess)
                await waitFor(() => expect(screen.getByText(/home/i)).toBeInTheDocument());
            });
            test('home path renders home page', async () => {
                renderRoutes(Paths.Home, currentUserSuccess)
                await waitFor(() => expect(screen.getByText(/home/i)).toBeInTheDocument());
            });
            test('games path renders games page', async () => {
                renderRoutes(Paths.Games, currentUserSuccess)
                await waitFor(() => expect(screen.getByText(/games/i)).toBeInTheDocument());
            });
        })
        describe('unauthorized user', () => {
            const currentUserFailure = { errors: [new GraphQLError('User is not authenticated')] }
            test('root path redirects to login page', async () => {
                renderRoutes(Paths.Root, currentUserFailure)
                await waitFor(() => expect(screen.getByText(/login/i)).toBeInTheDocument());
            });
            test('home path redirects to login page', async () => {
                renderRoutes(Paths.Home, currentUserFailure)
                await waitFor(() => expect(screen.getByText(/login/i)).toBeInTheDocument());
            });
            test('games path redirects to login page', async () => {
                renderRoutes(Paths.Games, currentUserFailure)
                await waitFor(() => expect(screen.getByText(/login/i)).toBeInTheDocument());
            });
        })
    })
})