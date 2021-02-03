import React from 'react'
import { useQuery } from '@apollo/client'
import { Sport, Resource } from '../../const'
import DataTable from '../common/DataTable'
import { IGameProps } from './index'
import { GET_GAME } from '../../apollo/queries'

interface Stat {
  pts: string
}
interface Team {
  name: string
  stat: Stat
}
export interface NbaPlayer {
  id: string
  name: string
  stat: Stat
}
export interface Game {
  date: string
  away_team: Team
  home_team: Team
  away_players: NbaPlayer[]
  home_players: NbaPlayer[]
}
interface IGameData {
  game: Game
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
    <>
      <h2>{away_team.name} Players</h2>
      <div className="tableFixHead" style={{ marginBottom: '2rem' }}>
        <DataTable {...awayPlayersProps} />
      </div>
      <h2>{home_team.name} Players</h2>
      <div className="tableFixHead">
        <DataTable {...homePlayersProps} />
      </div>
    </>
  )
}

export default NbaGame
