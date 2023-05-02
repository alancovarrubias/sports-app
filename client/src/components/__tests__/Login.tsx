import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { GraphQLError } from 'graphql';
import Login, { LOGIN_USER_MUTATION } from '../Login';


describe('Login component', () => {
    const loginVariables = { username: 'testuser', password: 'testpass' };
    const renderLoginComponent = (mocks) => {
        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <Login />
            </MockedProvider>
        );

        return {
            usernameInput: screen.getByLabelText('Username:'),
            passwordInput: screen.getByLabelText('Password:'),
            loginButton: screen.getByText('Submit'),
        };
    };

    const fillLoginForm = (usernameInput, passwordInput, loginVariables) => {
        fireEvent.change(usernameInput, { target: { value: loginVariables.username } });
        fireEvent.change(passwordInput, { target: { value: loginVariables.password } });
    };

    it('should successfully log in the user and store the authentication token', async () => {
        const token = 'abc123';

        const mocks = [
            {
                request: {
                    query: LOGIN_USER_MUTATION,
                    variables: { username: 'testuser', password: 'testpass' },
                },
                result: {
                    data: { login: { token } }
                },
            },
        ];

        const { usernameInput, passwordInput, loginButton } = renderLoginComponent(mocks)

        fillLoginForm(usernameInput, passwordInput, loginVariables)

        fireEvent.click(loginButton);

        await waitFor(() => expect(getToken()).toEqual(token))
    });

    it('should display an error message if there is an error logging in', async () => {
        const mocks = [
            {
                request: {
                    query: LOGIN_USER_MUTATION,
                    variables: { username: 'testuser', password: 'testpass' },
                },
                result: {
                    errors: [new GraphQLError('Failed to login')],
                },
            },
        ];

        const { usernameInput, passwordInput, loginButton } = renderLoginComponent(mocks)

        fillLoginForm(usernameInput, passwordInput, loginVariables)

        fireEvent.click(loginButton);

        await waitFor(() => expect(screen.queryByText('Failed to login')).toBeInTheDocument())
    });
});

function getToken() {
    return localStorage.getItem('auth-token');
}
