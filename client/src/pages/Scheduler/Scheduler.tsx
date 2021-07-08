import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Box } from '@material-ui/core';
import useStyles from './useStyles';
import { Typography } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import Calendar from 'react-calendar';
import moment from 'moment-timezone';
import ScheduleIcon from '@material-ui/icons/Schedule';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

interface disableDateProp {
  activeStartDate: Date;
  date: Date;
  view: string;
}

interface TimeZone {
  [key: string]: { tZone: string; abbr: string };
}

export default function Scheduler(): JSX.Element {
  const history = useHistory();
  const classes = useStyles();

  const username = 'TEMP USER';
  const duration = 60;
  const availableDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const userTimeZone = 'America/Toronto';
  const startTime = '11:20';
  const endTime = '20:00';

  const today = new Date();
  const [timeZone, setTimeZone] = useState(userTimeZone);
  const [dateSelected, setDateSelected] = useState(today);
  const [dateSelISO, setDateSelISO] = useState(today.toISOString());

  // This prop is used to set custom menu for the Select pop-up.
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 400,
        width: 250,
      },
    },
  };

  // Create a map of time zones.
  const timeZones: TimeZone = {};
  moment.tz.names().map((tZone): void => {
    const abbr = moment.tz(tZone).zoneName();

    if (abbr[0] === '+' || abbr[0] === '-') return;

    timeZones[tZone] = { tZone, abbr };
  });

  // Render our list of time zones to choose from.
  const renderTimeZones = Object.keys(timeZones)
    .sort()
    .map((key) => {
      const { tZone, abbr } = timeZones[key];
      const time = moment.tz(tZone).format('(h:mma)');

      return (
        <MenuItem key={tZone} value={tZone}>
          <h4 style={{ display: 'inline', marginRight: '5px' }}> {`${tZone} (${abbr})`} </h4>
          <span style={{ color: '#b0b9cd' }}>{time}</span>
        </MenuItem>
      );
    });

  const changeTimeZone = (event: React.ChangeEvent<{ value: unknown }>) => {
    setTimeZone(event.target.value as string);
  };

  const updateDate = (event: Date) => {
    // Since clicking on the calendar gives the date object in the local timezone,
    // only extract the year, month, and date info from the event.
    // Then create a moment using the timezone and get ISOString.
    const dateInfo = moment(event).format('YYYY-MM-DD');
    const momentTZ = moment.tz(dateInfo, timeZone);
    setDateSelected(event);
  };

  const disableDates = (dateProp: disableDateProp) => {
    // Turn the prop.date amd today into moment with appropriate timezone.
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
    return userMoment.isBefore(moment(today));
  };

  const timeButtonBuilder = (curMoment: moment.Moment, endMoment: moment.Moment) => {
    const output = [];
    while (curMoment.isBefore(endMoment)) {
      const time = curMoment.format('HH:mm');
      output.push(
        <Button
          key={time}
          value={time}
          className={classes.timeSched}
          onClick={getDateInfo}
          disabled={checkDisableTime(time)}
        >
          {time}
        </Button>,
      );
      curMoment = curMoment.add(duration, 'm');
    }
    return output;
  };

  const getDateInfo = (event: React.MouseEvent<HTMLButtonElement>) => {
    const timeValue = event.currentTarget.value;
    const userMoment = calenDateToUserTZ(timeValue);

    // Set the DateSelISO here so we can easily send request along with time.
    setDateSelISO(userMoment.toISOString());
    alert(`Time selected on user's base time zone is ${userMoment}`);
  };

  const populateTimes = () => {
    // Using moment with user's own timezone as the basis, get a moment of the same time in different timezone.
    // Then observe how HH:mm changed to create buttons based on the selected timezone.
    const availStartBase = moment.tz(`${moment(today).format('YYYY-MM-DD')} ${startTime}`, userTimeZone);
    const availEndBase = moment.tz(`${moment(today).format('YYYY-MM-DD')} ${endTime}`, userTimeZone);

    const availStartMoment = moment.tz(availStartBase, timeZone);
    const availEndMoment = moment.tz(availEndBase, timeZone);

    const availStartTZ = availStartMoment.format('HH:mm');
    const availEndTZ = availEndMoment.format('HH:mm');

    const compareTimeA = new Date(`1/1/2020 ${availStartTZ}`);
    const compareTimeB = new Date(`1/1/2020 ${availEndTZ}`);

    if (compareTimeA < compareTimeB) {
      return timeButtonBuilder(moment(compareTimeA), moment(compareTimeB));
    } else if (compareTimeB < compareTimeA) {
      const firstHalf = timeButtonBuilder(
        moment(new Date(`1/1/2020 00:${startTime.split(':')[1]}`)),
        moment(compareTimeB),
      );
      const secondHalf = timeButtonBuilder(moment(compareTimeA), moment(new Date('1/1/2020 23:59')));
      return firstHalf.concat(secondHalf);
    }
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
            <Select defaultValue={userTimeZone} MenuProps={MenuProps} onChange={changeTimeZone}>
              {renderTimeZones}
            </Select>
          </FormControl>
        </Box>
        <Box className={classes.timeContainer}>
          <Typography className={classes.timeHeader}>
            {moment.tz(dateSelected, userTimeZone).format('dddd, MMMM DD')}
          </Typography>
          <Box className={classes.timeSchedContainer}> {populateTimes()} </Box>
        </Box>
      </Box>
    </Grid>
  );
}
