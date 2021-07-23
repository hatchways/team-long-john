const mongoose = require("mongoose");

const meetingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "user",
    required: true,
  },
  name: {
    type: String,
    required: String,
  },
  duration: {
    type: Number,
    required: true,
    enum: [15, 30, 45, 60],
  },
});

module.exports = Meeting = mongoose.model("meeting", meetingSchema);
