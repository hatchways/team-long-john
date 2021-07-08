const asyncHandler = require("express-async-handler");

const User = require("../models/User.js");
const Appointment = require("../models/Appointment.js");
const { retrieveCalendar } = require("../utils/GoogleCalendar");

// @route GET /availability?day=...?timeZone=...
// @desc Gets the availability for a day
// @access Private
exports.getAvailability = asyncHandler(async (req, res, next) => {
  console.log("hi");
  const _id = "60e516b5f6562f2e3ea2df12";

  // ISO is a date format that eliminates ambiguity
  const startISO = new Date();
  const day = iso.toLocaleString("default", { weekday: "long" });

  const user = await User.findById(_id);

  // const { username, availableDays } = user;

  const calendar = retrieveCalendar(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    req.user.googleRefreshToken
  );

  calendar.freebusy.query(
    {
      resource: {
        timeMin: startISO,
        timeMax: "7/8/2021",
        timeZone: "America/Denver",
        items: [{ id: "primary" }] // Focusing on a user's primary calendar
      }
    },
    (err, res) => {
      if (err) return console.error("Free Busy Query Error: ", err);

      const eventsArr = res.data.calendars.primary;
      console.log(eventsArr);

      return console.log("Sorry, user is busy that time");
    }
  );

  // if (!(availableDays.indexOf(day) in availableDays)) {
  //   res.status(406);
  //   throw new Error(`${username} is not available on ${day}s`);
  // }

  // Google Calendar API, return list of available slots
  // Get the current time in the user's timezone and return remaining times for this day
  // Get all the users appointments
  // Fetch all appointments and filter them out for this day
});
