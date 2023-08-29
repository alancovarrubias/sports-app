import { GraphQLError } from "graphql";
import { Resolvers } from "@app/__generated__/resolvers-types";

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
    games: withAuthentication(
      async (_root, args, { dataSources: { nbaApi } }) => {
        const res = await nbaApi.fetchGames(args.seasonId);
        const body = await res.json();
        return body.data.map((game) => game.attributes);
      }
    ),
  },
  Mutation: {
    login: async (_root, args, { dataSources: { authAPI } }) => {
      const res = await authAPI.attemptLogin(args);
      const body = await res.json();
      return body;
    },
  },
};

export default resolvers;
