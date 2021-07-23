import React, { useEffect, useState, useCallback } from 'react';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Box } from '@material-ui/core';
import useStyles from './useStyles';
import { Typography } from '@material-ui/core';
import { Button } from '@material-ui/core';
import Navigation from '../Navigation/Navigation';
import UserDashInfo from './UserDashInfo/UserDashInfo';
import ScheduleOption from './ScheduleOption/ScheduleOption';
import ButtonBase from '@material-ui/core/ButtonBase';
import CircularProgress from '@material-ui/core/CircularProgress';
import moment from 'moment-timezone';

import { fetchAppointments } from '../../helpers/APICalls/appointment';
import { useAuth } from '../../context/useAuthContext';
import { fetchMeetings } from '../../helpers/APICalls/meetings';
import EventModal from './EventModal/EventModal';
import { EventDetailEdit, Meetings } from '../../interface/Meeting';
import { User } from '../../interface/User';
import { useSnackBar } from '../../context/useSnackbarContext';
import { Appointments } from '../../interface/AppointmentProps';
import EventEditModal from './EventEditModal/EventEditModal';

export default function Dashboard(): JSX.Element {
  const classes = useStyles();
  const { updateSnackBarMessage } = useSnackBar();

  // Controls whether to open or close our modal
  const [open, setOpen] = React.useState<boolean>(false);
  const dashOptions = ['EVENT TYPES', 'SCHEDULED EVENTS'];
  const [dashOptionSelected, setDashOption] = React.useState(dashOptions[0]);
  const schedOptions = ['PAST'];
  const [schedSelect, setSchedSelect] = React.useState(schedOptions[0]);
  const loggedInUser: User | null | undefined = useAuth().loggedInUser;
  const [meetingOptions, setMeetingOptions] = useState<Meetings>([]);
  const [events, setEvents] = useState<Appointments | undefined>({ appointments: [] });

  // Selected meeting id.
  const [meetingDetail, setMeetingDetail] = React.useState<EventDetailEdit>({
    meetingId: 'N/A',
    forEdit: false,
  });

  const fetchMeetingsCallback = useCallback(
    async (id) => {
      const meetings = await fetchMeetings(id, updateSnackBarMessage);
      if (meetings.success) setMeetingOptions(meetings.success.data);
    },
    [updateSnackBarMessage],
  );

  useEffect(() => {
    if (loggedInUser) fetchMeetingsCallback(loggedInUser._id);
  }, [fetchMeetingsCallback, loggedInUser, meetingDetail.meetingId]);

  if (loggedInUser === undefined || loggedInUser === null) return <CircularProgress />;

  const handleOpen = () => setOpen(true);

  // Handles logic for dashboard and schedule options
  const handleClickDashOptions = () => {
    // Fetches events based on appointment type
    const fetchEvents = async (type: string) => {
      const appointments = await fetchAppointments(loggedInUser.username, type);
      setEvents(appointments.success);
    };

    // If we are on "Scheduled Events"...
    if (dashOptionSelected === dashOptions[0]) {
      // If user is on the 'Past' section...
      if (schedSelect === schedOptions[0]) fetchEvents('past');
    }
  };

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

  const displayMeetOptions = (options: Meetings) => {
    const colors = ['purple', 'green', 'orange'];
    const output = [];

    for (let i = 0; i < Object.keys(options).length; i++) {
      output.push(
        <ScheduleOption
          key={`meeting option ${i}`}
          id={options[i]._id}
          name={options[i].name}
          schedTime={options[i].duration}
          colour={colors[i % colors.length]}
          setMeetingDetail={setMeetingDetail}
        />,
      );
    }
    return output;
  };

  const populateSchedEvent = () => {
    const output = [];

    if (events) {
      for (let i = 0; i < events.appointments.length; i++) {
        const { appointeeEmail, appointeeName, duration, time, timezone } = events.appointments[i];

        output.push(
          <Box key={`schedule ${i}`} className={classes.schedEventData}>
            <Box className={`${classes.schedInfo} ${classes.timeInfo}`}>
              <Typography>
                Meeting with{' '}
                <b>
                  {appointeeName} ({appointeeEmail})
                </b>
              </Typography>
            </Box>
            <Box className={classes.schedInfo}>
              <Typography>
                You had a <b>{duration} minute</b> meeting on{' '}
                <b>{moment(time).tz(timezone).format('MM/DD/YYYY (h:mma z)')}</b>
              </Typography>
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
      <EventModal fetchMeetingsCallback={fetchMeetingsCallback} open={open} setOpen={setOpen} />
      <EventEditModal meetingDetail={meetingDetail} setMeetingDetail={setMeetingDetail} />
      <Box className={classes.dashWrapper}>
        <Box className={classes.headerWrapper}>
          <Box className={classes.header}>
            <Typography className={classes.headerTitle}> My CalendApp </Typography>
            <Box onClick={handleClickDashOptions} className={classes.headerMenu}>
              {createOptions(dashOptions, dashOptionSelected, setDashOption)}
            </Box>
          </Box>
        </Box>
        {dashOptionSelected === dashOptions[0] ? (
          <Box className={classes.dashNewEvent}>
            <UserDashInfo handleOpen={handleOpen} />
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
