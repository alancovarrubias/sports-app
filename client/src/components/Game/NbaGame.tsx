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
  const awayPlayersProps = {
    data: data.game.away_players,
    sport,
    resource: Resource.Player,
  }
  const homePlayersProps = {
    data: data.game.home_players,
    sport,
    resource: Resource.Player,
  }
  return (
    <>
      <DataTable {...awayPlayersProps} />
      <DataTable {...homePlayersProps} />
    </>
  )
}

export default NbaGame
