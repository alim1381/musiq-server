const mongoose = require("mongoose");
const env = process.env;

// models
const artist = require('../models/artist.model')
const album = require('../models/album.model')
const comment = require('../models/comment.model')
const playlist = require('../models/playlist.model')
const track = require('../models/track.model')
const user = require('../models/user.model')


async function dbConnection() {
  try {
    await mongoose.connect(env.DB_URL);
    console.log("db is connect");
  } catch (error) {
    console.log(`db err : ${error}`);
  }
}

function schemasRegister() {
  return true;
}

module.exports = { dbConnection };
