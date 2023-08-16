import React from 'react';
import { GraphQLError } from 'graphql';
import Login, { LOGIN_MUTATION } from 'app/components/Login'
import { Paths } from 'app/const'
import { renderWithMocks, screen, fireEvent, waitFor } from '@test-utils/index';
import { getToken, clearToken } from 'app/utils/auth';

const mockPush = jest.fn()
jest.mock('react-router-dom', () => ({
    useHistory: () => ({
        push: mockPush
    }),
}));

const USER = { email: 'testemail', password: 'testpass' }
const request = {
    query: LOGIN_MUTATION,
    variables: USER,
}
const submitLoginForm = ({ emailInput, passwordInput, loginButton }) => {
    fireEvent.change(emailInput, { target: { value: USER.email } })
    fireEvent.change(passwordInput, { target: { value: USER.password } })
    fireEvent.click(loginButton)
}
const renderLogin = (mocks = []) => {
    renderWithMocks(<Login />, mocks)
    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const loginButton = screen.getByRole('button', { name: /submit/i })
    return { emailInput, passwordInput, loginButton }
}

describe('Login', () => {
    beforeEach(() => {
        clearToken()
    })

    describe('initial render', () => {
        test('renders page with login text', () => {
            renderLogin()
            const loginHeader = screen.getByText(/login/i);
            expect(loginHeader).toBeInTheDocument();
        });
    })

    describe('login success', () => {
        const token = 'abc123'
        const loginSuccessMock = [{ request, result: { data: { login: { token, user: USER } } } }]
        test('sets auth token', async () => {
            const loginElements = renderLogin(loginSuccessMock)
            submitLoginForm(loginElements)
            await waitFor(() => expect(getToken()).toEqual(token))
        });

        test('redirects to home page', async () => {
            const loginElements = renderLogin(loginSuccessMock)
            submitLoginForm(loginElements)
            await waitFor(() => expect(mockPush).toHaveBeenCalledWith(Paths.Home))
        });
    })

    describe('login failure', () => {
        const failureMessage = 'Failed to login'
        const loginFailureMock = [{ request, result: { errors: [new GraphQLError(failureMessage)] } }]
        test('renders error message', async () => {
            const loginElements = renderLogin(loginFailureMock)
            submitLoginForm(loginElements)
            await waitFor(() => expect(screen.queryByText(failureMessage)).toBeInTheDocument())
        });

        test('does not set token', async () => {
            const loginElements = renderLogin(loginFailureMock)
            submitLoginForm(loginElements)
            await waitFor(() => expect(getToken()).toBeNull())
        });
    })
})