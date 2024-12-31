import { gql } from '@apollo/client';
import { GAME_DATA } from './fragments';

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
      ...GameData
    }
  }
  ${GAME_DATA}
`;

export const GAMES_QUERY = gql`
  query Games($date: String!) {
    games(date: $date) {
      ...GameData
    }
  }
  ${GAME_DATA}
`