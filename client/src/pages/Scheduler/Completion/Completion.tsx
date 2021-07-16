import { Box } from '@material-ui/core';
import useStyles from './useStyles';
import { Typography } from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import { completionUrlProp } from '../../../interface/SchedulerProps';
import Button from '@material-ui/core/Button';
import { useState } from 'react';
import moment from 'moment-timezone';
import { deleteAppointment, deleteGoogleEvent, getAppointInfo } from '../../../helpers/APICalls/appointment';
import { appointmentInfoProp } from '../../../interface/AppointmentProps';

export default function Completion(): JSX.Element {
  const history = useHistory();
  const classes = useStyles();

  // Using the appointID, search an appointment by ID to fill in all the information.
  const { appointID } = useParams<completionUrlProp>();
  const hostEmail = 'lkdh97@gmail.com';
  const hostUserName = 'lkdh97';
  const duration = 60;

  const [appointInfo, setAppointInfo] = useState<appointmentInfoProp>({
    loadedOnce: false,
    meetingId: '',
    googleEventId: '',
    appointeeName: '',
    appointeeEmail: '',
    timeZone: '',
    time: '',
  });
  if (!appointInfo.loadedOnce) {
    getAppointInfo(appointID, setAppointInfo, history);
  }

  const timeMoment = appointInfo.time === '' ? moment() : moment.tz(appointInfo.time, appointInfo.timeZone);
  const timeStr = timeMoment.format('HH:mm on MMMM DD, YYYY');

  const cancelAppointment = () => {
    // Using appointID, delete this specific appointment from DB.
    deleteAppointment(appointID);
    deleteGoogleEvent(hostEmail, appointInfo.googleEventId);
    history.push('/login');
  };

  const rescheduleAppointment = () => {
    deleteAppointment(appointID);
    deleteGoogleEvent(hostEmail, appointInfo.googleEventId);
    history.push(`/shared/${hostUserName}/${appointInfo.meetingId}`);
  };

  return (
    <Box className={classes.wrapper}>
      <Typography className={classes.header}>
        Hi {appointInfo.appointeeName}, <br />
        <br />
        {duration} minute meeting with {hostUserName} at {timeStr} ({appointInfo.timeZone}) is scheduled.
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
