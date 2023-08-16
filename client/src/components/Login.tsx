import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client'
import { Paths } from 'app/const'
import { setToken } from 'app/utils/auth'

export const LOGIN_MUTATION = gql`
  mutation LoginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user
      token
    }
  }
`;

const Login = (): JSX.Element => {
    const history = useHistory()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loginError, setLoginError] = useState('')
    const [login] = useMutation(LOGIN_MUTATION,
        {
            onCompleted: ({ login }) => {
                if (login.token) {
                    setToken(login.token)
                    history.push(Paths.Home)
                }
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