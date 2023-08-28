import { GraphQLError } from "graphql";
import { Resolvers } from "@app/__generated__/resolvers-types";
import { GAME } from "@test-utils/mocks";

const resolvers: Resolvers = {
  Query: {
    currentUser: (_root, _args, { user }) => {
      if (!user) {
        throw new GraphQLError("User is not authenticated", {
          extensions: {
            code: "UNAUTHENTICATED",
            http: { status: 401 },
          },
        });
      }
      return user;
    },
    games: (_root, _args, { user }) => {
      if (!user) {
        throw new GraphQLError("User is not authenticated", {
          extensions: {
            code: "UNAUTHENTICATED",
            http: { status: 401 },
          },
        });
      }
      return [GAME]
    }
  },
  Mutation: {
    login: async (_root, args, { dataSources: { authAPI } }) => {
      const res = await authAPI.attemptLogin(args);
      if (res.status === 200) {
        const body = await res.json()
        return body;
      }
    },
  },
};

export default resolvers;
