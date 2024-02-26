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
    likes: [LikedUser]
    listen_count: Int
  }

  type User {
    id: String!
    username: String!
    token: String!
  }

  type LikedUser {
    id: String!
    username: String!
  }

  type ArtistDetaile {
    information: Artist
    tracks: [Track]
  }

  type AlbumDetaile {
    information: Album
    tracks: [Track]
  }

  type Playlist {
    id: String!
    name: String!
    slug: String!
    userId: LikedUser
    tracks: [Track]
  }

  type Comment {
    id: String!
    text: String!
    userId: LikedUser
  }

  type Query {
    getTracks(limit: Int, category: String): [Track]
    getArtists(limit: Int): [Artist]
    getAlbums(limit: Int): [Album]
    getPlaylists(limit: Int): [Playlist]
    getComments(trackId: String!): [Comment]

    getOneArtist(slug: String): ArtistDetaile
    getOneAlbum(slug: String): AlbumDetaile
    getOneTrack(slug: String): Track
    getOnePlaylist(slug: String): Playlist
  }

  type Mutation {
    signUp(username: String!, password: String!): User
    signIn(username: String!, password: String!): User

    createPlaylist(name: String!): String!
    addToPlaylist(trackId: String!, playlistId: String!): String!
    removeFromPlaylist(trackId: String!, playlistId: String!): String!

    toLike(trackId: String!): String!
    createComment(trackId: String!, text: String!): String!
    searchTrack(name: String!): [Track]
  }
`;

module.exports = typeDefs;
