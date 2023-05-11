import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Paths } from 'app/const'
import Home from 'app/components/Home'
import Login from 'app/components/Login'
import NoMatch from 'app/components/NoMatch'
import PrivateRoute from 'app/routes/PrivateRoute'

const AppRoutes = (): JSX.Element => (
    <Switch>
        <Redirect exact from={Paths.Root} to={Paths.Home} />
        <Route path={Paths.Login} component={Login} />
        <PrivateRoute path={Paths.Home} component={Home} />
        <Route component={NoMatch} />
    </Switch>
)

export default AppRoutes