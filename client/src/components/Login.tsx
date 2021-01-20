import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { LOGIN_USER, GET_USERS } from '../apollo/queries'
import { useHistory } from 'react-router'

const Login = () => {
    const history = useHistory()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [login] = useMutation(LOGIN_USER, {
        variables: {
            username,
            password,
        },
        onCompleted: ({ login }) => {
            console.log(login)
            localStorage.setItem('auth-token', login.token)
        }
    })
    const { data } = useQuery(GET_USERS)
    console.log(data)
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
