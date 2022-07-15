const mongoose = require("mongoose");

// schema de gato
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  cats: { type: mongoose.Types.ObjectId, required: true, ref: "Cat" },
});

module.exports = mongoose.model("User", userSchema);
