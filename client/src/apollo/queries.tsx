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

export const GET_GAMES_QUERY = gql`
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
  query GetGames($sport: String!, $season_id: ID!, $offset: Int, $limit: Int) {
    games(
      sport: $sport
      season_id: $season_id
      offset: $offset
      limit: $limit
    ) {
      id
      date
      away_team {
        ...GamesTeamStat
      }
      home_team {
        ...GamesTeamStat
      }
      sport
    }
  }
`

export const GET_GAME_QUERY = gql`
  fragment GameTeamStat on Team {
    id
    name
    sport
    stat {
      ... on NbaStat {
        pts
      }
      ... on MlbStat {
        pitching {
          r
        }
        batting {
          r
        }
      }
    }
  }
  fragment GamePlayerStat on Player {
    id
    name
    sport
    stat {
      ... on NbaStat {
        sp
        fg
        fga
        fg3
        fg3a
        pts
        ortg
        drtg
      }
      ... on MlbStat {
        pitching {
          ip
          h
          r
          er
          bb
          so
          hr
          era
        }
        batting {
          ab
          r
          h
          rbi
          bb
          so
          pa
          ba
          obp
          slg
          ops
        }
      }
    }
  }
  query GetGame($sport: String!, $game_id: ID!) {
    game(sport: $sport, game_id: $game_id) {
      id
      date
      away_team {
        ...GameTeamStat
      }
      home_team {
        ...GameTeamStat
      }
      away_players {
        ...GamePlayerStat
      }
      home_players {
        ...GamePlayerStat
      }
      sport
    }
  }
`
