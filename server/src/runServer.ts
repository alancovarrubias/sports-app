import { startStandaloneServer } from "@apollo/server/standalone";
import initServer from "@app/initServer";
import type { ListenOptions } from "net";
import context from "./context";

export default async (listenOptions: ListenOptions = { port: 4000 }) => {
  const server = initServer();
  const { url } = await startStandaloneServer(server, {
    context,
    listen: listenOptions,
  });

  return { server, url };
};
