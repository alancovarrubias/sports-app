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

const resolveData = ({ data }) => {
  if (!data) {
    return null;
  }
  return data.attributes;
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
        const res = await footballApi.fetchGames(args.date);
        const body = await res.json();
        console.log(body.data[0].attributes);
        const data = body.data.map(({ attributes }) => {
          return {
            ...attributes,
            away_full_game_stat: resolveData(attributes.away_full_game_stat),
            home_full_game_stat: resolveData(attributes.home_full_game_stat),
          };
        });
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
