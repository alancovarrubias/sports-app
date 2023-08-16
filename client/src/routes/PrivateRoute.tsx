import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { Paths } from 'app/const'
import { getToken } from 'app/utils/auth'

type PrivateRouteProps = {
    component: React.FC,
    path: string,
    exact?: boolean
}
const PrivateRoute = ({ component: Component, ...rest }: PrivateRouteProps): JSX.Element => {
    const authToken = getToken()
    const loggedIn = authToken && authToken !== 'null'

    return (
        <Route
            {...rest}
            render={props =>
                loggedIn ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{ pathname: Paths.Login, state: { from: props.location } }} />
                )
            }
        />
    )
}

export default PrivateRoute