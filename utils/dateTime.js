const moment = require("moment-timezone");

// Converts a time to a date object
module.exports.convertToDate = (time, day, format) => {
  let now = new Date();
  if (format === "h:m") {
    now.setHours(time.substr(0, time.indexOf(":")));
    now.setMinutes(time.substr(time.indexOf(":") + 1));
    now.setDate(day);
    now.setSeconds(0);
    return now;
  } else return "Invalid Format";
};

// Converts a time to a time zone
module.exports.convertToTimeZone = (time, zone) => {
  // Using this format will give you an easy to understand time
  // 'MMMM Do YYYY, h:mm a z'
  return moment.tz(time, zone).utc().format();
};

// Gets the name of a day based off a user's time zone
module.exports.getDayName = (time, zone) => {
  let nameOfDay = new Date(time);
  nameOfDay = moment(nameOfDay, "YYYY-MM-DD HH:mm:ss");
  nameOfDay = nameOfDay.format("dddd");
  return nameOfDay;
};
