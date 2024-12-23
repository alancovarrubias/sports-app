import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
  mutation LoginUs($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        email
      }
      token
    }
  }
`;

export const GAME_UPDATED_SUBSCRIPTION = gql`
  subscription OnGameUpdated {
    updatedGame {
      id
      game_clock
      away_full_game_stat {
        id
        score
      }
      home_full_game_stat {
        id
        score
      }
    }
  }
`;

export const GAMES_QUERY = gql`
  query Games($date: String!) {
    games(date: $date) {
      id
      date
      start_time
      kicking_team {
        ...TeamData
      }
      game_clock
      away_team {
        ...TeamData
      }
      home_team {
        ...TeamData
      }
      away_full_game_stat {
        ...StatData
      }
      home_full_game_stat {
        ...StatData
      }
      away_first_half_stat {
        ...StatData
      }
      home_first_half_stat {
        ...StatData
      }
      full_game_opener
      full_game_closer
    }
  }

  fragment TeamData on Team {
    id
    name
  }

  fragment StatData on Stat {
    id
    c_att
    carries
    passing_yards
    rushing_yards
    score
    total_plays
    total_yards
    ave_per_car
    ave_per_att
    ave_per_play
    longest_rush
    longest_pass
    typa
    typai
    typc
    typp
  }
`