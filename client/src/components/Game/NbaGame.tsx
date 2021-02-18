import React from 'react'
import { useQuery } from '@apollo/client'
import { Sport, Resource } from '../../const'
import DataTable from '../common/DataTable'
import { IGameProps } from './index'
import { GET_GAME } from '../../apollo/queries'
import { INbaGame } from '../../models'

interface IGameData {
  game: INbaGame
}
interface IGameVars {
  sport: Sport
  game_id: string
}

const NbaGame: React.FC<IGameProps> = ({ sport, game_id }) => {
  const { error, loading, data } = useQuery<IGameData, IGameVars>(
    GET_GAME,
    {
      variables: { sport, game_id },
    }
  )
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error!</p>
  if (!data) return <p>Missing Data</p>
  const { game: { away_team, home_team, away_players, home_players } } = data
  const awayPlayersProps = {
    data: away_players,
    sport,
    resource: Resource.Player,
  }
  const homePlayersProps = {
    data: home_players,
    sport,
    resource: Resource.Player,
  }
  return (
    <div className="nbaGame">
      <div className="nbaAwayHeader">
        <h2>{away_team.name} Players</h2>
      </div>
      <div className="nbaAwayTable tableFixHead">
        <DataTable {...awayPlayersProps} />
      </div>
      <div className="nbaHomeHeader">
        <h2>{home_team.name} Players</h2>
      </div>
      <div className="nbaHomeTable tableFixHead">
        <DataTable {...homePlayersProps} />
      </div>
    </div>
  )
}

export default NbaGame
