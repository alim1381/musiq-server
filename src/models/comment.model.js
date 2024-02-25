const mongoose = require('mongoose')

const commentSchima = new mongoose.Schema(
  {
    text: { type: String, required: true },
    trackId: { type: mongoose.Types.ObjectId, ref: "track", required: true },
    userId: { type: mongoose.Types.ObjectId, ref: "user", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("comment", commentSchima);
