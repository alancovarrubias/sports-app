import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { AUTH_TOKEN, Paths } from 'app/const'
import Home from 'app/components/Home'
import Login from 'app/components/Login'
import NoMatch from 'app/components/NoMatch'
import PrivateRoute from 'app/routes/PrivateRoute'

const Layout = (): JSX.Element => {
  if (localStorage.getItem(AUTH_TOKEN)) {
    return null
  }
  return <div>Logout</div>
}

export default Layout