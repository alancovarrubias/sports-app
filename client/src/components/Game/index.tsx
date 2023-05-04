import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import SportContext from 'app/contexts/SportContext'
import { Sport } from 'app/const'
import 'app/scss/Game.scss'
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
const Game: React.FC = () => {
  const [sport] = useContext(SportContext)
  const { game_id } = useParams<IParamTypes>()
  const props = {
    sport,
    game_id,
  }
  const GameComponent = sport == Sport.NBA ? NbaGame : MlbGame
  return <>
    <div className="subheader">
      <h3 data-testid="subheader">Game</h3>
    </div>
    <GameComponent {...props} />
  </>
}

export default Game
