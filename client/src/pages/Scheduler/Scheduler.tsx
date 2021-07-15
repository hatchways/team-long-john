import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Box } from '@material-ui/core';
import useStyles from './useStyles';
import { Typography } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import Calendar from 'react-calendar';
import moment from 'moment-timezone';
import ScheduleIcon from '@material-ui/icons/Schedule';
import FormControl from '@material-ui/core/FormControl';
import BuildTimeZones from './BuildTimeZones';
import TimePopulator from './TimePopulator';
import { disableDateProp, hostInfoProp, schedUrlProp } from '../../interface/SchedulerProps';
import Confirmation from './Confirmation/Confirmation';
import { getHostInfo } from '../../helpers/APICalls/scheduler';
import fitNewTimeSlot from './helper/fitNewTimeSlot';

export default function Scheduler(): JSX.Element {
  const classes = useStyles();

  // This is the username of the person who is hosting the appointment.
  const { username, meetingId } = useParams<schedUrlProp>();
  const duration = 30;

  const [hostInfo, setHostInfo] = useState<hostInfoProp>({
    loadedOnce: false,
    hostEmail: '',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    timeZone: 'America/Toronto',
    startTime: '08:00',
    endTime: '09:00',
    appointments: [],
  });
  // loadedOnce param exists to avoid infinite recursion caused by updating hostInfo.
  if (!hostInfo.loadedOnce) {
    getHostInfo(username, setHostInfo);
  }

  const today = new Date();
  // Timezone selected on the scheduler.
  const [timeZone, setTimeZone] = useState(hostInfo.timeZone);
  // Date selected on the calendar. Does not take account of timeZone (uses user's PC timezone).
  const [dateSelected, setDateSelected] = useState(today);
  // Date selected to the ISO string.
  const [dateSelISO, setDateSelISO] = useState(today.toISOString());
  // Used to open or close the confirmation dialog when time slot is clicked.
  const [confirmTrigger, setConfirmTrigger] = useState(false);

  const changeTimeZone = (event: React.ChangeEvent<{ value: unknown }>) => {
    setTimeZone(event.target.value as string);
  };

  const updateDate = (event: Date) => {
    setDateSelected(event);
  };

  const disableDates = (dateProp: disableDateProp) => {
    // Turn the prop.date and today into moment with appropriate timezone.
    const dateInfo = moment(dateProp.date).format('YYYY-MM-DD');
    const dateMoment = moment.tz(dateInfo, timeZone);
    const todayMoment = moment.tz(today, timeZone);
    return dateMoment.isBefore(todayMoment, 'day');
  };

  const calenDateToUserTZ = (timeValue: string) => {
    // Converts "current" time in the selected timezone to the user's base timezone.
    const dateInfo = moment(dateSelected).format('YYYY-MM-DD');
    const momentTZ = moment.tz(`${dateInfo} ${timeValue}`, timeZone);
    const userMoment = moment.tz(momentTZ, hostInfo.timeZone);
    return userMoment;
  };

  const checkDisableTime = (timeValue: string) => {
    const userMoment = calenDateToUserTZ(timeValue);
    const userDate = new Date(userMoment.toISOString());
    const canFit = fitNewTimeSlot(userDate, duration, hostInfo.appointments);
    // Put further disabling based on user's google calendar info here.
    return !canFit || userMoment.isBefore(moment(today)) || !hostInfo.availableDays.includes(userMoment.format('dddd'));
  };

  const checkConfirmation = (event: React.MouseEvent<HTMLButtonElement>) => {
    const timeValue = event.currentTarget.value;
    const userMoment = calenDateToUserTZ(timeValue);
    // Set the DateSelISO here so we can easily send request along with time.
    setDateSelISO(userMoment.toISOString());
    setConfirmTrigger(true);
  };

  const cancelConfirmation = () => {
    setConfirmTrigger(false);
  };

  return (
    <Grid className={`${classes.root}`}>
      <CssBaseline />
      <Box className={classes.wrapper}>
        <Box className={classes.meetingInfo}>
          <Typography className={classes.meetingInfoUser}> {username} </Typography>
          <Typography className={classes.meetingInfoHeader}> {duration} minute meeting </Typography>
          <ScheduleIcon className={classes.meetingInfoTime} />
          <Typography className={classes.meetingInfoTime}> {duration} min </Typography>
        </Box>
        <Box className={classes.calendarContainer}>
          <Typography className={classes.calendarHeader}> Select a Date &amp; Time </Typography>
          <Calendar minDetail={'year'} showNeighboringMonth={false} onChange={updateDate} tileDisabled={disableDates} />
          <FormControl style={{ minWidth: '35%' }}>
            <BuildTimeZones userTimeZone={hostInfo.timeZone} changeTimeZone={changeTimeZone} />
          </FormControl>
        </Box>
        <Box className={classes.timeContainer}>
          <Typography className={classes.timeHeader}>
            {moment.tz(dateSelected, hostInfo.timeZone).format('dddd, MMMM DD')}
          </Typography>
          <TimePopulator
            startTime={hostInfo.startTime}
            endTime={hostInfo.endTime}
            userTimeZone={hostInfo.timeZone}
            timeZone={timeZone}
            today={today}
            duration={Number(duration)}
            checkConfirmation={checkConfirmation}
            checkDisableTime={checkDisableTime}
          />
        </Box>
      </Box>
      {confirmTrigger && (
        <Confirmation
          username={username}
          meetingId={meetingId}
          duration={duration}
          timeZone={timeZone}
          time={moment(dateSelISO)}
          cancelConfirmation={cancelConfirmation}
        />
      )}
    </Grid>
  );
}
