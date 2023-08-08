import React from 'react';
import { GraphQLError } from 'graphql';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login, { LOGIN_USER_MUTATION, AUTH_TOKEN } from 'app/components/Login'
import { MockedProvider, MockedResponse } from '@apollo/client/testing'

const mockPush = jest.fn()
jest.mock('react-router-dom', () => ({
    useHistory: () => ({
        push: mockPush
    }),
}));

function getToken() {
    return localStorage.getItem(AUTH_TOKEN);
}

const renderApp = (mocks: MockedResponse[] = []) => {
    return render(
        <MockedProvider mocks={mocks} addTypename={false}>
            <Login />
        </MockedProvider>
    )
}

const USER = { email: 'testemail', password: 'testpass' }
const request = {
    query: LOGIN_USER_MUTATION,
    variables: USER,
}
const submitLoginForm = ({ emailInput, passwordInput, loginButton }) => {
    fireEvent.change(emailInput, { target: { value: USER.email } })
    fireEvent.change(passwordInput, { target: { value: USER.password } })
    fireEvent.click(loginButton)
}
const renderLogin = (mocks: MockedResponse[] = []) => {
    renderApp(mocks)
    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const loginButton = screen.getByRole('button', { name: /submit/i })
    return { emailInput, passwordInput, loginButton }
}

describe('App', () => {
    beforeEach(() => {
        localStorage.removeItem(AUTH_TOKEN)
    })
    describe('initial render', () => {
        test('renders page with login text', () => {
            renderLogin()
            const loginHeader = screen.getByText(/login/i);
            expect(loginHeader).toBeInTheDocument();
        });
        test('contains email text input', () => {
            const { emailInput } = renderLogin()
            expect(emailInput).toBeInTheDocument();
        });
        test('contains password text input', () => {
            const { passwordInput } = renderLogin()
            expect(passwordInput).toBeInTheDocument();
        });
        test('contains submit button', () => {
            const { loginButton } = renderLogin()
            expect(loginButton).toBeInTheDocument();
        });
    })

    describe('login success', () => {
        const token = 'abc123'
        const result = { data: { login: { token, user: USER } } }
        const loginSuccessMock = [{ request, result }]

        test('sets token in localStorage', async () => {
            const loginElements = renderLogin(loginSuccessMock)
            submitLoginForm(loginElements)
            await waitFor(() => expect(getToken()).toEqual(token))
        });

        test('redirects to home page', async () => {
            const loginElements = renderLogin(loginSuccessMock)
            submitLoginForm(loginElements)
            await waitFor(() => expect(mockPush).toHaveBeenCalledWith('home'))
        });
    })

    describe('login failure', () => {
        const failureMessage = 'Failed to login'
        const result = { errors: [new GraphQLError(failureMessage)] }
        const loginFailureMock = [{ request, result }]

        test('renders error message', async () => {
            const loginElements = renderLogin(loginFailureMock)
            submitLoginForm(loginElements)
            await waitFor(() => expect(screen.queryByText(failureMessage)).toBeInTheDocument())
        });

        test('does not set token in localStorage', async () => {
            const loginElements = renderLogin(loginFailureMock)
            submitLoginForm(loginElements)
            await waitFor(() => expect(getToken()).toBeNull())
        });
    })
})