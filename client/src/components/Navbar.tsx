import React, { useContext } from 'react'
import { useHistory, useRouteMatch, useLocation } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { isLoggedInVar } from 'app/apollo/cache'
import SportContext from 'app/contexts/SportContext'
import { createRoute, Page, Routes } from 'app/Routes'
import { Sport } from 'app/const'
import { GET_SEASON } from 'app/apollo/queries'
import { Season } from 'app/models'
import 'app/components/scss/Navbar.scss'

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
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  searchParams.set('sport', sport)
  const gamesMatch = useRouteMatch(Routes[Page.Games])
  /*
  const season_id = gamesMatch ? gamesMatch.params.season_id : null
  const gameMatch = useRouteMatch(Routes[Page.Game])
  const seasonsRoute = createRoute(Page.Seasons, { searchParams })
  const gamesRoute = createRoute(Page.Games, { searchParams })
  const toggleSport = () => {
    const nextSport = sport == Sport.NBA ? Sport.MLB : Sport.NBA
    searchParams.set('sport', sport)
    const toggleSportRoute = createRoute(Page.Seasons, { searchParams })
    setSport(nextSport)
    history.push(toggleSportRoute)
  }
  */
  if (!isLoggedIn) {
    return null;
  }
  return (
    <nav>
      <ul>
        <li onClick={logout}>Logout</li>
      </ul>
    </nav>
  )
}

export default Navbar