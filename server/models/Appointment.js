const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  meetingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "meeting",
  },
  googleEventId: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  timezone: {
    type: String,
    required: true,
  },
});

module.exports = Appointment = mongoose.model("appointment", appointmentSchema);
