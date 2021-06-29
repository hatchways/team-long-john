const Appointment = require('../models/Appointment');
const asyncHandler = require("express-async-handler");

// @route GET /appointment
// @desc Fetches all appointments associated with user
// @access Public
exports.fetchAppointments = asyncHandler(async (req, res, next) => {
  const { email } = req.query;

  // Finds all appointments associated with the email
  const appointments = await Appointment.find({ email });

  // If we do not find any appointments then send 404
  if (appointments.length === 0) {
    res.status(404)
    throw new Error("You do not have any appointments");
  }

  res.status(200).send(appointments);
})

// @route POST /appointment
// @desc Creates an appointment
// @access Public
exports.createAppointment = asyncHandler(async (req, res, next) => {    
  // Checking for empty input
  for (let key in req.body) {
    if (req.body[key].trim() === "") {
      res.status(406);
      throw new Error("Invalid input, please do not send empty input(s)")
    }
  }

  // Creates an appointment
  const appointment = await Appointment.create(req.body);

  res.status(201).send(appointment);
})