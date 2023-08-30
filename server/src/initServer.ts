import { ApolloServer } from "@apollo/server";
import { readFileSync } from "fs";
import resolvers from "@app/resolvers";
import { Context } from "@app/context";

const typeDefs = readFileSync("./schema.graphql", { encoding: "utf-8" });

export default () => {
  return new ApolloServer<Context>({
    typeDefs,
    resolvers,
  });
};
