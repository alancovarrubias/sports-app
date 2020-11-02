import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import SportContext from '../contexts/SportContext'
import { Sport } from '../const'
import { getRoute, Page } from '../Routes'

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
  return (
    <h1
      data-testid="header"
      onClick={() => {
        setSport(nextSport)
        history.push(seasonRoute)
      }}
    >
      {headers[sport]}
    </h1>
  )
}

export default Header
