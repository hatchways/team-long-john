const Appointment = require('../models/Appointment');
const asyncHandler = require("express-async-handler");

// @route GET /appointment
// @desc Fetches all appointments associated with user
// @access Public
exports.fetchAppointments = asyncHandler(async (req, res, next) => {
  const { email } = req.query;

  // Finds all appointments associated with the email
  const appointments = await Appointment.find({ email });
  console.log(appointments);

  res.status(200).send(appointments);
})

// @route POST /appointment
// @desc Creates an appointment
// @access Public
exports.createAppointment = asyncHandler(async (req, res, next) => {
  // Creates an appointment
  await Appointment.create(req.body);

  res.status(201).send();
})