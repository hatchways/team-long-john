const asyncHandler = require("express-async-handler");
const moment = require("moment-timezone");

const {
  getTokenWithRefresh,
  retrieveCalendar,
  getAvailability,
} = require("../utils/googleCalendar");

// @route GET /googleAvailability?startISO={startISO}&email={hostEmail}
// - day = ISO string of start of the day.
// - email = Email of the person we're making an appt. with
// @desc Returns the time the user is busy and we'll
// filter out those times on the front end
// @access Public
exports.getAvailability = asyncHandler(async (req, res, next) => {
  let { startISO, email } = req.query;
  const user = await User.findOne({ email: email });
  if (!user) {
    res.status(404);
    throw new Error(`No account exists with the email: ${email}`);
  }
  const endISO = moment(startISO).add(1, "day").toISOString();

  // Getting a new access token
  const accessToken = await getTokenWithRefresh(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    user.google.refreshToken
  );

  // Accessing the user's calendar
  const calendar = retrieveCalendar(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    accessToken
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
