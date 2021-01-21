import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { LOGIN_USER } from '../apollo/queries'
import { AUTH_TOKEN } from '../const'

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
            history.push('/seasons')
        }
    })
    return (
        <>
            <h2>Login</h2>
            <label htmlFor="username">Username</label>
            <input id="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <label htmlFor="password">Password</label>
            <input id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={() => login()}>Login</button>
        </>
    )
}

export default Login
