import React, { useContext } from 'react'
import { useParams, useHistory, useLocation } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import SportContext from 'app/contexts/SportContext'
import DataTable from 'app/components/common/DataTable'
import { Resource, Sport } from 'app/const'
import { createRoute, Page } from 'app/Routes'
import { GET_GAMES } from 'app/apollo/queries'
import Calculator from './Calculator'
import { Season, Game } from 'app/models'
import "app/components/scss/Games.scss"

interface IGamesData {
  season: Season
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
  const { season: { year }, games } = data
  const gamesProps = {
    data: games,
    resource: Resource.Game,
    sport,
    rowClick: game => {
      const gameRoute = createRoute(Page.Game, {
        season_id,
        game_id: game.id,
        search,
      })
      history.push(gameRoute)
    },
  }
  return (
    <div className="games">
      <div className="calculator">
        <Calculator games={data.games} />
      </div>
      <div className="subheader">
        <h3 data-testid="subheader">{year} Games</h3>
      </div>
      <div className="games-table tableFixHead">
        <DataTable {...gamesProps} />
      </div>
    </div>
  )
}

export default Games
