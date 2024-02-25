const mongoose = require("mongoose");

const playlistSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    userId: { type: mongoose.Types.ObjectId, ref: "user", required: true },
    tracks: [{ type: mongoose.Types.ObjectId, ref: "track" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("playlist", playlistSchema);
