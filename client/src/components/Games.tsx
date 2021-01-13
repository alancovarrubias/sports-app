import React, { useContext } from 'react'
import { useParams, useHistory, Link, useLocation } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import SportContext from '../contexts/SportContext'
import useDataTable, { DataModel } from '../hooks/useDataTable'
import { Resource, Sport } from '../const'
import { getRoute, Page } from '../Routes'
import { GET_GAMES_QUERY } from '../apollo/queries'
import useCalculator from '../hooks/useCalculator'

interface Pred {
  away_score: number
  home_score: number
}
export interface Line {
  spread: number
  total: number
}
interface Stat extends DataModel {
  pts: number
}
interface Team extends DataModel {
  name: string
  stat: Stat
}
export interface Game extends DataModel {
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
  offset: number
  limit: number
}
interface IParamTypes {
  season_id: string
}
const Games = () => {
  const [sport] = useContext(SportContext)
  const { season_id } = useParams<IParamTypes>()
  const search = useLocation().search
  const history = useHistory()
  const { error, loading, data, fetchMore } = useQuery<IGamesData, IGamesVars>(
    GET_GAMES_QUERY,
    {
      variables: { sport, season_id, offset: 0, limit: 100 },
    }
  )
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error!</p>
  if (!data) return <p>Missing Data</p>
  const [GamesTable] = useDataTable({
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
  })
  const [Calculator] = useCalculator({ games: data.games })
  const seasonsRoute = getRoute(Page.Seasons, {
    season_id,
    search,
  })
  return (
    <>
      <h2 data-testid="subheader">Games</h2>
      <Link to={seasonsRoute}>Seasons</Link>
      <Calculator />
      <GamesTable />
      <button
        onClick={() =>
          fetchMore({
            variables: {
              offset: data.games.length,
            },
            updateQuery: (prev, { fetchMoreResult }) => {
              if (!fetchMoreResult) return prev
              return {
                ...prev,
                games: [...prev.games, ...fetchMoreResult.games]
              }
            },
          })
        }
      >
        Fetch More
      </button>
    </>
  )
}

export default Games
