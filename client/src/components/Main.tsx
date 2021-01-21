import React, { useState } from 'react'
import { Switch, Redirect, Route, useHistory } from 'react-router-dom'
import SportContext from '../contexts/SportContext'
import { Sport } from '../const'
import PrivateRoute from '../PrivateRoute'
import Header from './Header'
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
  return (
    <SportContext.Provider value={sportHook}>
      <Header />
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
        <PrivateRoute component={NoMatch} />
      </Switch>
    </SportContext.Provider>
  )
}

export default Main
