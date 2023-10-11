export const SEASONS_QUERY = `#graphql
  query Seasons {
    seasons {
      id
      year
    }
  }
`;

const TEAM_ATTRIBUTES = `#graphql
  id
  abbr
  city
  name
`;

const STAT_ATTRIBUTES = `#graphql
  id
  carries
  c_att
  passing_yards
  rushing_yards
  score
  total_plays
  total_yards
  ave_per_car
  ave_per_att
  ave_per_play
  longest_pass
  longest_rush
  typa
  typai
  typc
  typp
`;

const LINE_ATTRIBUTES = `#graphql
  id
  spread
  total
`;

export const GAMES_QUERY = `#graphql
  query Games($date: String!) {
    games(date: $date) {
      id
      date
      start_time
      game_clock
      kicked
      away_team {
        ${TEAM_ATTRIBUTES}
      }
      home_team {
        ${TEAM_ATTRIBUTES}
      }
      away_full_game_stat {
        ${STAT_ATTRIBUTES}
      }
      home_full_game_stat {
        ${STAT_ATTRIBUTES}
      }
      away_first_half_stat {
        ${STAT_ATTRIBUTES}
      }
      home_first_half_stat {
        ${STAT_ATTRIBUTES}
      }
      full_game_line {
        ${LINE_ATTRIBUTES}
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
