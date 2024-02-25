const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Artist {
    name: String
    avatar: String
    slug: String
    bio: String
  }

  type Album {
    name: String!
    slug: String!
    cover: String!
  }

  type Track {
    id: String
    name: String
    slug: String
    path: String
    artist: Artist
    album: Album
    listen_count: Int
  }

  input NewUserInput {
    name: String
    username: String
    password: String
  }

  type Query {
    getTracks(limit: Int, category: String): [Track]
  }

  type Mutation {
    createNewUser(input: NewUserInput): Track
  }
`;

module.exports = typeDefs;
