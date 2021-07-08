const { google } = require("googleapis");
const { OAuth2 } = google.auth;

// Returns a user's calendar
module.exports.retrieveCalendar = (clientId, clientSecret, refreshToken) => {
  const oAuth2Client = new OAuth2(clientId, clientSecret);

  oAuth2Client.setCredentials({ refresh_token: refreshToken });

  const calendar = google.calendar({ version: "v3", auth: oAuth2Client });

  return calendar;
};

// const eventStartTime = new Date();
// eventStartTime.setDate(eventStartTime.getDay() + 2);

// const eventEndTime = new Date();
// eventEndTime.setDate(eventEndTime.getDay() + 2);
// eventEndTime.setMinutes(eventEndTime.getMinutes() + 45);

// const event = {
//   summary: "My first event",
//   start: {
//     dateTime: eventStartTime,
//     timeZone: "America/Denver"
//   },
//   end: {
//     dateTime: eventEndTime,
//     timeZone: "America/Denver"
//   }
// };

// calendar.freebusy.query(
//   {
//     resource: {
//       timeMin: eventStartTime,
//       timeMax: eventEndTime,
//       timeZone: "America/Denver",
//       items: [{ id: "primary" }] // Focusing on a user's primary calendar
//     }
//   },
//   (err, res) => {
//     if (err) return console.error("Free Busy Query Error: ", err);

//     const eventsArr = res.data.calendars.primary;

//     if (eventsArr.length === 0)
//       return calendar.events.insert(
//         { calendarId: "primary", resource: event },
//         (err) => {
//           if (err) return console.error("Calendar Event Creation Error: ", err);

//           return console.log("Calendar Event Created");
//         }
//       );

//     return console.log("Sorry, user is busy that time");
//   }
// );
