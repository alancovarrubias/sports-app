import { ApolloServer } from "@apollo/server";
import { readFileSync } from "fs";
import type { ListenOptions } from "net";
import { startStandaloneServer } from "@apollo/server/standalone";
import { GraphQLError } from "graphql";
import fetch from "node-fetch";
import { AUTH_SERVER, VERIFY_PATH } from "./const";
import resolvers from "./resolvers";
import { User } from "./__generated__/resolvers-types";

const typeDefs = readFileSync("./schema.graphql", { encoding: "utf-8" });

interface MyContext {
  user: User;
}

const verifyToken = async (token) => {
  return await fetch(AUTH_SERVER + VERIFY_PATH, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getUser = async (token) => {
  const res = await verifyToken(token);
  if (res.status != 200) {
    return null;
  }
  return await res.json();
};

export default async (listenOptions: ListenOptions = { port: 4000 }) => {
  const server = new ApolloServer<MyContext>({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    context: async ({ req }) => {
      const user = await getUser(req.headers.authorization || "");
      return { user };
    },
    listen: listenOptions,
  });

  return { server, url };
};
