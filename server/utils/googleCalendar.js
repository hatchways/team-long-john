const { google } = require("googleapis");
const { OAuth2 } = google.auth;

module.exports.getTokenWithRefresh = async (
  clientId,
  clientSecret,
  refreshToken
) => {
  const oAuth2Client = new OAuth2(clientId, clientSecret);
  oAuth2Client.setCredentials({ refresh_token: refreshToken });

  const token = await oAuth2Client.getRequestHeaders();

  return token.Authorization.replace("Bearer ", "");
};

// Returns a user's calendar
module.exports.retrieveCalendar = (clientId, clientSecret, accessToken) => {
  const oAuth2Client = new OAuth2(clientId, clientSecret);

  oAuth2Client.setCredentials({ access_token: accessToken });

  const calendar = google.calendar({ version: "v3", auth: oAuth2Client });

  return calendar;
};

// Checks a user's availability on a given day and time range
module.exports.getAvailability = async (calendar, timeMin, timeMax, zone) => {
  const res = await calendar.freebusy.query({
    resource: {
      timeMin: timeMin,
      timeMax: timeMax,
      timeZone: zone,
      items: [{ id: "primary" }], // Focusing on a user's primary calendar
    },
  });

  if (res.status !== 200) {
    throw new Error("Unable to get availability");
  }

  // Returning the times a user is not available
  return res.data.calendars.primary.busy;
};

// Make a new google event for host user using given ISO strings.
module.exports.createEvent = async (calendar, event) => {
  const res = await calendar.freebusy.query({
    resource: {
      timeMin: event.start.dateTime,
      timeMax: event.end.dateTime,
      timeZone: event.start.timeZone,
      items: [{ id: "primary" }], // Focusing on a user's primary calendar
    },
  });

  if (res.status !== 200) {
    throw new Error("Unable to get availability");
  }

  const events = res.data.calendars.primary.busy;
  if (events.length === 0) {
    return calendar.events.insert({
      calendarId: "primary",
      resource: event,
    });
  } else {
    console.log("This time slot is already occupied in host user's calendar");
  }
};

// Make a new google event for host user using given ISO strings.
module.exports.deleteEvent = async (calendar, parameters) => {
  calendar.events.delete(parameters, function (err) {
    if (err) {
      console.log("Failed to delete an event: " + err);
      return false;
    }
  });
  return true;
};
