import React, { useContext } from 'react'
import { useParams, useHistory, Link, useLocation } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import SportContext from '../../contexts/SportContext'
import DataTable from '../common/DataTable'
import { Resource, Sport } from '../../const'
import { getRoute, Page } from '../../Routes'
import { GET_GAMES } from '../../apollo/queries'
import Calculator from './Calculator'

export interface Pred {
  id: string
  away_score: number
  home_score: number
}
export interface Line {
  spread: number
  total: number
}
interface Stat {
  pts: number
}
interface Team {
  name: string
  stat: Stat
}
export interface Game {
  id: string
  date: string
  away_team: Team
  home_team: Team
  lines: [Line]
  preds: [Pred]
}
interface IGamesData {
  games: Game[]
}
interface IGamesVars {
  sport: Sport
  season_id: string
  offset?: number
  limit?: number
}
interface IParamTypes {
  season_id: string
}
const Games: React.FC = () => {
  const [sport] = useContext(SportContext)
  const { season_id } = useParams<IParamTypes>()
  const search = useLocation().search
  const history = useHistory()
  const { error, loading, data } = useQuery<IGamesData, IGamesVars>(
    GET_GAMES,
    {
      variables: { sport, season_id },
    }
  )
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error!</p>
  if (!data) return <p>Missing Data</p>
  const gamesProps = {
    data: data.games,
    resource: Resource.Game,
    sport,
    rowClick: game => {
      const gameRoute = getRoute(Page.Game, {
        season_id,
        game_id: game.id,
        search,
      })
      history.push(gameRoute)
    },
  }
  const seasonsRoute = getRoute(Page.Seasons, {
    season_id,
    search,
  })
  return (
    <>
      <div style={{ marginBottom: '2rem' }}>
        <h2 data-testid="subheader">Games</h2>
        <Link to={seasonsRoute}>Seasons</Link>
        <Calculator games={data.games} diff={3} />
      </div>
      <h2 data-testid="subheader">Games</h2>
      <div className="tableFixHead" style={{ marginBottom: '2rem' }}>
        <DataTable {...gamesProps} />
      </div>
    </>
  )
}

export default Games
