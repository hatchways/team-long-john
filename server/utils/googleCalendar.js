const { google } = require("googleapis");
const { OAuth2 } = google.auth;

// Returns a user's calendar
module.exports.retrieveCalendar = (clientId, clientSecret, refreshToken) => {
  const oAuth2Client = new OAuth2(clientId, clientSecret);

  oAuth2Client.setCredentials({ refresh_token: refreshToken });

  const calendar = google.calendar({ version: "v3", auth: oAuth2Client });

  return calendar;
};
