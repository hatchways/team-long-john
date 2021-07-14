import { Box } from '@material-ui/core';
import useStyles from './useStyles';
import { Typography } from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import { appointmentInfoProp, completionUrlProp } from '../../../interface/SchedulerProps';
import Button from '@material-ui/core/Button';
import { useState } from 'react';
import moment from 'moment-timezone';
import { deleteAppointment, getAppointInfo } from '../../../helpers/APICalls/appointment';

export default function Completion(): JSX.Element {
  const history = useHistory();
  const classes = useStyles();

  // Using the appointID, search an appointment by ID to fill in all the information.
  const { appointID } = useParams<completionUrlProp>();

  const [appointInfo, setAppointInfo] = useState<appointmentInfoProp>({
    loadedOnce: false,
    meetingId: '',
    hostUserName: '',
    appointeeEmail: '',
    timeZone: '',
    time: '',
  });
  if (!appointInfo.loadedOnce) {
    getAppointInfo(appointID, setAppointInfo);
  }

  const timeMoment = appointInfo.time === '' ? moment() : moment.tz(appointInfo.time, appointInfo.timeZone);
  const timeStr = timeMoment.format('HH:mm on MMMM DD, YYYY');

  const username = 'John';
  const duration = 60;

  const googleCalen = () => {
    // Communicate with Google to add this appointment to Google Calendar.
  };

  const cancelAppointment = () => {
    // Using appointID, delete this specific appointment from DB.
    deleteAppointment(appointID);
    history.push('/login');
  };

  const rescheduleAppointment = () => {
    deleteAppointment(appointID);
    history.push(`/scheduler/${appointInfo.hostUserName}/${appointInfo.meetingId}`);
  };

  return (
    <Box className={classes.wrapper}>
      <Typography className={classes.header}>
        Hi {username}, <br />
        <br />
        {duration} minute meeting with {appointInfo.hostUserName} at {timeStr} ({appointInfo.timeZone}) is scheduled.
      </Typography>
      <Box className={classes.buttonWrapper}>
        <Button className={`${classes.button} ${classes.googleCalen}`}> Add to Google Calendar </Button>
      </Box>
      <Typography className={classes.subHeader}> Make changes to this event: </Typography>
      <Box className={classes.buttonWrapper}>
        <Box>
          <Button className={`${classes.button} ${classes.confirm}`} onClick={rescheduleAppointment}>
            Reschedule
          </Button>
        </Box>
        <Box>
          <Button className={`${classes.button} ${classes.cancel}`} onClick={cancelAppointment}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
