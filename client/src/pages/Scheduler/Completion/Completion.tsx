import { Box } from '@material-ui/core';
import useStyles from './useStyles';
import { Typography } from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import { completionUrlProp } from '../../../interface/SchedulerProps';
import Button from '@material-ui/core/Button';

export default function Completion(): JSX.Element {
  const history = useHistory();
  const classes = useStyles();

  // Using the appointID, search an appointment by ID to fill in all the information.
  const { appointID } = useParams<completionUrlProp>();

  const username = 'John';
  const duration = 60;
  const host = 'Kate';
  const time = '10:00 on February 10, 2020';
  const timeZone = 'America/Toronto';

  const googleCalen = () => {
    // Communicate with Google to add this appointment to Google Calendar.
  };

  const cancelAppointment = () => {
    // Using appointID, delete this specific appointment from DB.
  };

  const rescheduleAppointment = () => {
    cancelAppointment();
    history.push(`/scheduler/${host}/${duration}`);
  };

  return (
    <Box className={classes.wrapper}>
      <Typography className={classes.header}>
        Hi {username}, <br />
        <br />
        {duration} minute meeting with {host} at {time} ({timeZone}) is scheduled.
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
