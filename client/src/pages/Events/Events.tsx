import { useEffect, useState } from 'react';
import { Box, Grid } from '@material-ui/core';

import ScheduleOption from '../Dashboard/ScheduleOption/ScheduleOption';
import { Meetings } from '../../interface/Meeting';
import { useAuth } from '../../context/useAuthContext';
import { fetchMeetings } from '../../helpers/APICalls/meetings';
import useStyles from './useStyles';

const Events = (): JSX.Element => {
  const [meetingOptions, setMeetingOptions] = useState<Meetings>([]);
  const { loggedInUser } = useAuth();
  const classes = useStyles();

  useEffect(() => {
    if (loggedInUser) {
      fetchMeetings(loggedInUser._id).then((res) => {
        if (res.success) setMeetingOptions(res.success.data);
      });
    }
  }, [loggedInUser]);

  const displayMeetOptions = (options: Meetings) => {
    const colors = ['purple', 'green', 'orange'];
    const output = [];

    for (let i = 0; i < Object.keys(options).length; i++) {
      output.push(
        <ScheduleOption
          key={`meeting option ${i}`}
          name={options[i].name}
          schedTime={options[i].duration}
          colour={colors[i % colors.length]}
        />,
      );
    }
    return output;
  };

  return (
    <Grid>
      <h3>{loggedInUser ? loggedInUser.name : ''}</h3>
      <p>Welcome to my scheduling page. Please follow the instructions to add an event to my calendar.</p>
      <Box>{displayMeetOptions(meetingOptions)}</Box>
    </Grid>
  );
};

export default Events;
