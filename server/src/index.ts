import createApolloServer from "./createApolloServer";

const { url } = await createApolloServer();
console.log(`🚀  Server ready at: ${url}`);
