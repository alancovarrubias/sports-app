import { gql } from '@apollo/client'

export const GET_MATCHUPS = gql`
  query GetMatchups($sport: String!, $date: String!) {
    matchups(sport: $sport, date: $date) {
      ... on MlbGame {
        id
        sport
        away_team {
          name
        }
        home_team {
          name
        }
      }
    }
  }
`