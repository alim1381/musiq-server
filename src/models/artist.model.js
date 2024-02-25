const mongoose = require('mongoose')

const artistSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    avatar: { type: String, required: true, default: null },
    slug: { type: String, required: true, unique: true, index: true },
    bio: { type: String, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("artist", artistSchema);
