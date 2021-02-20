import React, { useContext } from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { isLoggedInVar } from 'app/apollo/cache'
import SportContext from 'app/contexts/SportContext'
import { createRoute, Page } from 'app/Routes'
import { Sport } from 'app/const'
import { GET_SEASON } from 'app/apollo/queries'
import { Season } from 'app/models'

interface ISeasonData {
  season: Season
}
interface ISeasonVars {
  sport: Sport
  season_id: string
}
interface NavbarProps {
  isLoggedIn: boolean
}
const Navbar: React.FC<NavbarProps> = ({ isLoggedIn }) => {
  const history = useHistory()
  const [sport, setSport] = useContext(SportContext)
  const logout = () => {
    localStorage.clear()
    history.push('/login')
    isLoggedInVar(false)
  }
  const search = `?sport=${sport}`
  const gamesMatch = useRouteMatch("/seasons/:season_id/games")
  const season_id = gamesMatch ? gamesMatch.params.season_id : null
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
  const { data } = useQuery<ISeasonData, ISeasonVars>(
    GET_SEASON,
    {
      variables: { sport, season_id },
    }
  )
  if (!isLoggedIn) {
    return null;
  }
  const year = data ? data.season.year : null
  const seasonsLink = <li onClick={() => history.push(seasonsRoute)}>Seasons</li>
  const gamesLink = <li onClick={() => history.push(gamesRoute)}>{year} Games</li>
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