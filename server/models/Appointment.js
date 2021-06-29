const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  meeting_id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  time: {
    type: Date,
    required: true
  },
  timezone: {
    type: Date,
    required: true
  }
})

module.exports = Appointment = mongoose.model("appointment", appointmentSchema);
