const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Artist {
    id: String
    name: String
    avatar: String
    slug: String
    bio: String
  }

  type Album {
    id: String!
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

  type User {
    id: String!
    username: String!
    token: String!
  }

  type ArtistDetaile {
    information: Artist
    tracks: [Track]
  }

  type AlbumDetaile {
    information: Album
    tracks: [Track]
  }

  type Query {
    getTracks(limit: Int, category: String): [Track]
    getArtists(limit: Int): [Artist]
    getAlbums(limit: Int): [Album]

    getOneArtist(slug: String): ArtistDetaile
    getOneAlbum(slug: String): AlbumDetaile
    getOneTrack(slug: String): Track
  }

  type Mutation {
    signUp(username: String!, password: String!): User
    signIn(username: String!, password: String!): User
  }
`;

module.exports = typeDefs;
