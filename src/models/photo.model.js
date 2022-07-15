const mongoose = require("mongoose");

// schema de photo
const photoSchema = new mongoose.Schema({
  album: { type: mongoose.Types.ObjectId, required: true, ref: "Album" },
  name: { type: String, required: true },
  description: { type: String, required: true},
  URL: { type: String, required: true },},

  { timestamps: true }
);

module.exports = mongoose.model("Photo", photoSchema);
