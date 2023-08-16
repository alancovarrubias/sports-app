import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Login from 'app/components/Login'
import Home from 'app/components/Home'
import PrivateRoute from 'app/routes/PrivateRoute'
import { Paths } from 'app/const'

const Routes = (): JSX.Element => (
    <Switch>
        <Redirect exact from={Paths.Root} to={Paths.Home} />
        <Route path={Paths.Login} component={Login} />
        <PrivateRoute path={Paths.Home} component={Home} />
    </Switch>
)

export default Routes