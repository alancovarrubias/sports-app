import { fireEvent, waitFor, screen } from '@testing-library/react';
import { GraphQLError } from 'graphql';
import { AUTH_TOKEN } from 'app/const';
import { LOGIN_USER_MUTATION } from '../Login';
import { renderApp, createMock } from '@test-utils/Render'


jest.mock('../Home')

describe('Login component', () => {
    const loginVariables = { username: 'testuser', password: 'testpass' }
    const renderLoginComponent = (mocks) => {
        renderApp({ path: '/login', mocks })

        return {
            usernameInput: screen.getByLabelText('Username:'),
            passwordInput: screen.getByLabelText('Password:'),
            loginButton: screen.getByText('Submit'),
        };
    };

    const fillLoginForm = (usernameInput, passwordInput, loginVariables) => {
        fireEvent.change(usernameInput, { target: { value: loginVariables.username } })
        fireEvent.change(passwordInput, { target: { value: loginVariables.password } })
    };
    const request = {
        query: LOGIN_USER_MUTATION,
        variables: loginVariables,
    }

    describe('successful login', () => {
        const token = 'abc123'
        const loginSuccessMock = () => createMock(request, { data: { login: { token } } })
        it('should store the authentication token', async () => {
            const mocks = loginSuccessMock()

            const { usernameInput, passwordInput, loginButton } = renderLoginComponent(mocks)

            fillLoginForm(usernameInput, passwordInput, loginVariables)

            fireEvent.click(loginButton);

            await waitFor(() => expect(getToken()).toEqual(token))
        });

        it('should redirect to the home page', async () => {
            const mocks = loginSuccessMock()

            const { usernameInput, passwordInput, loginButton } = renderLoginComponent(mocks)

            fillLoginForm(usernameInput, passwordInput, loginVariables)

            fireEvent.click(loginButton);

            await waitFor(() => expect(getToken()).toEqual(token))

            const homeElement = screen.getByText(/mock home/i);

            expect(homeElement).toBeInTheDocument();
        });
    })

    describe('successful login', () => {
        const loginFailureMock = () => createMock(request, { errors: [new GraphQLError('Failed to login')] })
        it('should display an error message if there is an error logging in', async () => {
            const mocks = loginFailureMock()

            const { usernameInput, passwordInput, loginButton } = renderLoginComponent(mocks)

            fillLoginForm(usernameInput, passwordInput, loginVariables)

            fireEvent.click(loginButton);

            await waitFor(() => expect(screen.queryByText('Failed to login')).toBeInTheDocument())
        });
    })
});

function getToken() {
    return localStorage.getItem(AUTH_TOKEN);
}
