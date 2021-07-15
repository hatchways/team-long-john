const asyncHandler = require("express-async-handler");
const moment = require("moment-timezone");

const {
  retrieveCalendar,
  getAvailability,
} = require("../utils/googleCalendar");
const {
  getDayName,
  convertToDate,
  convertToTimeZone,
} = require("../utils/dateTime");

// @route GET /googleAvailability?startISO={startISO}&email={hostEmail}
// - day = ISO string of start of the day.
// - email = Email of the person we're making an appt. with
// @desc Returns the time the user is busy and we'll
// filter out those times on the front end
// @access Public
exports.getAvailability = asyncHandler(async (req, res, next) => {
  let { startISO, email } = req.query;

  const endISO = moment(startISO).add(1, "day").toISOString();

  const user = await User.findOne({ email: email });
  // const { username, availableDays, timezone, availableHours } = user;

  // // If user is not available on this day, then throw error
  // const isAvailable = availableDays.includes(getDayName(startISO, timezone));
  // if (!isAvailable) throw new Error(`${username} is not available on this day`);

  // // Converting the day to the user's time zone and getting the date in that time zone
  // day = convertToTimeZone(day, timezone);
  // day = new Date(day).getDate();

  // // Converting the user's available times to date format
  // let endISO = convertToDate(availableHours.end, day, "h:m");

  // // Attaching the user's time zone to their start and end time
  // startISO = convertToTimeZone(startISO, timezone);
  // endISO = convertToTimeZone(endISO, timezone);

  // Accessing the user's calendar
  const calendar = retrieveCalendar(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    user.googleRefreshToken
  );

  // Returns the times when the user is busy based off of their availability
  const availability = await getAvailability(
    calendar,
    startISO,
    endISO,
    user.timezone
  );

  res.send(availability);
});
