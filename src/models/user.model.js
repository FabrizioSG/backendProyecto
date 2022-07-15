const mongoose = require("mongoose");

// schema de gato
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  first_last_name: { type: String, required: true },
  second_last_name: { type: String},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  birthday: { type: Date, required: true },
  gender: { type: String, required: true },

});

module.exports = mongoose.model("User", userSchema);
