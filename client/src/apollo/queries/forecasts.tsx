import { gql } from '@apollo/client'

export const GET_FORECASTS = gql`
  query GetForecasts($sport: String!, $game_id: ID!) {
    game(sport: $sport, game_id: $game_id) {
      ... on MlbGame {
        id
      	date
        away_team {
          name
        }
        home_team {
          name
        }
      	sport
      }
    }
    forecasts(sport: $sport, game_id: $game_id) {
      id
      datetime
      sport
      forecasts {
        datetime
        conditions
        temp
        dew
        humidity
        wind
        pressure
      }
    }
  }
`