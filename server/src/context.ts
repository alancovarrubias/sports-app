import { User } from "@app/__generated__/resolvers-types";
import dataSources, { DataSources } from "./dataSources";

export interface Context {
  user: User;
  dataSources: DataSources;
}

async function getUser(token) {
  const res = await dataSources.authApi.verifyToken(token);
  if (res.status === 200) {
    return await res.json();
  }
}

async function context({ req }) {
  const token = req.headers.authorization || "";
  const user = await getUser(token);
  return {
    user,
    dataSources,
  };
}

export default context;
