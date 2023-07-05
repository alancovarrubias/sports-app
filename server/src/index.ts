import runApolloServer from "./runApolloServer";

const { url } = await runApolloServer();
console.log(`🚀  Server ready at: ${url}`);
