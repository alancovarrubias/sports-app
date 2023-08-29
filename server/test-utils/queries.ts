export const GAMES_QUERY = `#graphql
  query Games($seasonId: String!) {
    games(seasonId: $seasonId) {
      id
      date
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
