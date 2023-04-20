import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import { useHistory, useLocation } from 'react-router-dom'
import SportContext from 'app/contexts/SportContext'
import { Resource, Sport } from 'app/const'
import { Season } from 'app/models'
import { GET_SEASONS } from 'app/apollo/queries'
import { createRoute, Page } from 'app/routes'
import DataTable from 'app/components/common/DataTable'
import 'app/components/scss/Seasons.scss'

interface SeasonsData {
  seasons: Season[]
}
interface SeasonsQuery {
  sport: Sport
}

const Seasons: React.FC = () => {
  const [sport] = useContext(SportContext)
  const history = useHistory()
  const searchParams = new URLSearchParams(useLocation().search)
  const { error, loading, data } = useQuery<SeasonsData, SeasonsQuery>(
    GET_SEASONS,
    {
      variables: { sport },
    }
  )
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error!</p>
  if (!data) return <p>Missing Data</p>

  const seasonsProps = {
    data: data.seasons,
    resource: Resource.Season,
    sport,
    rowClick: () => {
      const gamesRoute = createRoute(Page.Games, { searchParams })
      history.push(gamesRoute)
    },
  }
  return (
    <div className="seasons">
      <h2 data-testid="subheader">Seasons</h2>
      <div className="seasons-table tableFixHead">
        <DataTable {...seasonsProps} />
      </div>
    </div>
  )
}

export default Seasons
