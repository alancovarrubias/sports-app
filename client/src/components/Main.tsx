import React, { useState } from 'react'
import { Switch, Redirect, Route, useHistory } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import SportContext from '../contexts/SportContext'
import { Sport } from '../const'
import PrivateRoute from '../PrivateRoute'
import { IS_LOGGED_IN } from '../apollo/queries'
import Header from './Header'
import Navbar from './Navbar'
import Seasons from './Seasons'
import Games from './Games'
import Game from './Game'
import Login from './Login'
import NoMatch from './NoMatch'

const Main = () => {
  const history = useHistory()
  const params = new URLSearchParams(history.location.search)
  const sportParam = params.get('sport') as Sport
  const sport = sportParam ? sportParam : Sport.NBA
  const sportHook = useState(sport)
  const { data: { isLoggedIn } } = useQuery(IS_LOGGED_IN);
  return (
    <SportContext.Provider value={sportHook}>
      <div className="wrapper">
        <Header isLoggedIn={isLoggedIn} />
        <Navbar isLoggedIn={isLoggedIn} />
        <div className="main">
          <Switch>
            <Redirect exact from="/" to="/seasons" />
            <Route path="/login" component={Login} exact />
            <PrivateRoute path="/seasons" component={Seasons} exact />
            <PrivateRoute path="/seasons/:season_id/games" component={Games} exact />
            <PrivateRoute
              path="/seasons/:season_id/games/:game_id"
              component={Game}
              exact
            />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </div>
    </SportContext.Provider>
  )
}

export default Main
