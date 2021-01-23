import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import { useHistory, useLocation } from 'react-router-dom'
import SportContext from '../contexts/SportContext'
import DataTable, { DataModel } from './common/DataTable'
import { Resource, Sport } from '../const'
import { getRoute, Page } from '../Routes'
import { gql } from '@apollo/client'

export const GET_SEASONS_QUERY = gql`
  query GetSeasons($sport: String!) {
    seasons(sport: $sport) {
      id
      sport
      year
    }
  }
`
export interface Season {
  id: string
  year: number
}
interface ISeasonsData {
  seasons: Season[]
}
interface ISeasonsVars {
  sport: Sport
}

const Seasons = () => {
  const [sport] = useContext(SportContext)
  const history = useHistory()
  const search = useLocation().search
  const { error, loading, data } = useQuery<ISeasonsData, ISeasonsVars>(
    GET_SEASONS_QUERY,
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
    rowClick: season => {
      const gamesRoute = getRoute(Page.Games, { search, season_id: season.id })
      history.push(gamesRoute)
    },
  }
  return (
    <>
      <h2 data-testid="subheader">Seasons</h2>
      <DataTable {...seasonsProps} />
    </>
  )
}

export default Seasons
