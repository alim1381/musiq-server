const { ApolloServer } = require("apollo-server-express");
const resolvers = require("../graphql/resolvers.graphql");
const typeDefs = require("../graphql/schema.graphql");
const server = new ApolloServer({ typeDefs, resolvers });

async function config(app) {
  await server.start();
  server.applyMiddleware({ app, path: "/master" });
  console.log(server.graphqlPath);
}

module.exports = { config };
