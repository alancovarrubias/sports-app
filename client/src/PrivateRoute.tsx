import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { AUTH_TOKEN } from './const'

const PrivateRoute = ({ component: Component, ...rest }) => {

    const authToken = localStorage.getItem(AUTH_TOKEN)
    const loggedIn = authToken && authToken !== 'null'

    return (
        <Route
            {...rest}
            render={props =>
                loggedIn ? (
                    <Component {...props} />
                ) : (
                        <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
                    )
            }
        />
    )
}

export default PrivateRoute