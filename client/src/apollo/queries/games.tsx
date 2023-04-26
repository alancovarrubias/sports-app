import { gql } from '@apollo/client'

export const GET_GAMES = gql`
  fragment GamesTeamStat on Team {
    name
    stat {
      ... on NbaStat {
        pts
      }
      ... on MlbStat {
        batting {
          r
        }
      }
    }
  }
  fragment GamesPlayerStat on Player {
      id
      name
      season_stats {
        year
        pitching {
          ip
        }
      }
      sport
  }
  query GetGames($sport: String!, $season_id: ID!, $offset: Int, $limit: Int) {
    season(sport: $sport, season_id: $season_id) {
        id
        sport
        year
    }
    games(
      sport: $sport
      season_id: $season_id
      offset: $offset
      limit: $limit
    ) {
      ... on MlbGame {
        id
      	date
        away_starter {
          ...GamesPlayerStat
        }
      	home_starter {
          ...GamesPlayerStat
        }
        away_team {
        	...GamesTeamStat
        }
        home_team {
          ...GamesTeamStat
        }
        sport
      }
    }
  }
`
