import React, { useContext, useState } from 'react'
import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client'
import { loginAction } from 'app/actions/userActions';
import { UserDispatchContext } from 'app/contexts/UserContext';

export const LOGIN_MUTATION = gql`
  mutation LoginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        email
      }
      token
    }
  }
`;

const Login = (): JSX.Element => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loginError, setLoginError] = useState('')
    const dispatch = useContext(UserDispatchContext)
    const [login] = useMutation(LOGIN_MUTATION,
        {
            onCompleted: ({ login }) => {
                dispatch(loginAction(login))
            },
            onError: (error) => {
                setLoginError(error.message)
            }

        }
    )
    const handleSubmit = (event) => {
        event.preventDefault();
        login({ variables: { email, password } })
    };
    return (
        <>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input
                    type="text"
                    id="email"
                    aria-label="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    aria-label="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {loginError && <p>{loginError}</p>}
                <button>Submit</button>
            </form>
        </>
    )
}

export default Login