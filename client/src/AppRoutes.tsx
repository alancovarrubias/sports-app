import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Home from 'app/components/Home'
import Login from 'app/components/Login'
import NoMatch from 'app/components/NoMatch'
import PrivateRoute from 'app/routes/PrivateRoute'

const AppRoutes = (): JSX.Element => (
    <Switch>
        <Redirect exact from="/" to="/home" />
        <Route path="/login" component={Login} />
        <PrivateRoute path="/home" component={Home} />
        <Route component={NoMatch} />
    </Switch>
)

export default AppRoutes