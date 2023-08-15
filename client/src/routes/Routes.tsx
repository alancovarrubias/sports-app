import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Login from 'app/components/Login'
import Home from 'app/components/Home'
import PrivateRoute from 'app/routes/PrivateRoute'

const Routes = (): JSX.Element => (
    <Switch>
        <Redirect exact from='/' to='/home' />
        <Route path='/login' component={Login} />
        <PrivateRoute path='/home' component={Home} />
    </Switch>
)

export default Routes