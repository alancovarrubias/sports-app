import fetch from "node-fetch";
import { AUTH_SERVER, LOGIN_PATH } from "./const";
import { GraphQLError } from "graphql";
import { Resolvers } from "./__generated__/resolvers-types";

const attemptLogin = async (args) => {
  return await fetch(AUTH_SERVER + LOGIN_PATH, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(args),
  });
};

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
  },
  Mutation: {
    login: async (_root, args, _context) => {
      const res = await attemptLogin(args);
      if (res.status != 200) {
        return null;
      }
      return await res.json();
    },
  },
};

export default resolvers;
