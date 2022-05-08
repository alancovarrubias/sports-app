import React, { useContext } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { isLoggedInVar } from 'app/apollo/cache'
import SportContext from 'app/contexts/SportContext'
import 'app/components/scss/Navbar.scss'

interface Props {
  isLoggedIn: boolean
}
const Navbar: React.FC<Props> = ({ isLoggedIn }) => {
  const history = useHistory()
  const [sport] = useContext(SportContext)
  const logout = () => {
    localStorage.clear()
    history.push('/login')
    isLoggedInVar(false)
  }
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  searchParams.set('sport', sport)
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