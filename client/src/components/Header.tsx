import React, { useContext, FunctionComponent } from 'react'
import { useHistory } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import SportContext from '../contexts/SportContext'
import { Sport } from '../const'
import { getRoute, Page } from '../Routes'
import { IS_LOGGED_IN } from '../apollo/queries'
import { isLoggedInVar } from '../apollo/cache'
import Navbar from '../@setproduct-ui/core/Navbar'
import Button from '../@setproduct-ui/core/Button'

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
    isLoggedInVar(false)
  }
  const logoutButton = (
    <button onClick={() => {
      logout()
    }}>Logout</button>
  )
  return (
    <Navbar view="raised">
      <h1
        data-testid="header"
        onClick={() => {
          setSport(nextSport)
          history.push(seasonRoute)
        }}
      >
        {headers[sport]}
      </h1>
      <Button text="HEY" />
      {data.isLoggedIn && logoutButton}
    </Navbar>
  )
}

export default Header
