import { ApolloServer } from "@apollo/server";
import { readFileSync } from "fs";
import type { ListenOptions } from "net";
import { startStandaloneServer } from "@apollo/server/standalone";
import resolvers from "./resolvers";
import { USER, UserInterface } from "./const";
import { GraphQLError } from "graphql";

const typeDefs = readFileSync("./schema.graphql", { encoding: "utf-8" });

interface MyContext {
  user: UserInterface;
}

export default async (listenOptions: ListenOptions = { port: 4000 }) => {
  const server = new ApolloServer<MyContext>({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    context: async ({ req }) => {
      const token = req.headers.authorization || "";
      if (!token) {
        throw new GraphQLError("User is not authenticated", {
          extensions: {
            code: "UNAUTHENTICATED",
            http: { status: 401 },
          },
        });
      }
      return {
        user: USER,
      };
    },
    listen: listenOptions,
  });

  return { server, url };
};
