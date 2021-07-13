import React, { useEffect, useState, useCallback } from 'react';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Box } from '@material-ui/core';
import useStyles from './useStyles';
import { Typography } from '@material-ui/core';
import { Button } from '@material-ui/core';
import Navigation from './Navigation/Navigation';
import UserDashInfo from './UserDashInfo/UserDashInfo';
import ScheduleOption from './ScheduleOption/ScheduleOption';
import ButtonBase from '@material-ui/core/ButtonBase';
import CircularProgress from '@material-ui/core/CircularProgress';

import { useAuth } from '../../context/useAuthContext';
import EventModal from './EventModal/EventModal';

interface Meeting {
  userId: string;
  duration: number;
}

export default function Dashboard(): JSX.Element {
  const classes = useStyles();
  // Controls whether to open or close our modal
  const [open, setOpen] = React.useState<boolean>(false);
  const dashOptions = ['EVENT TYPES', 'SCHEDULED EVENTS'];
  const [dashOptionSelected, setDashOption] = React.useState(dashOptions[0]);
  const schedOptions = ['UPCOMING', 'PENDING', 'PAST'];
  const [schedSelect, setSchedSelect] = React.useState(schedOptions[0]);
  const loggedInUser: any = useAuth().loggedInUser;
  const [meetingOptions, setMeetingOptions] = useState<number[]>([]);

  const fetchMeetings = useCallback(async () => {
    if (loggedInUser) {
      const copyOfMeetingOptions: number[] = [];

      const res = await fetch(`/meeting?userId=${loggedInUser._id}`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      const meetings = await res.json();

      meetings.map((meeting: Meeting) => copyOfMeetingOptions.push(meeting.duration));
      copyOfMeetingOptions.sort((a, b) => a - b);

      setMeetingOptions(copyOfMeetingOptions);
    }
  }, [loggedInUser]);

  useEffect(() => {
    fetchMeetings();
  }, [fetchMeetings, meetingOptions, loggedInUser]);

  if (loggedInUser === undefined || loggedInUser === null) {
    return <CircularProgress />;
  }

  const handleOpen = () => setOpen(true);

  const createOptions = (
    choices: string[],
    stateVar: string,
    stateUpdate: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    const output = [];
    for (let i = 0; i < choices.length; i++) {
      output.push(
        <Button
          key={choices[i]}
          className={stateVar === choices[i] ? `${classes.option} ${classes.selected}` : classes.option}
          onClick={function () {
            stateUpdate(choices[i]);
          }}
        >
          {choices[i]}
        </Button>,
      );
    }
    return output;
  };

  const displayMeetOptions = (options: number[]) => {
    const colors = ['purple', 'green', 'orange'];
    const output = [];
    for (let i = 0; i < options.length; i++) {
      output.push(
        <ScheduleOption key={`meeting option ${i}`} schedTime={options[i]} colour={colors[i % colors.length]} />,
      );
    }
    return output;
  };

  const populateSchedEvent = () => {
    const output = [];
    const events = [];
    if (schedSelect === schedOptions[0]) {
      // Need to fill in the code where all of the appropriate events are getting populated.
      // Note that this is just a dummy data and this code needs to change depending on the structure
      // of the data recieved from the database.
      events.push({ name: 'Alan', duration: 60 });
      events.push({ name: 'Rickman', duration: 30 });
    }
    if (events.length > 0) {
      for (let i = 0; i < events.length; i++) {
        // Note that this is using a dummy data and this code needs to change in the future accordingly.
        output.push(
          <Box key={`schedule ${i}`} className={classes.schedEventData}>
            <Box className={`${classes.schedInfo} ${classes.timeInfo}`}> TIME INFORMATION TO BE FILLED </Box>
            <Box className={classes.schedInfo}>
              <Typography> Meeting with {events[i].name} </Typography>
              <Typography> {events[i].duration} minutes meeting </Typography>
            </Box>
            <Box className={classes.schedInfo}>
              <Button> {'>'} DETAILS </Button>
            </Box>
          </Box>,
        );
      }
    } else {
      output.push(
        <Box key="empty schedule" className={classes.emptyEventList}>
          NO EVENTS YET
        </Box>,
      );
    }
    return output;
  };

  return (
    <Box className={`${classes.root} ${classes.dashboard}`}>
      <CssBaseline />
      <Navigation />
      <EventModal open={open} setOpen={setOpen} />
      <Box className={classes.dashWrapper}>
        <Box className={classes.headerWrapper}>
          <Box className={classes.header}>
            <Typography className={classes.headerTitle}> My CalendApp </Typography>
            <Box className={classes.headerMenu}> {createOptions(dashOptions, dashOptionSelected, setDashOption)} </Box>
          </Box>
        </Box>
        {dashOptionSelected === dashOptions[0] ? (
          <Box onClick={handleOpen} className={classes.dashNewEvent}>
            <UserDashInfo />
            <Grid container spacing={2}>
              {displayMeetOptions(meetingOptions)}
            </Grid>
          </Box>
        ) : (
          <Box className={classes.dashSchedEvent}>
            <Box className={classes.schedButtonContainer}>
              {createOptions(schedOptions, schedSelect, setSchedSelect)}
            </Box>
            <Box className={classes.schedEventList}> {populateSchedEvent()} </Box>
          </Box>
        )}
        <ButtonBase className={classes.helpButton}> Getting Started Guide </ButtonBase>
      </Box>
    </Box>
  );
}
