import runServer from "@app/runServer";

const { url } = await runServer();
console.log(`🚀  Server ready at: ${url}`);
