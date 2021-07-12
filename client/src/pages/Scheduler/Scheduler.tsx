import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Box } from '@material-ui/core';
import useStyles from './useStyles';
import { Typography } from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import Calendar from 'react-calendar';
import moment from 'moment-timezone';
import ScheduleIcon from '@material-ui/icons/Schedule';
import FormControl from '@material-ui/core/FormControl';
import BuildTimeZones from './BuildTimeZones';
import TimePopulator from './TimePopulator';
import { disableDateProp, schedUrlProp } from '../../interface/SchedulerProps';
import Confirmation from './Confirmation/Confirmation';

export default function Scheduler(): JSX.Element {
  const history = useHistory();
  const classes = useStyles();

  // This is the username of the person who is hosting the appointment, not the current user.
  // When integrating, search the user by this username to get specific information.
  const { username, duration } = useParams<schedUrlProp>();
  const availableDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const userTimeZone = 'America/Toronto';
  const startTime = '08:10';
  const endTime = '22:00';

  const today = new Date();
  const [timeZone, setTimeZone] = useState(userTimeZone);
  const [dateSelected, setDateSelected] = useState(today);
  const [dateSelISO, setDateSelISO] = useState(today.toISOString());
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
    const dateInfo = moment(dateSelected).format('YYYY-MM-DD');
    const momentTZ = moment.tz(`${dateInfo} ${timeValue}`, timeZone);
    const userMoment = moment.tz(momentTZ, userTimeZone);
    return userMoment;
  };

  const checkDisableTime = (timeValue: string) => {
    // Put further disabling based on user's google calendar info here.
    const userMoment = calenDateToUserTZ(timeValue);
    return userMoment.isBefore(moment(today)) || !availableDays.includes(userMoment.format('dddd'));
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
            <BuildTimeZones userTimeZone={userTimeZone} changeTimeZone={changeTimeZone} />
          </FormControl>
        </Box>
        <Box className={classes.timeContainer}>
          <Typography className={classes.timeHeader}>
            {moment.tz(dateSelected, userTimeZone).format('dddd, MMMM DD')}
          </Typography>
          <TimePopulator
            startTime={startTime}
            endTime={endTime}
            userTimeZone={userTimeZone}
            timeZone={timeZone}
            today={today}
            duration={Number(duration)}
            checkConfirmation={checkConfirmation}
            checkDisableTime={checkDisableTime}
          />
        </Box>
      </Box>
      {confirmTrigger ? (
        <Confirmation
          username={username}
          duration={Number(duration)}
          timeZone={timeZone}
          time={moment.tz(dateSelISO, timeZone)}
          cancelConfirmation={cancelConfirmation}
        />
      ) : (
        <Box />
      )}
    </Grid>
  );
}
