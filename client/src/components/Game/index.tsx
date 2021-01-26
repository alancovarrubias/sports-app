import React, { useContext } from 'react'
import { useParams, Link, useLocation } from 'react-router-dom'
import { getRoute, Page } from '../../Routes'
import SportContext from '../../contexts/SportContext'
import { Sport } from '../../const'
import NbaGame from './NbaGame'
import MlbGame from './MlbGame'

export interface IGameProps {
  sport: Sport
  game_id: string
}
interface IParamTypes {
  game_id: string
  season_id: string
}
const Game = () => {
  const [sport] = useContext(SportContext)
  const { season_id, game_id } = useParams<IParamTypes>()
  const search = useLocation().search
  const props = {
    sport,
    game_id,
  }
  const GameComponent = sport == Sport.NBA ? NbaGame : MlbGame
  const gamesRoute = getRoute(Page.Games, { search, season_id })
  return (
    <>
      <h2 data-testid="subheader">Game</h2>
      <Link to={gamesRoute}>Games</Link>
      <GameComponent {...props} />
    </>
  )
}

export default Game
