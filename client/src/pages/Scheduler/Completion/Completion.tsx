import { Box } from '@material-ui/core';
import useStyles from './useStyles';
import { Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';

export default function Completion(): JSX.Element {
  const history = useHistory();
  const classes = useStyles();

  const username = 'John';
  const duration = 60;
  const host = 'Kate';
  const time = '10:00 on February 10, 2020';
  const timeZone = 'America/Toronto';

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
