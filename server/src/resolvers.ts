import { GraphQLError } from "graphql";
import { Resolvers } from "@app/__generated__/resolvers-types";
import pubsub from "./pubsub";

const withAuthentication = (resolverFunction) => {
  return async (root, args, context) => {
    if (!context.user) {
      throw new GraphQLError("User is not authenticated", {
        extensions: {
          code: "UNAUTHENTICATED",
          http: { status: 401 },
        },
      });
    }
    return await resolverFunction(root, args, context);
  };
};
const resolvers: Resolvers = {
  Query: {
    currentUser: withAuthentication((_root, _args, { user }) => {
      return user;
    }),
    seasons: withAuthentication(
      async (_root, _args, { dataSources: { footballApi } }) => {
        const res = await footballApi.fetchSeasons();
        const { data } = await res.json();
        return data
      }
    ),
    games: withAuthentication(
      async (_root, { date }, { dataSources: { footballApi } }) => {
        const res = await footballApi.fetchGames(date);
        const data = await res.json();
        console.log(data)
        return data
      }
    ),
  },
  Mutation: {
    login: async (_root, args, { dataSources: { authApi } }) => {
      const res = await authApi.attemptLogin(args);
      return await res.json();
    },
  },
  Subscription: {
    updatedGame: {
      subscribe: () => pubsub.asyncIterator('UPDATED_GAME') as unknown as AsyncIterable<any>,
      resolve: payload => payload
    },
  },
};

export default resolvers;
