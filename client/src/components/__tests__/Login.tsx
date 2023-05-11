import { fireEvent, waitFor, screen } from '@testing-library/react';
import { GraphQLError } from 'graphql';
import { AUTH_TOKEN } from 'app/const';
import { LOGIN_USER_MUTATION } from '../Login';
import { renderApp } from '@test-utils/Render'


jest.mock('../Home')

describe('Login component', () => {
    const loginVariables = { username: 'testuser', password: 'testpass' };
    const token = 'abc123';
    const createMock = (result) => {
        return [
            {
                request: {
                    query: LOGIN_USER_MUTATION,
                    variables: loginVariables,
                },
                result,
            },
        ]

    }
    const renderLoginComponent = (mocks) => {
        renderApp({ path: '/login', mocks })

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

    describe('successful login', () => {
        it('should store the authentication token', async () => {
            const mocks = createMock({ data: { login: { token } } })

            const { usernameInput, passwordInput, loginButton } = renderLoginComponent(mocks)

            fillLoginForm(usernameInput, passwordInput, loginVariables)

            fireEvent.click(loginButton);

            await waitFor(() => expect(getToken()).toEqual(token))
        });

        it('should redirect to the home page', async () => {
            const mocks = createMock({ data: { login: { token } } })

            const { usernameInput, passwordInput, loginButton } = renderLoginComponent(mocks)

            fillLoginForm(usernameInput, passwordInput, loginVariables)

            fireEvent.click(loginButton);
            await waitFor(() => expect(getToken()).toEqual(token))

            const homeElement = screen.getByText(/mock home/i);
            expect(homeElement).toBeInTheDocument();
        });
    })


    it('should display an error message if there is an error logging in', async () => {
        const mocks = createMock({ errors: [new GraphQLError('Failed to login')] })

        const { usernameInput, passwordInput, loginButton } = renderLoginComponent(mocks)

        fillLoginForm(usernameInput, passwordInput, loginVariables)

        fireEvent.click(loginButton);

        await waitFor(() => expect(screen.queryByText('Failed to login')).toBeInTheDocument())
    });
});

function getToken() {
    return localStorage.getItem(AUTH_TOKEN);
}
