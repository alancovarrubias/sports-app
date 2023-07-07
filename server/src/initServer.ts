import { ApolloServer } from "@apollo/server";
import { readFileSync } from "fs";
import AuthAPI from "@app/dataSources/authAPI";
import resolvers from "@app/resolvers";
import { User } from "@app/__generated__/resolvers-types";

const typeDefs = readFileSync("./schema.graphql", { encoding: "utf-8" });

interface MyContext {
  user: User;
  dataSources: {
    authAPI: AuthAPI;
  };
}

export default () => {
  return new ApolloServer<MyContext>({
    typeDefs,
    resolvers,
  });
};
