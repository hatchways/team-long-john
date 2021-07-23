const asyncHandler = require("express-async-handler");
const moment = require("moment-timezone");

const {
  getTokenWithRefresh,
  retrieveCalendar,
  deleteEvent,
} = require("../utils/googleCalendar");

// @route DELETE /googleDelete
// @desc Deletes a google event to the host user's google calendar.
// @access Public
exports.deleteGoogleEvent = asyncHandler(async (req, res, next) => {
  const { email, eventId } = req.body;

  const user = await User.findOne({ email: email });
  if (!user) {
    res.status(404);
    throw new Error(`No account exists with the email: ${email}`);
  }

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
  const parameters = {
    calendarId: "primary",
    eventId: eventId,
  };

  // Returns the times when the user is busy based off of their availability
  const result = await deleteEvent(calendar, parameters);
  if (!result) {
    res.status(409);
    throw new Error(
      "Event could not be deleted from host user's Google Calendar"
    );
  }

  res.status(200).json({
    success: {
      message: "Event deleted from host user's google calendar.",
    },
  });
});
