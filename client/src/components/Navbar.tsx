import React, { useContext } from 'react'
import { Link, useHistory, useLocation, useParams, useRouteMatch } from 'react-router-dom'
import { isLoggedInVar } from '../apollo/cache'

import { useQuery } from '@apollo/client'
import SportContext from '../contexts/SportContext'
import { createRoute, Page, getPage } from '../Routes'
import { Sport } from '../const'
import { GET_SEASON } from '../apollo/queries'
import {Season } from './Seasons'

interface ISeasonData {
  season: Season
}
interface ISeasonVars {
  sport: Sport
  season_id: string
}
interface HeaderProps {
  isLoggedIn: boolean
}
const Navbar: React.FC<HeaderProps> = () => {
  const history = useHistory()
  const [sport, setSport] = useContext(SportContext)
  const logout = () => {
    localStorage.clear()
    history.push('/login')
    isLoggedInVar(false)
  }
  const search = `?sport=${sport}`
  const gamesMatch = useRouteMatch("/seasons/:season_id/games")
  const season_id  = gamesMatch ? gamesMatch.params.season_id : null
  const gameMatch = useRouteMatch("/seasons/:season_id/games/:game_id")
  const seasonsRoute = createRoute(Page.Seasons, { search })
  const gamesRoute = createRoute(Page.Games, { search, season_id })
  const toggleSport = () => {
    const nextSport = sport == Sport.NBA ? Sport.MLB : Sport.NBA
    const toggleSearch = `?sport=${nextSport}`
    const toggleSportRoute = createRoute(Page.Seasons, { search: toggleSearch })
    setSport(nextSport)
    history.push(toggleSportRoute)
  }
  const { loading, data } = useQuery<ISeasonData, ISeasonVars>(
    GET_SEASON,
    {
      variables: { sport, season_id },
    }
  )
  if (loading) {
    return null
  }
  const year = data.season.year
  const seasonsLink = <li><Link to={seasonsRoute}>Seasons</Link></li>
  const gamesLink = <li><Link to={gamesRoute}>{year} Games</Link></li>
  return (
    <nav>
      <ul>
        {gamesMatch && seasonsLink}
        {gameMatch && gamesLink}
        <li onClick={toggleSport}>Toggle Sport</li>
        <li onClick={logout}>Logout</li>
      </ul>
    </nav>
  )
}

export default Navbar