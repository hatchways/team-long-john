const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  meetingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "meeting",
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    required: true,
  },
  timezone: {
    type: String,
    required: true,
  },
});

module.exports = Appointment = mongoose.model("appointment", appointmentSchema);
