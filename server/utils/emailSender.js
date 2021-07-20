const moment = require("moment-timezone");
const asyncHandler = require("express-async-handler");
const { isDev } = require("../utils/isDev");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.appointCreateDeleteEmail = asyncHandler(
  async (forCreate, toHost, appointment) => {
    const meeting = await Meeting.findById(appointment.meetingId);
    const user = await User.findOne({ username: appointment.hostUserName });
    const targetName = toHost ? appointment.appointeeName : user.name;
    const targetEmail = toHost ? user.email : appointment.appointeeEmail;
    const appointTime = toHost
      ? moment.tz(appointment.time, user.timezone)
      : moment.tz(appointment.time, appointment.timeZone);

    const msg = forCreate
      ? {
          to: targetEmail,
          from: process.env.SENDGRID_FROM_EMAIL,
          subject: `Appointment created: ${meeting.name}`,
          text:
            `Appointment for ${meeting.name} with ${targetName} has been scheduled ` +
            `for ${appointTime.format("YYYY-MM-DD HH:mm")}.\n` +
            `If you wish to reschedule or cancel this appointment, please use the following link: ` +
            `${isDev()}/completion/${appointment._id}`,
        }
      : {
          to: targetEmail,
          from: process.env.SENDGRID_FROM_EMAIL,
          subject: `Appointment deleted: ${meeting.name}`,
          text:
            `Appointment for ${meeting.name} with ${targetName} on ` +
            `${appointTime.format("YYYY-MM-DD HH:mm")} has been deleted. `,
        };
    sgMail.send(msg);
  }
);

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
