import { GraphQLError } from "graphql";
import { Resolvers } from "@app/__generated__/resolvers-types";
import { GAME } from "@test-utils/mocks";

const withAuthentication = (resolverFunction) => {
  return (root, args, context) => {
    if (!context.user) {
      throw new GraphQLError('User is not authenticated', {
        extensions: {
          code: 'UNAUTHENTICATED',
          http: { status: 401 },
        },
      });
    }
    return resolverFunction(root, args, context);
  };
};

const resolvers: Resolvers = {
  Query: {
    currentUser: withAuthentication((_root, _args, { user }) => {
      return user;
    }),
    games: withAuthentication(() => {
      return [GAME]
    })
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
