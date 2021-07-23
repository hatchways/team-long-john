const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  meetingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "meeting",
  },
  hostGoogleEid: {
    type: String,
    required: true,
  },
  hostUserName: {
    type: String,
    required: true,
  },
  hostName: {
    type: String,
    required: true,
  },
  hostEmail: {
    type: String,
    required: true,
  },
  appointeeGoogleEid: {
    type: String,
  },
  appointeeName: {
    type: String,
    required: true,
  },
  appointeeEmail: {
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
