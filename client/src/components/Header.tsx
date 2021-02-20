import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import SportContext from 'app/contexts/SportContext'
import { createRoute, Page } from 'app/Routes'
import { Sport } from 'app/const'

interface HeaderProps {
  isLoggedIn: boolean
}
const Header: React.FC<HeaderProps> = ({ isLoggedIn }) => {
  const history = useHistory()
  const [sport, setSport] = useContext(SportContext)

  if (!isLoggedIn) {
    return null
  }
  const nextSport = sport == Sport.NBA ? Sport.MLB : Sport.NBA
  const seasonSearch = `?sport=${nextSport}`
  const seasonRoute = createRoute(Page.Seasons, { search: seasonSearch })
  const toggleSport = () => {
    setSport(nextSport)
    history.push(seasonRoute)
  }
  return (
    <header>
      <h1
        data-testid="header"
        onClick={toggleSport}
      >
        {sport} Database
        </h1>
    </header>
  )
}

export default Header