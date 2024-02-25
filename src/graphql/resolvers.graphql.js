const Track = require("../models/track.model");

const resolvers = {
  Query: {
    getTracks: async (root, { limit, category }) => {
      // category include ('hot-tracks' , 'top-tracks' , 'new-tracks')
      let Tracks = await Track.find({})
        .populate("artist")
        .populate("album")
        .limit(limit)
        .sort(
          category === "hot-tracks"
            ? { name: 1 }
            : category === "top-tracks"
            ? { listen_count: -1 }
            : category === "new-tracks"
            ? { createdAt: -1 }
            : null
        );

      if (Tracks) return Tracks;
    },
  },

  // Mutation: {
  //   createNewUser: async (root, { input }) => {
  //     let newUser = new Users({
  //       name: input.name,
  //       username: input.username,
  //       password: input.password,
  //     });

  //     return newUser.save().then((result) => {
  //       return {
  //         id: result._id,
  //         name: input.name,
  //         username: input.username,
  //       };
  //     });
  //   },
  // },
};

module.exports = resolvers;
