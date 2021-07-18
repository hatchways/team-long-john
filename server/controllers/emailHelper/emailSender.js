const moment = require("moment-timezone");
const asyncHandler = require("express-async-handler");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.appointCreateEmail = asyncHandler(async (toHost, appointment) => {
  const meeting = await Meeting.findById(appointment.meetingId);
  const user = await User.findOne({ username: appointment.hostUserName });
  const targetName = toHost ? appointment.appointeeName : user.name;
  const targetEmail = toHost ? user.email : appointment.appointeeEmail;
  const appointTime = toHost
    ? moment.tz(appointment.time, user.timezone)
    : moment.tz(appointment.time, appointment.timeZone);

  const msg = {
    to: targetEmail,
    from: process.env.SENDGRID_FROM_EMAIL,
    subject: `Appointment created: ${meeting.name}`,
    text:
      `Appointment for ${meeting.name} with ${targetName} has been scheduled ` +
      `on ${appointTime.format("YYYY-MM-DD HH:mm")}.\n` +
      `If you wish to cancel this appointment, please use the following link: ` +
      `/completion/${appointment._id}`,
  };
  sgMail.send(msg);
});
