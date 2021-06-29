const mongoose = require("mongoose");

const meetingSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
    unique: true
  },
  duration: {
    type: Number,
    required: true,
    enum: [15, 30, 45]
  }
});

module.exports = Meeting = mongoose.model("meeting", meetingSchema);
