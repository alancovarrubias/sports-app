import React from 'react'
import { useQuery } from '@apollo/client'
import { Sport, Resource } from 'app/const'
import DataTable from 'app/components/common/DataTable'
import { IGameProps } from './index'
import { GET_GAME } from 'app/apollo/queries'
import { IMlbGame } from 'app/models'

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
  const { game: { away_team, home_team, away_players, home_players } } = data
  const awayBattingProps = {
    data: away_players.filter(player => player.stat.batting),
    sport,
    resource: Resource.Batter,
  }
  const homeBattingProps = {
    data: home_players.filter(player => player.stat.batting),
    sport,
    resource: Resource.Batter,
  }
  const awayPitchingProps = {
    data: away_players.filter(player => player.stat.pitching),
    sport,
    resource: Resource.Pitcher,
  }
  const homePitchingProps = {
    data: home_players.filter(player => player.stat.pitching),
    sport,
    resource: Resource.Pitcher,
  }
  return (
    <div className="mlbGame">
      <div className="awayPitchingTable tableFixHead">
        <h2>{away_team.name} Pitchers</h2>
        <DataTable {...awayPitchingProps} />
      </div>
      <div className="homePitchingTable tableFixHead">
        <h2>{home_team.name} Pitchers</h2>
        <DataTable {...homePitchingProps} />
      </div>
      <div className="awayBattingTable tableFixHead">
        <h2>{away_team.name} Batters</h2>
        <DataTable {...awayBattingProps} />
      </div>
      <div className="homeBattingTable tableFixHead">
        <h2>{home_team.name} Batters</h2>
        <DataTable {...homeBattingProps} />
      </div>
    </div>
  )
}

export default MlbGame
