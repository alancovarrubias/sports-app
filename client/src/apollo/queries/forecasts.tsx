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
      time
      sport
      forecasts {
        local_time
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