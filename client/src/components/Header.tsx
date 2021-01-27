import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { isLoggedInVar } from '../apollo/cache'

import SportContext from '../contexts/SportContext'
import { getRoute, Page } from '../Routes'
import { Sport } from '../const'

interface HeaderProps {
  isLoggedIn: boolean
}
const Header: React.FC<HeaderProps> = ({ isLoggedIn }) => {

  const history = useHistory()
  const [sport, setSport] = useContext(SportContext)

  if (!isLoggedIn) {
    return null
  }
  const headers = {
    [Sport.NBA]: 'NBA Database',
    [Sport.MLB]: 'MLB Database',
  }
  const logout = () => {
    localStorage.clear()
    history.push('/login')
    isLoggedInVar(false)
  }
  const nextSport = sport == Sport.NBA ? Sport.MLB : Sport.NBA
  const search = `?sport=${nextSport}`
  const seasonRoute = getRoute(Page.Seasons, { search })
  const toggleSport = () => {
    setSport(nextSport)
    history.push(seasonRoute)
  }
  return (
    <>
      <header>
        <h1
          data-testid="header"
          onClick={toggleSport}
        >
          {headers[sport]}
        </h1>
      </header>
      <nav>
        <ul>
          <li onClick={toggleSport}>Toggle Sport</li>
          <li onClick={logout}>Logout</li>
        </ul>
      </nav>
    </>
  )
}

export default Header