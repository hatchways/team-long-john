const asyncHandler = require("express-async-handler");
const moment = require("moment-timezone");

const {
  getTokenWithRefresh,
  retrieveCalendar,
  createEvent,
} = require("../utils/googleCalendar");

// @route POST /googleCreate
// @desc Creates a google event to the host user's google calendar.
// @access Public
exports.createGoogleEvent = asyncHandler(async (req, res, next) => {
  const {
    email,
    summary,
    location,
    description,
    startISO,
    duration,
    timeZone,
    colorId,
  } = req.body;

  const user = await User.findOne({ email: email });
  if (!user) {
    res.status(404);
    throw new Error(`No account exists with the email: ${email}`);
  }
  const endISO = moment(startISO).add(duration, "m").toISOString();

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

  // Create google calendar event object.
  const event = {
    summary: summary,
    location: location,
    description: description,
    start: {
      dateTime: startISO,
      timeZone: timeZone,
    },
    end: {
      dateTime: endISO,
      timeZone: timeZone,
    },
    colorId: colorId,
  };

  // Returns the times when the user is busy based off of their availability
  await createEvent(calendar, event);

  res.status(201).json({
    success: {
      message:
        "Event successfully created in google calendar of the host user.",
    },
  });
});
