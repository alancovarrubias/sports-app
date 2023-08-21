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