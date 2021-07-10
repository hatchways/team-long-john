const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String
  },
  name: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  googleId: {
    type: String
  },
  register_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model("user", userSchema);
