import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { AUTH_TOKEN } from 'app/const'
import { isLoggedInVar } from 'app/apollo/cache'
import 'app/scss/Login.scss'
import { gql } from '@apollo/client';

export const LOGIN_USER_MUTATION = gql`
  mutation LoginUser($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
    }
  }
`;


const Login: React.FC = () => {
    const history = useHistory()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loginError, setLoginError] = useState('')
    const [login] = useMutation(LOGIN_USER_MUTATION,
        {
            onCompleted: ({ login }) => {
                if (login.token) {
                    localStorage.setItem(AUTH_TOKEN, login.token)
                    isLoggedInVar(true)
                    history.push('/home')
                }
            },
            onError: (error) => {
                setLoginError(error.message)
            }
        }
    )
    const handleSubmit = (event) => {
        event.preventDefault();
        login({ variables: { username, password } })
    };
    return (
        <form className="login" onSubmit={handleSubmit}>
            <h1>Login</h1>
            <label>
                Username:
                <input id="username" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </label>
            <label>
                Password:
                <input id="password" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <div>
                {loginError && <p>{loginError}</p>}
                <button type="submit">Submit</button>
            </div>
        </form>
    )
}

export default Login
