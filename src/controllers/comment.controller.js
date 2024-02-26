const Controller = require("./controller");
const trackModel = require("../models/track.model");
const commentModel = require("../models/comment.model");

class CommentController extends Controller {
  #trackModel;
  #commentModel;
  constructor() {
    super();
    this.#trackModel = trackModel;
    this.#commentModel = commentModel;
  }

  async toLike(root, { trackId }, { isLogged, userData }) {
    if (!isLogged) throw new Error("Unauthorized");

    // Check if the user has already liked
    let track = await this.#trackModel.findById(trackId);
    if (!track) throw new Error("Track not found");

    if (track.likes.includes(userData._id)) {
      // Remove like from the list of likes
      const itemIndex = track.likes.findIndex(
        (item) => item._id == userData._id
      );
      track.likes.splice(itemIndex, 1);

      await track.save();
      return "Dislike Successfully";
    }

    // Add like to the users likes list and save
    track.likes.push(userData._id);
    await track.save();

    return "Liked Successfully";
  }

  async getComments(root, { trackId }) {
    // Get all comments for a given track id
    let comments = await this.#commentModel
      .find({ trackId })
      .populate("userId");

    return comments;
  }

  async createComment(root, { trackId, text }, { isLogged, userData }) {
    // Validate that a user is logged in before creating
    if (!isLogged) throw new Error("Unauthorized");

    // If no track was found with given ID then send
    try {
      let track = await this.#trackModel.findById(trackId);
      if (!track) throw new Error("Invalid Track ID");
    } catch (error) {
      throw new Error("Invalid Track ID");
    }

    // Create a new comment with the provided data
    await this.#commentModel.create({ trackId, text, userId: userData._id });

    return "Comment Created!";
  }
}

module.exports = new CommentController();
