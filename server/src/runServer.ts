import { startStandaloneServer } from "@apollo/server/standalone";
import initServer from "@app/initServer";
import AuthAPI from "@app/dataSources/authAPI";
import type { ListenOptions } from "net";

export default async (listenOptions: ListenOptions = { port: 4000 }) => {
  const server = initServer();
  const { url } = await startStandaloneServer(server, {
    context: async ({ req }) => {
      const authAPI = new AuthAPI();
      const res = await authAPI.verifyToken(req.headers.authorization || "");
      return {
        user: res.status === 200 ? await res.json() : null,
        dataSources: { authAPI },
      };
    },
    listen: listenOptions,
  });

  return { server, url };
};
