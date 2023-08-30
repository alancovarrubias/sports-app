import { ApolloServer } from "@apollo/server";
import { readFileSync } from "fs";
import resolvers from "@app/resolvers";
import { User } from "@app/__generated__/resolvers-types";
import { DataSources } from "./dataSources";

const typeDefs = readFileSync("./schema.graphql", { encoding: "utf-8" });

interface MyContext {
  user: User;
  dataSources: DataSources;
}

export default () => {
  return new ApolloServer<MyContext>({
    typeDefs,
    resolvers,
  });
};
