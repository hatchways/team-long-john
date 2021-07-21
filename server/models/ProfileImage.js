const mongoose = require("mongoose");

const profileImageSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  url: {
    type: String,
  },
  secureUrl: {
    type: String,
  },
});

module.exports = ProfileImage = mongoose.model(
  "profileImage",
  profileImageSchema
);
