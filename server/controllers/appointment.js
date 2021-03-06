const Appointment = require("../models/Appointment");
const asyncHandler = require("express-async-handler");
const { convertToTimeZone } = require("../utils/dateTime");
const moment = require("moment");
const {
  appointCreateEmail,
  appointDeleteEmail,
} = require("../utils/emailSender");

// @route GET /appointment?username=USERNAME&type=all
// @desc Fetches all appointments associated with user based on type
// @access Public
exports.fetchAppointments = asyncHandler(async (req, res, next) => {
  const { username, type } = req.query;

  // Finds all appointments associated with the email
  const appointments = await Appointment.find({ hostUserName: username });

  // If we do not find any appointments then send 404
  if (appointments.length === 0) {
    res.status(404);
    throw new Error("You do not have any appointments");
  }

  if (type === "past") {
    const pastAppointments = [];
    let currentTime = new Date().getTime();

    for (let key in appointments) {
      const appointmentTime = appointments[key].time;

      // Converting our time to the appointment's timezone
      currentTime = convertToTimeZone(currentTime, appointments[key].timezone);

      // If the appointment time is before current time, then push into pastAppointments
      if (moment(appointmentTime).isBefore(currentTime)) {
        pastAppointments.push(appointments[key]);
      }
    }

    res.status(200).json({ success: { appointments: pastAppointments } });
  } else {
    res.status(200).json({ success: { appointments: appointments } });
  }
});

// @route POST /appointment
// @desc Creates an appointment
// @access Public
exports.createAppointment = asyncHandler(async (req, res, next) => {
  // Checking for empty input
  for (let key in req.body) {
    const value = req.body[key];
    if (typeof value === "string" && value.trim() === "") {
      res.status(406);
      throw new Error("Invalid input, please do not send empty input(s)");
    }
  }

  // Creates an appointment
  const appointment = await Appointment.create(req.body);
  if (!appointment) {
    res.status(406);
    throw new Error(
      "Invalid input. Please check if you have the correct input(s)"
    );
  }

  // Send Emails
  appointCreateEmail(appointment);
  res.status(201).json({ success: { appointment: appointment } });
});

// @route GET /appointment/:id
// @desc Fetches an appointment by id.
// @access Public
exports.fetchAppointmentById = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const appointment = await Appointment.findById(id);

  if (!appointment) {
    res.status(404);
    throw new Error("No appointment found with given id");
  }

  res.status(200).json({ success: { appointment: appointment } });
});

// @route DELETE /appointment/:id
// @desc Deletes an appointment by id.
// @access Public
exports.deleteAppointmentById = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const deleted = await Appointment.findByIdAndDelete(id);

  if (!deleted) {
    res.status(404);
    throw new Error("No appointment found with given id");
  }

  // Send Emails
  appointDeleteEmail(deleted);
  res.status(200).json({ success: { message: "Appointment deleted" } });
});

// @route PATCH /appointment/:id
// @desc Edits (patches) an appointment by id.
// @access Public
exports.editAppointmentById = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const updates = req.body;
  const options = { new: true };

  const editted = await Appointment.findByIdAndUpdate(id, updates, options);

  if (!editted) {
    res.status(400);
    throw new Error("Appointment with the given id could not be updated.");
  }

  res.status(200).json({ success: { appointments: editted } });
});
