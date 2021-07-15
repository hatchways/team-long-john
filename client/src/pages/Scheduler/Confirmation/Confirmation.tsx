import { Box } from '@material-ui/core';
import useStyles from './useStyles';
import { Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { confirmProp } from '../../../interface/SchedulerProps';
import Button from '@material-ui/core/Button';
import { CreateAppointment } from '../../../helpers/APICalls/scheduler';
import { useState } from 'react';
import TextField from '@material-ui/core/TextField';

export default function Confirmation(props: confirmProp): JSX.Element {
  const history = useHistory();
  const classes = useStyles();

  const timeString = props.time.format('HH:mm on MMMM DD, YYYY');
  const [appointeeEmail, setAppointeeEmail] = useState('');

  const completeAppointment = () => {
    // Communicate with the BE to create an appointment with given information.
    // Then redirect the user to completion page upon success.
    const propCA = {
      meetingId: props.meetingId,
      hostUserName: props.username,
      appointeeEmail: appointeeEmail,
      timeZone: props.timeZone,
      time: props.time,
      duration: props.duration,
    };
    CreateAppointment(propCA, history);
  };

  const handleTextChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setAppointeeEmail(event.currentTarget.value.toLowerCase());
  };

  return (
    <Box className={classes.wrapper}>
      <Typography className={classes.header}>
        You are about to make an appointment with {props.username}
        &nbsp;at {timeString} ({props.timeZone}) for {props.duration} minutes.
      </Typography>
      <TextField
        className={classes.textField}
        onChange={handleTextChange}
        placeholder="E-mail Address"
        variant="outlined"
        fullWidth
        InputProps={{
          classes: {
            input: classes.textFieldContent,
          },
        }}
      />
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
