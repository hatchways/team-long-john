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
      items: [{ id: "primary" }] // Focusing on a user's primary calendar
    }
  });

  if (res.status !== 200) {
    throw new Error("Unable to get availability");
  }

  // Returning the times a user is not available
  return res.data.calendars.primary.busy;
};
