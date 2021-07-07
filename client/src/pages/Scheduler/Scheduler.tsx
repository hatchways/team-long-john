import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Box } from '@material-ui/core';
import useStyles from './useStyles';
import { Typography } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { useAuth } from '../../context/useAuthContext';
import { useSocket } from '../../context/useSocketContext';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { mockLoggedInUser } from '../../mocks/mockUser';
import Calendar from 'react-calendar';
import './Calendar.css';
import moment from 'moment-timezone';

interface disableDateProp {
  activeStartDate: Date;
  date: Date;
  view: string;
}

export default function Scheduler(): JSX.Element {
  const history = useHistory();
  const classes = useStyles();
  const timeZone = 'America/Toronto';
  const today = new Date();

  const [dateSelected, setDateSelected] = useState(today);
  const [dateSelISO, setDateSelISO] = useState(today.toISOString());

  const updateDate = (event: Date) => {
    setDateSelected(event);
    setDateSelISO(event.toISOString());
  };

  const disableDates = (dateProp: disableDateProp) => {
    const date = dateProp.date;
    let dateNum = date.getFullYear() * 10000 + date.getMonth() * 100;
    let todayNum = today.getFullYear() * 10000 + today.getMonth() * 100;
    if (dateProp.view !== 'year') {
      dateNum += date.getDate();
      todayNum += today.getDate();
    }
    return dateNum < todayNum;
  };

  const timeZoneInfo = () => {
    return `${timeZone} (${moment.tz(today, timeZone).format('Z z')})`;
  };

  return (
    <Grid className={`${classes.root}`}>
      <CssBaseline />
      <Box className={classes.wrapper}>
        <Box className={classes.meetingInfo} />
        <Box className={classes.calendarContainer}>
          <Typography className={classes.calendarHeader}> Select a Date &amp; Time </Typography>
          <Calendar
            value={dateSelected}
            minDetail={'year'}
            showNeighboringMonth={false}
            onChange={updateDate}
            tileDisabled={disableDates}
          />
          <Typography className={classes.calendarTimeZone}> {timeZoneInfo()} </Typography>
        </Box>
      </Box>
    </Grid>
  );
}
