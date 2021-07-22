const moment = require("moment-timezone");
const asyncHandler = require("express-async-handler");
const { isDev } = require("../utils/isDev");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.appointCreateEmail = asyncHandler(async (appointment) => {
  const meeting = await Meeting.findById(appointment.meetingId);
  const user = await User.findOne({ username: appointment.hostUserName });

  const hostMsg = {
    to: user.email,
    from: process.env.SENDGRID_FROM_EMAIL,
    subject: `Appointment created: ${meeting.name}`,
    text:
      `Appointment for ${meeting.name} with ${appointment.appointeeName} has been scheduled ` +
      `for ${moment
        .tz(appointment.time, user.timezone)
        .format("YYYY-MM-DD HH:mm")}.\n` +
      `If you wish to reschedule or cancel this appointment, please use the following link: ` +
      `${isDev()}/completion/${appointment._id}`,
  };
  sgMail.send(hostMsg);

  const appointeeMsg = {
    to: appointment.appointeeEmail,
    from: process.env.SENDGRID_FROM_EMAIL,
    subject: `Appointment created: ${meeting.name}`,
    text:
      `Appointment for ${meeting.name} with ${user.name} has been scheduled ` +
      `for ${moment
        .tz(appointment.time, appointment.timezone)
        .format("YYYY-MM-DD HH:mm")}.\n` +
      `If you wish to reschedule or cancel this appointment, please use the following link: ` +
      `${isDev()}/completion/${appointment._id}`,
  };
  sgMail.send(appointeeMsg);
});

exports.appointDeleteEmail = asyncHandler(async (appointment) => {
  const meeting = await Meeting.findById(appointment.meetingId);
  const user = await User.findOne({ username: appointment.hostUserName });

  const hostMsg = {
    to: user.email,
    from: process.env.SENDGRID_FROM_EMAIL,
    subject: `Appointment deleted: ${meeting.name}`,
    text:
      `Appointment for ${meeting.name} with ${appointment.appointeeName} on ` +
      `${moment
        .tz(appointment.time, user.timezone)
        .format("YYYY-MM-DD HH:mm")} has been deleted. `,
  };
  sgMail.send(hostMsg);

  const appointeeMsg = {
    to: appointment.appointeeEmail,
    from: process.env.SENDGRID_FROM_EMAIL,
    subject: `Appointment deleted: ${meeting.name}`,
    text:
      `Appointment for ${meeting.name} with ${user.name} on ` +
      `${moment
        .tz(appointment.time, appointment.timezone)
        .format("YYYY-MM-DD HH:mm")} has been deleted. `,
  };
  sgMail.send(appointeeMsg);
});

exports.userCreationEmail = (newUser) => {
  const msg = {
    to: newUser.email,
    from: process.env.SENDGRID_FROM_EMAIL,
    subject: `Welcome to CalendApp!`,
    text:
      `Welcome to CalendApp ${newUser.name}! \n` +
      `Your account has successfully been created. You will be required to finish the ` +
      `initial setup process if you haven't finished it already. Enjoy! \n`,
  };
  sgMail.send(msg);
};
