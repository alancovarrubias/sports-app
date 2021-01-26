import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'

import SportContext from '../contexts/SportContext'
import { getRoute, Page } from '../Routes'
import { Sport } from '../const'

const Header = ({ isLoggedIn }) => {
  const history = useHistory()
  const [sport, setSport] = useContext(SportContext)

  if (!isLoggedIn) {
    return null
  }
  const headers = {
    [Sport.NBA]: 'NBA Database',
    [Sport.MLB]: 'MLB Database',
  }
  const nextSport = sport == Sport.NBA ? Sport.MLB : Sport.NBA
  const search = `?sport=${nextSport}`
  const seasonRoute = getRoute(Page.Seasons, { search })
  return (
    <header>
      <h1
        data-testid="header"
        onClick={() => {
          setSport(nextSport)
          history.push(seasonRoute)
        }}
      >
        {headers[sport]}
      </h1>
    </header>
  )
}

export default Header
