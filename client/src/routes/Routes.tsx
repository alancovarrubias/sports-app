import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Login from 'app/components/Login'
import Home from 'app/components/Home'
import Games from 'app/components/Games'
import PrivateRoute from 'app/routes/PrivateRoute'
import { Paths } from 'app/const'

const Routes = (): JSX.Element => {
    return (
        <Switch>
            <Redirect exact from={Paths.Root} to={Paths.Home} />
            <Route path={Paths.Login} component={Login} />
            <PrivateRoute path={Paths.Home} component={Home} />
            <PrivateRoute path={Paths.Games} component={Games} />
        </Switch>
    )
}

export default Routes