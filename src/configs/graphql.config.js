const { ApolloServer } = require("apollo-server-express");
const resolvers = require("../graphql/resolvers.graphql");
const typeDefs = require("../graphql/schema.graphql");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const token = req.headers.authorization;
    if (!token) return { isLogged: false, userData: null };

    try {
      const [bearer, accessToken] = token.split(" ");
      const data = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);

      if (typeof data == "object" && "id" in data) {
        let user = await UserModel.findById(data.id, {
          password: 0,
          createdAt: 0,
          updatedAt: 0,
          __v: 0,
        }).lean();
        if (!user) return { isLogged: false, userData: null };

        // user valid
        return { isLogged: true, userData: user };
      }

      return { isLogged: false, userData: null };
    } catch (error) {
      return { isLogged: false, userData: null };
    }
  },
});

async function config(app) {
  await server.start();
  server.applyMiddleware({ app, path: "/master" });
  console.log(server.graphqlPath);
}

module.exports = { config };
