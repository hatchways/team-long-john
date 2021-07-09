const asyncHandler = require("express-async-handler");
const {
  retrieveCalendar,
  getAvailability
} = require("../utils/googleCalendar");

// @route GET /availability?day=iso?timeZone=america?email=
// - day = the current time the user sends in
// - timeZone = the time zone the user wants to receive available appointments in
// - email = the email of the person we're making an appt. with
// - length = appointment length [30, 45, ...]
// @desc Gets the availability of a user on a given day
// @access Public
exports.getAvailability = asyncHandler(async (req, res, next) => {
  const email = "acgarzeah@gmail.com",
    timeZone = "America/Vancover",
    length = 30;
  const startISO = new Date();

  const user = await User.findOne({ email: email });

  const calendar = retrieveCalendar(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    req.user.googleRefreshToken
  );

  const test = getAvailability(calendar, startISO);
  console.log(user);
});
