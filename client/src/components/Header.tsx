import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import SportContext from '../contexts/SportContext'
import { Sport } from '../const'
import { getRoute, Page } from '../Routes'
import { IS_LOGGED_IN } from '../apollo/queries'

const Header = () => {
  const history = useHistory()
  const [sport, setSport] = useContext(SportContext)
  const headers = {
    [Sport.NBA]: 'NBA Database',
    [Sport.MLB]: 'MLB Database',
  }
  const nextSport = sport == Sport.NBA ? Sport.MLB : Sport.NBA
  const search = `?sport=${nextSport}`
  const seasonRoute = getRoute(Page.Seasons, { search })
  const { data } = useQuery(IS_LOGGED_IN);
  const logout = () => {
    localStorage.clear()
    history.push('/login')
  }
  const logoutButton = (
    <button onClick={() => {
      logout()
    }}>Logout</button>
  )
  return (
    <nav>
      <h1
        data-testid="header"
        onClick={() => {
          setSport(nextSport)
          history.push(seasonRoute)
        }}
      >
        {headers[sport]}
      </h1>
      {data.isLoggedIn && logoutButton}
    </nav>
  )
}

export default Header
