import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { LOGIN_USER } from '../apollo/queries'
import { AUTH_TOKEN } from '../const'
import { isLoggedInVar } from '../apollo/cache'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const history = useHistory()
    const [login] = useMutation(LOGIN_USER, {
        variables: {
            username,
            password,
        },
        onCompleted: ({ login }) => {
            localStorage.setItem(AUTH_TOKEN, login.token)
            isLoggedInVar(true)
            history.push('/seasons')
        }
    })
    return (
        <div className="login">
            <h2>Login</h2>
            <div>
                <label htmlFor="username">Username</label>
                <input id="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div>
                <button onClick={() => login()}>Login</button>
            </div>
        </div>
    )
}

export default Login