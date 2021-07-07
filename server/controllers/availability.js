const asyncHandler = require("express-async-handler");
const User = require("../models/User.js");
const Appointment = require("../models/Appointment.js");

// @route GET /availability?day=?????
// @desc Gets the availability for a day
// @access Private
exports.getAvailability = asyncHandler(async (req, res, next) => {
  const _id = "60e516b5f6562f2e3ea2df12";

  // ISO is a date format that eliminates ambiguity
  const iso = new Date("2021-11-07T05:35:58.397Z");
  const day = iso.toLocaleString("default", { weekday: "long" });

  // Check if the user is available on this day
  const user = await User.findById(_id);
  const { username, availableDays } = user;

  // Check if the user is available on this day
  if (!(availableDays.indexOf(day) in availableDays)) {
    res.status(406);
    throw new Error(`${username} is not available on ${day}s`);
  }

  // Get all the users appointments
  // Fetch all appointments and filter them out for this day
});
