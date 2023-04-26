import { gql } from '@apollo/client'

export const GET_SEASONS = gql`
  query GetSeasons($sport: String!) {
    seasons(sport: $sport) {
      id
      sport
      year
    }
  }
`

export const GET_SEASON = gql`
  query GetSeason($sport: String!, $season_id: ID!) {
    season(sport: $sport, season_id: $season_id) {
      id
      sport
      year
    }
  }
`
