import { Resolvers } from "./__generated__/resolvers-types";

const resolvers: Resolvers = {
  Query: {
    currentUser: (_root, _args, { user }) => user,
  },
};

export default resolvers;
