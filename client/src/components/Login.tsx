import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { LOGIN_USER } from '../apollo/queries'
import { AUTH_TOKEN } from '../const'
import { isLoggedInVar } from '../apollo/cache'

const Login: React.FC = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [invalid, setInvalid] = useState(false)
    const history = useHistory()
    const [login] = useMutation(LOGIN_USER, {
        variables: {
            username,
            password,
        },
        onCompleted: ({ login }) => {
            if (login.token) {
                localStorage.setItem(AUTH_TOKEN, login.token)
                isLoggedInVar(true)
                history.push('/seasons')
            } else {
                setInvalid(true)
            }
        }
    })
    return (
        <div className="login">
            <h2>Login</h2>
            <div>
                <label htmlFor="username">Username</label>
                <input id="username" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input id="password" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div>
                <button onClick={() => login()}>Login</button>
                {invalid && <p>Invalid Credentials. Please try again.</p>}
            </div>
        </div>
    )
}

export default Login
