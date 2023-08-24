import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { Paths } from 'app/const'
import { UserContext } from 'app/contexts/UserContext'

type PrivateRouteProps = {
    component: React.FC,
    path: string,
    exact?: boolean
}
const PrivateRoute = ({ component: Component, ...rest }: PrivateRouteProps): JSX.Element => {
    const auth = useContext(UserContext)

    return (
        <Route
            {...rest}
            render={props =>
                auth.isLoggedIn ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{ pathname: Paths.Login, state: { from: props.location } }} />
                )
            }
        />
    )
}

export default PrivateRoute