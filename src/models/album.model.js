const mongoose = require("mongoose");

// schema de album
const albumSchema = new mongoose.Schema({
  //user: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  user: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true}},

  {timestamps:true} 
);

module.exports = mongoose.model("Album", albumSchema);
