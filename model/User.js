const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 3,
  },
  password: {
    type: String,
    required: true,
    max: 1024,
    min: 6,
  },
  mail: {
    type: String,
    required: true,
    max: 255,
    min: 6,
  },
  role: {
    type: String,
    default: "User",
  },
});

module.exports = mongoose.model("user", userSchema);
