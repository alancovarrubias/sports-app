import { startStandaloneServer } from "@apollo/server/standalone";
import initServer from "@app/initServer";
import dataSources from "@app/dataSources";
import type { ListenOptions } from "net";

async function getUser(token) {
  const res = await dataSources.authApi.verifyToken(token);
  if (res.status === 200) {
    const body = await res.json();
    return body;
  }
}
export default async (listenOptions: ListenOptions = { port: 4000 }) => {
  const server = initServer();
  const { url } = await startStandaloneServer(server, {
    context: async ({ req }) => {
      const token = req.headers.authorization || "";
      const user = await getUser(token);
      return {
        user,
        dataSources,
      };
    },
    listen: listenOptions,
  });

  return { server, url };
};
