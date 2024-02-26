const authController = require("../controllers/auth.controller");
const commentController = require("../controllers/comment.controller");
const playlistController = require("../controllers/playlist.controller");
const publicController = require("../controllers/public.controller");

const resolvers = {
  Query: {
    getTracks: publicController.getTracks,
    getArtists: publicController.getArtists,
    getAlbums: publicController.getAlbums,
    getPlaylists: publicController.getPlaylists,
    getComments: commentController.getComments,
    getOneArtist: publicController.getOneArtist,
    getOneAlbum: publicController.getOneAlbum,
    getOneTrack: publicController.getOneTrack,
    getOnePlaylist: playlistController.getOnePlaylist,
    whoIAm: authController.whoIAm,
  },

  Mutation: {
    signUp: authController.signUp,
    signIn: authController.signIn,
    createPlaylist: playlistController.createPlaylist,
    addToPlaylist: playlistController.addToPlaylist,
    removeFromPlaylist: playlistController.removeFromPlaylist,
    toLike: commentController.toLike,
    createComment: commentController.createComment,
    searchTrack: publicController.searchTrack,
  },
};

module.exports = resolvers;
