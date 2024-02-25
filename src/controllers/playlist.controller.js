const Controller = require("./controller");
const PlaylistModel = require("../models/playlist.model");
const trackModel = require("../models/track.model");

class PlaylistController extends Controller {
  #playlistModel;
  #trackModel;
  constructor() {
    super();
    this.#playlistModel = PlaylistModel;
    this.#trackModel = trackModel;
  }

  async createPlaylist(root, { name }, { isLogged, userData }) {
    // Check if the user is logged in
    if (!isLogged || !userData) throw new Error("Unauthorized");

    // Create a playlist with given data and return it
    if (!name) throw new Error("name in null");

    // Save to database
    let newPlaylist = await this.#playlistModel.create({
      name: name,
      slug: name.toLowerCase().trim(),
      userId: userData._id,
      tracks: [],
    });

    return newPlaylist;
  }

  async addToPlaylist(root, { trackId, playlistId }, { isLogged, userData }) {
    //  Checking if the user is logged and has access
    if (!isLogged || !userData) throw new Error("Unauthorized");

    // Checking inputs
    if (!trackId || !playlistId)
      throw new Error("You need to enter the ID of the track and the playlist");

    // Verifying that both elements exist
    let playlist = await this.#playlistModel.findById(playlistId);
    let track = await this.#trackModel.findById(trackId);

    if (!track) throw new Error(`The track is not definde`);

    if (!playlist || playlist.userId.toString() !== userData._id.toString())
      throw new Error(`The playlist is not definde`);

    if (playlist.tracks.includes(track._id))
      throw new Error("This song already exists");

    // Adding the track to the playlist
    playlist.tracks.push(track._id);
    await playlist.save();

    // Returning the updated playlist
    await playlist.populate({
      path: "tracks",
      populate: [
        {
          path: "album",
        },
        {
          path: "artist",
        },
      ],
    });
    return playlist;
  }
}

module.exports = new PlaylistController();
