import { Box } from '@material-ui/core';
import useStyles from './useStyles';
import { Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { confirmProp } from '../../../interface/SchedulerProps';
import Button from '@material-ui/core/Button';

export default function Confirmation(props: confirmProp): JSX.Element {
  const history = useHistory();
  const classes = useStyles();

  const timeString = props.time.format('HH:mm on MMMM DD, YYYY');

  const completeAppointment = () => {
    // Communicate with the BE to create an appointment with given information.
    // Redirect the user to the appointment completion page: /completion/:appointmentID
    // For testing purpose, the current url for completeion page is /completion.
    history.push('/completion');
  };

  return (
    <Box className={classes.wrapper}>
      <Typography className={classes.header}>
        You are about to make an appointment with {props.username}
        &nbsp;at {timeString} ({props.timeZone}) for {props.duration} minutes.
      </Typography>
      <Box className={classes.buttonWrapper}>
        <Button className={`${classes.button} ${classes.confirm}`} onClick={completeAppointment}>
          Continue
        </Button>
        <Button className={`${classes.button} ${classes.cancel}`} onClick={props.cancelConfirmation}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
}