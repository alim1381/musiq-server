const authController = require("../controllers/auth.controller");
const playlistController = require("../controllers/playlist.controller");
const publicController = require("../controllers/public.controller");

const resolvers = {
  Query: {
    getTracks: publicController.getTracks,
    getArtists: publicController.getArtists,
    getAlbums: publicController.getAlbums,
    getPlaylists: publicController.getPlaylists,

    getOneArtist: publicController.getOneArtist,
    getOneAlbum: publicController.getOneAlbum,
    getOneTrack: publicController.getOneTrack,
  },

  Mutation: {
    signUp: authController.signUp,
    signIn: authController.signIn,

    createPlaylist: playlistController.createPlaylist,
    addToPlaylist: playlistController.addToPlaylist,
  },
};

module.exports = resolvers;
