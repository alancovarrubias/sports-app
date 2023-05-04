import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import SportContext from 'app/contexts/SportContext'
import { createRoute, Page } from 'app/routes'
import { Sport } from 'app/const'
import 'app/scss/Header.scss'

interface HeaderProps {
  isLoggedIn: boolean
}
const Header: React.FC<HeaderProps> = ({ isLoggedIn }) => {
  const history = useHistory()
  const [sport, setSport] = useContext(SportContext)

  if (!isLoggedIn) {
    return null
  }
  const searchParams = new URLSearchParams()
  const nextSport = sport == Sport.NBA ? Sport.MLB : Sport.NBA
  searchParams.append('sport', nextSport)

  const seasonRoute = createRoute(Page.Seasons, { searchParams })
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