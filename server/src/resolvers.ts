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
const mapAttributes = (attributes) => attributes?.data?.attributes || {}
const mapGameAttributes = (attributes) => ({
  ...attributes,
  away_full_game_stat: mapAttributes(attributes.away_full_game_stat),
  home_full_game_stat: mapAttributes(attributes.home_full_game_stat),
  away_first_half_stat: mapAttributes(attributes.away_first_half_stat),
  home_first_half_stat: mapAttributes(attributes.home_first_half_stat)
});
const resolvers: Resolvers = {
  Query: {
    currentUser: withAuthentication((_root, _args, { user }) => {
      return user;
    }),
    seasons: withAuthentication(
      async (_root, _args, { dataSources: { footballApi } }) => {
        const res = await footballApi.fetchSeasons();
        const { data } = await res.json();
        return data.map((season) => season.attributes);
      }
    ),
    games: withAuthentication(
      async (_root, { date }, { dataSources: { footballApi } }) => {
        const res = await footballApi.fetchGames(date);
        const { data } = await res.json();
        return data.map(({ attributes }) => mapGameAttributes(attributes));
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
    gameUpdated: {
      subscribe: () => pubsub.asyncIterator('GAME_UPDATED') as unknown as AsyncIterable<any>,
      resolve: payload => payload
    },
  },
};

export default resolvers;
