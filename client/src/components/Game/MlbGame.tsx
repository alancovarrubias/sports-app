import React from 'react'
import { useQuery } from '@apollo/client'
import { Sport, Resource } from '../../const'
import DataTable from '../common/DataTable'
import { IGameProps } from './index'
import { GET_GAME } from '../../apollo/queries'
import { IMlbGame } from '../../models'

interface IGameData {
  game: IMlbGame
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
  const { game: { away_team, home_team } } = data
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
    <div className="mlbGame">
      <div className="mlbHeader">
        <h2>{away_team.name} Pitchers</h2>
      </div>
      <div className="mlbTable tableFixHead">
        <DataTable {...awayPitchingProps} />
      </div>
      <div className="mlbHeader">
        <h2>{home_team.name} Pitchers</h2>
      </div>
      <div className="mlbHeader tableFixHead">
        <DataTable {...homePitchingProps} />
      </div>
      <div className="mlbHeader">
        <h2>{away_team.name} Batters</h2>
      </div>
      <div className="mlbTable tableFixHead">
        <DataTable {...awayBattingProps} />
      </div>
      <div className="mlbHeader">
        <h2>{home_team.name} Batters</h2>
      </div>
      <div className="mlbTable tableFixHead">
        <DataTable {...homeBattingProps} />
      </div>
    </div>
  )
}

export default MlbGame
