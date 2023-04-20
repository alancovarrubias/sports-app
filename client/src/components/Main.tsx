import React, { useState } from 'react'
import { Switch, Redirect, Route, useHistory } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import SportContext from 'app/contexts/SportContext'
import { Sport } from 'app/const'
import PrivateRoute from 'app/routes/PrivateRoute'
import { Routes, Page } from 'app/routes'
import { IS_LOGGED_IN } from 'app/apollo/queries'
import './scss/Grid.scss'
import './scss/style.scss'
import Header from './Header'
import Forecasts from './Forecasts'
import Navbar from './Navbar'
import Matchups from './Matchups'
import Seasons from './Seasons'
import Games from './Games'
import Game from './Game'
import Home from './Home'
import Login from './Login'
import NoMatch from './NoMatch'

const Main: React.FC = () => {
  const history = useHistory()
  const params = new URLSearchParams(history.location.search)
  const sportParam = params.get('sport') as Sport
  const sport = sportParam ? sportParam : Sport.MLB
  const sportHook = useState(sport)
  const { data: { isLoggedIn } } = useQuery(IS_LOGGED_IN);
  return (
    <SportContext.Provider value={sportHook}>
      <div className="grid-container">
        <Navbar isLoggedIn={isLoggedIn} />
        <Header isLoggedIn={isLoggedIn} />
        <main>
          <Switch>
            <Redirect exact from="/" to="/home" />
            <Route path={Routes[Page.Login]} component={Login} exact />
            <PrivateRoute path={Routes[Page.Home]} component={Home} exact />
            <PrivateRoute path={Routes[Page.Matchups]} component={Matchups} exact />
            <PrivateRoute path={Routes[Page.Forecasts]} component={Forecasts} exact />
            <PrivateRoute path={Routes[Page.Seasons]} component={Seasons} exact />
            <PrivateRoute path={Routes[Page.Games]} component={Games} exact />
            <PrivateRoute
              path={Routes[Page.Game]}
              component={Game}
              exact
            />
            <Route component={NoMatch} />
          </Switch>
        </main>
      </div>
    </SportContext.Provider>
  )
}

export default Main
