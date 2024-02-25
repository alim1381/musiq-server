const authController = require("../controllers/auth.controller");
const publicController = require("../controllers/public.controller");

const resolvers = {
  Query: {
    getTracks: publicController.getTracks,
    getArtists: publicController.getArtists,
    getAlbums: publicController.getAlbums,

    getOneArtist: publicController.getOneArtist,
    getOneAlbum: publicController.getOneAlbum,
    getOneTrack: publicController.getOneTrack,
  },

  Mutation: {
    signUp: authController.signUp,
    signIn: authController.signIn,
  },
};

module.exports = resolvers;
