import runServer from "./runServer";

const { url } = await runServer();
console.log(`🚀  Server ready at: ${url}`);
