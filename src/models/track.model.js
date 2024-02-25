const mongoose = require("mongoose");

const trackSchima = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    path : { type: String, required: true },
    artist: { type: mongoose.Schema.Types.ObjectId, ref: "artist", required: true },
    album: { type: mongoose.Schema.Types.ObjectId, ref: "album", required: true },
    likes: [{ type: mongoose.Types.ObjectId, ref: "user" }],
    listen_count: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("track", trackSchima);
