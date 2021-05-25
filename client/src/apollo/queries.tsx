import { gql } from '@apollo/client'

export const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;


export const LOGIN_USER = gql`
  mutation LoginUser($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
    }
  }
`
export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      username
    }
  }
`
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

export const GET_MATCHUPS = gql`
  query GetMatchups($sport: String!, $date: String!) {
    matchups(sport: $sport, date: $date) {
      id
      time
      sport
      away_team {
        name
      }
      home_team {
        name
      }
    }
  }
`

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
      id
      date
      away_team {
        ...GamesTeamStat
      }
      home_team {
        ...GamesTeamStat
      }
      lines {
        bookie
        total
        spread
      }
      preds {
        desc
        away_score
        home_score
      }
      sport
    }
  }
`

export const GET_GAME = gql`
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
