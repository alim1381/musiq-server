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

  async getOnePlaylist(root, { slug }) {
    let playlist = await this.#playlistModel
      .findOne({ slug })
      .populate({
        path: "tracks",
        populate: [{ path: "artist" }, { path: "album" }, { path: "likes" }],
      })
      .populate("userId");
    if (!playlist) throw new Error(`No playlist found with the slug ${slug}`);

    return playlist;
  }

  async createPlaylist(root, { name }, { isLogged, userData }) {
    // Check if the user is logged in
    if (!isLogged || !userData) throw new Error("Unauthorized");

    // Create a playlist with given data and return it
    if (!name) throw new Error("name in null");

    // Save to database
    let newPlaylist = await this.#playlistModel.create({
      name: name,
      slug: name.replaceAll(" ", "").toLowerCase(),
      userId: userData._id,
      tracks: [],
    });

    return "Playlist Created Successfully!";
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

    return "Track added successfully to the playlist.";
  }
  async removeFromPlaylist(
    root,
    { trackId, playlistId },
    { isLogged, userData }
  ) {
    //  Checking if the user is logged and has access
    if (!isLogged || !userData) throw new Error("Unauthorized");

    // Getting the data from the database
    const playlist = await this.#playlistModel.findById(playlistId);
    // If the playlist doesn't have any tracks
    if (!playlist || playlist.userId.toString() !== userData._id.toString())
      throw new Error(`The playlist is not definde`);

    // Removing the track from the array
    const itemIndex = playlist.tracks.findIndex(
      (item) => item._id.toString() == trackId.toString()
    );
    if (itemIndex === -1) throw new Error("Track not in list!");

    // Remove the element from the array
    playlist.tracks.splice(itemIndex, 1);
    await playlist.save();

    return `Removed from playlist!`;
  }
}

module.exports = new PlaylistController();
