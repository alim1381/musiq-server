const mongoose = require('mongoose')

const albumSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    cover: { type: String, required: true, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("album", albumSchema);
