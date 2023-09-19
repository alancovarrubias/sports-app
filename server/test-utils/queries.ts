export const SEASONS_QUERY = `#graphql
  query Seasons {
    seasons {
      id
      year
    }
  }
`;

export const GAMES_QUERY = `#graphql
  query Games($seasonId: String!) {
    games(seasonId: $seasonId) {
      id
      date
      start_time
      away_team {
        id
        abbr
        city
        name
      }
      home_team {
        id
        abbr
        city
        name
      }
      away_full_game_stat {
        id
        attempts
        carries
        completions
        passing_yards
        rushing_yards
      }
      home_full_game_stat {
        id
        attempts
        carries
        completions
        passing_yards
        rushing_yards
      }
    }
  }
`;

export const CURRENT_USER_QUERY = `#graphql
  query CurrentUser {
    currentUser {
      id
      email
    }
  }
`;

export const LOGIN_MUTATION = `#graphql
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        email
      }
    }
  }
`;
