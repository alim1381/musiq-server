const albumModel = require("../models/album.model");
const artistModel = require("../models/artist.model");
const playlistModel = require("../models/playlist.model");
const trackModel = require("../models/track.model");
const Controller = require("./controller");

class PublicController extends Controller {
  #trackModel;
  #artistModel;
  #albumModel;
  #playlistModel;
  constructor() {
    super();
    this.#albumModel = albumModel;
    this.#artistModel = artistModel;
    this.#trackModel = trackModel;
    this.#playlistModel = playlistModel;
  }
  async getTracks(root, { limit, category }) {
    // category include ('hot-tracks' , 'top-tracks' , 'new-tracks')
    let Tracks = await this.#trackModel
      .find({})
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
  }

  async getArtists(root, { limit }) {
    let Artists = await this.#artistModel.find({}).limit(limit);
    if (Artists) return Artists;
  }

  async getAlbums(root, { limit }) {
    let Albums = await this.#albumModel.find({}).limit(limit);
    if (Albums) return Albums;
  }

  async getPlaylists(root, { limit }) {
    let playlists = await this.#playlistModel
      .find({})
      .populate({
        path: "tracks",
        populate: [
          {
            path: "album",
          },
          {
            path: "artist",
          },
        ],
      })
      .limit(limit);
    if (playlists) return playlists;
  }

  // one versions
  async getOneArtist(root, { slug }) {
    const artist = await this.#artistModel.findOne({ slug: slug });
    if (!artist) throw new Error("artist not found");

    const tracks = await this.#trackModel
      .find({ artist: artist._id })
      .populate("artist")
      .populate("album");
    return { information: artist, tracks };
  }

  async getOneAlbum(root, { slug }) {
    const album = await this.#albumModel.findOne({ slug: slug });
    if (!album) throw new Error("album not found");

    const tracks = await this.#trackModel
      .find({ album: album._id })
      .populate("artist")
      .populate("album");
    return { information: album, tracks };
  }

  async getOneTrack(root, { slug }) {
    const track = await this.#trackModel
      .findOne({ slug: slug })
      .populate("artist")
      .populate("album");
    if (!track) throw new Error("track not found");

    return track;
  }

  async getOnePlaylist(root, { slug }) {
    const playlist = await this.#playlistModel
      .findOne({ slug: slug })
      .populate({
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
    if (!playlist) throw new Error("playlist not found");

    return playlist;
  }
}

module.exports = new PublicController();
