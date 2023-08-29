import { startStandaloneServer } from "@apollo/server/standalone";
import initServer from "@app/initServer";
import AuthAPI from "@app/dataSources/authAPI";
import type { ListenOptions } from "net";
import NbaApi from "./dataSources/nbaApi";

export default async (listenOptions: ListenOptions = { port: 4000 }) => {
  const server = initServer();
  const { url } = await startStandaloneServer(server, {
    context: async ({ req }) => {
      const authAPI = new AuthAPI();
      const nbaApi = new NbaApi();
      const token = req.headers.authorization || ""
      const res = await authAPI.verifyToken(token);
      const body = await res.json()
      return {
        user: res.status === 200 ? body : null,
        dataSources: { authAPI, nbaApi },
      };
    },
    listen: listenOptions,
  });

  return { server, url };
};
