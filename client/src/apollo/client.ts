import { ApolloClient, ApolloLink, createHttpLink, InMemoryCache } from '@apollo/client';
import { split } from "@apollo/client";
import fetch from 'cross-fetch'
import { getToken } from 'app/utils/auth';
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";

async function createApolloClient() {
  const response = await fetch('/config.json');
  const config = await response.json();
  const host = config.HOST;
  const protocol = config.PROTOCOL;
  const ws_protocol = config.WS_PROTOCOL;

  const httpLink = createHttpLink({
    uri: `${protocol}://${host}/graphql`,
    fetch,
  })
  const wsLink = new GraphQLWsLink(
    createClient({
      url: `${ws_protocol}://${host}/subscriptions`,
    }),
  );
  const authLink = new ApolloLink((operation, forward) => {
    const token = getToken()
    if (token) {
      operation.setContext({
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    return forward(operation);
  });
  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === "OperationDefinition" &&
        definition.operation === "subscription"
      );
    },
    wsLink,
    authLink.concat(httpLink)
  );
  const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
    connectToDevTools: true
  })
  return client
}

export default createApolloClient