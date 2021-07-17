import { Box } from '@material-ui/core';
import useStyles from './useStyles';
import { Typography } from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import { completionUrlProp, meetingInfoProp } from '../../../interface/SchedulerProps';
import Button from '@material-ui/core/Button';
import { useState } from 'react';
import moment from 'moment-timezone';
import { deleteAppointment, getAppointInfo } from '../../../helpers/APICalls/appointment';
import { appointmentInfoProp } from '../../../interface/AppointmentProps';
import { CreateGoogleEvent, deleteGoogleEvent } from '../../../helpers/APICalls/googleCalendarEvent';
import { getMeetingInfo } from '../../../helpers/APICalls/meetings';
import { useEffect } from 'react';

export default function Completion(): JSX.Element {
  const history = useHistory();
  const classes = useStyles();

  // Using the appointID, search an appointment by ID to fill in all the information.
  const { appointID } = useParams<completionUrlProp>();

  const [meetingInfo, setMeetingInfo] = useState<meetingInfoProp>({
    userId: '',
    meetingTitle: '',
    duration: 10,
  });
  const [appointInfo, setAppointInfo] = useState<appointmentInfoProp>({
    meetingId: '',
    hostGoogleEid: '',
    hostUserName: '',
    hostName: '',
    hostEmail: '',
    appointeeGoogleEid: '',
    appointeeName: '',
    appointeeEmail: '',
    timeZone: '',
    time: '',
  });
  useEffect(() => {
    getAppointInfo(appointID, setAppointInfo, history);
  }, [appointID, history]);
  useEffect(() => {
    if (appointInfo.meetingId) {
      getMeetingInfo(appointInfo.meetingId, setMeetingInfo);
    }
  }, [appointInfo.meetingId]);

  const timeMoment = appointInfo.time === '' ? moment() : moment.tz(appointInfo.time, appointInfo.timeZone);
  const timeStr = timeMoment.format('HH:mm on MMMM DD, YYYY');

  const cancelAppointment = (reschedule: boolean) => {
    // Using appointID, delete this specific appointment from DB.
    deleteAppointment(appointID);
    deleteGoogleEvent(appointInfo.hostEmail, appointInfo.hostGoogleEid);
    if (appointInfo.appointeeGoogleEid !== 'N/A') {
      deleteGoogleEvent(appointInfo.appointeeEmail, appointInfo.appointeeGoogleEid);
    }
    if (reschedule) {
      history.push(`/shared/${appointInfo.hostUserName}/${appointInfo.meetingId}`);
    } else {
      history.push('/login');
    }
  };

  const appointeeGEvent = () => {
    const propAppointeeGE = {
      appointmentId: appointID,
    };
    const propGoogleCreate = {
      email: appointInfo.appointeeEmail,
      summary: meetingInfo.meetingTitle,
      location: 'N/A',
      description: meetingInfo.meetingTitle,
      startISO: appointInfo.time,
      duration: meetingInfo.duration,
      timeZone: appointInfo.timeZone,
      colorId: 1,
    };
    CreateGoogleEvent(false, propGoogleCreate, propAppointeeGE, undefined, setAppointInfo);
  };

  return (
    <Box className={classes.wrapper}>
      <Typography className={classes.header}>
        Hi {appointInfo.appointeeName}, <br />
        <br />
        {meetingInfo.duration} minute meeting with {appointInfo.hostName} at {timeStr} ({appointInfo.timeZone}) is
        scheduled.
      </Typography>
      <Box className={classes.buttonWrapper}>
        <Button className={`${classes.button} ${classes.googleCalen}`} onClick={appointeeGEvent}>
          Add to Google Calendar
        </Button>
      </Box>
      <Typography className={classes.subHeader}> Make changes to this event: </Typography>
      <Box className={classes.buttonWrapper}>
        <Box>
          <Button className={`${classes.button} ${classes.confirm}`} onClick={() => cancelAppointment(true)}>
            Reschedule
          </Button>
        </Box>
        <Box>
          <Button className={`${classes.button} ${classes.cancel}`} onClick={() => cancelAppointment(false)}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
