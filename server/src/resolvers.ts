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
    seasons: withAuthentication(
      async (_root, _args, { dataSources: { footballApi } }) => {
        const res = await footballApi.fetchSeasons();
        const body = await res.json();
        return body.data.map((season) => season.attributes);
      }
    ),
    games: withAuthentication(
      async (_root, args, { dataSources: { footballApi } }) => {
        const res = await footballApi.fetchGames(args.seasonId);
        const body = await res.json();
        const data = body.data.map((game) => game.attributes);
        return data;
      }
    ),
  },
  Mutation: {
    login: async (_root, args, { dataSources: { authApi } }) => {
      const res = await authApi.attemptLogin(args);
      const body = await res.json();
      return body;
    },
  },
};

export default resolvers;
