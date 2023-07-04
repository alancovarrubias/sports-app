import { ApolloServer } from "@apollo/server";
import { readFileSync } from "fs";
import type { ListenOptions } from "net";
import { startStandaloneServer } from "@apollo/server/standalone";
import { GraphQLError } from "graphql";
import fetch from "node-fetch";
import resolvers from "./resolvers";
import { User } from "./__generated__/resolvers-types";

const typeDefs = readFileSync("./schema.graphql", { encoding: "utf-8" });

interface MyContext {
  user: User;
}

const getUser = async (token) => {
  const res = await fetch("http://auth:3000/auth/verify", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (res.status == 401) {
    throw new GraphQLError("User is not authenticated", {
      extensions: {
        code: "UNAUTHENTICATED",
        http: { status: res.status },
      },
    });
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
      return {
        user: await getUser(req.headers.authorization || ""),
      };
    },
    listen: listenOptions,
  });

  return { server, url };
};
