import React from 'react'
import { useQuery } from '@apollo/client'
import { Sport, Resource } from '../../const'
import DataTable from '../common/DataTable'
import { IGameProps } from './index'
import { GET_GAME } from '../../apollo/queries'

interface Stat {
  batting: {
    pts: string
  },
  pitching: {
    pts: string
  }
}
interface Team {
  name: string
  stat: Stat
}
export interface MlbPlayer {
  id: string
  name: string
  stat: Stat
}
interface Game {
  date: string
  away_team: Team
  home_team: Team
  away_players: MlbPlayer[]
  home_players: MlbPlayer[]
}
interface IGameData {
  game: Game
}
interface IGameVars {
  sport: Sport
  game_id: string
}
const MlbGame: React.FC<IGameProps> = ({ sport, game_id }) => {
  const { error, loading, data } = useQuery<IGameData, IGameVars>(
    GET_GAME,
    {
      variables: { sport, game_id },
    }
  )
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error!</p>
  if (!data) return <p>Missing Data</p>
  const awayBattingProps = {
    data: data.game.away_players.filter(player => player.stat.batting),
    sport,
    resource: Resource.Batter,
  }
  const homeBattingProps = {
    data: data.game.home_players.filter(player => player.stat.batting),
    sport,
    resource: Resource.Batter,
  }
  const awayPitchingProps = {
    data: data.game.away_players.filter(player => player.stat.pitching),
    sport,
    resource: Resource.Pitcher,
  }
  const homePitchingProps = {
    data: data.game.home_players.filter(player => player.stat.pitching),
    sport,
    resource: Resource.Pitcher,
  }
  return (
    <>
      <DataTable {...awayPitchingProps} />
      <DataTable {...homePitchingProps} />
      <DataTable {...awayBattingProps} />
      <DataTable {...homeBattingProps} />
    </>
  )
}

export default MlbGame
