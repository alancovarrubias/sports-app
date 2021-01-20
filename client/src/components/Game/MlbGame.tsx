import React from 'react'
import { useQuery } from '@apollo/client'
import { Sport, Resource } from '../../const'
import useDataTable, { DataModel } from '../../hooks/useDataTable'
import { IGameProps } from './index'
import { GET_GAME } from '../../apollo/queries'

interface Stat extends DataModel {
  pts: string
}
interface Team extends DataModel {
  name: string
  stat: Stat
}
interface Player extends DataModel {
  name: string
  stat: Stat
}
interface Game extends DataModel {
  date: string
  away_team: Team
  home_team: Team
  away_players: Player[]
  home_players: Player[]
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
  const [AwayBattingTable] = useDataTable({
    data: data.game.away_players.filter(player => player.stat.batting),
    sport,
    resource: Resource.Batter,
  })
  const [HomeBattingTable] = useDataTable({
    data: data.game.home_players.filter(player => player.stat.batting),
    sport,
    resource: Resource.Batter,
  })
  const [AwayPitchingTable] = useDataTable({
    data: data.game.away_players.filter(player => player.stat.pitching),
    sport,
    resource: Resource.Pitcher,
  })
  const [HomePitchingTable] = useDataTable({
    data: data.game.home_players.filter(player => player.stat.pitching),
    sport,
    resource: Resource.Pitcher,
  })
  return (
    <React.Fragment>
      <h2 data-testid="subheader">Game</h2>
      <AwayPitchingTable />
      <HomePitchingTable />
      <AwayBattingTable />
      <HomeBattingTable />
    </React.Fragment>
  )
}

export default MlbGame
