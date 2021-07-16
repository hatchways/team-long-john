import { Box } from '@material-ui/core';
import useStyles from './useStyles';
import { Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { confirmProp } from '../../../interface/SchedulerProps';
import Button from '@material-ui/core/Button';
import { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { CreateGoogleEvent } from '../../../helpers/APICalls/appointment';

export default function Confirmation(props: confirmProp): JSX.Element {
  const history = useHistory();
  const classes = useStyles();

  // This regex is used to check if the email is valid or not.
  const emailREGEX = /\S+@\S+\.\S+/;
  const timeString = props.time.format('HH:mm on MMMM DD, YYYY');
  const [appointeeEmail, setAppointeeEmail] = useState('');
  const [appointeeName, setAppointeeName] = useState('');

  const completeAppointment = () => {
    if (!emailREGEX.test(appointeeEmail)) {
      alert('Please enter a valid email address!');
      return;
    }
    if (appointeeName.length === 0) {
      alert('Please enter a valid (preferred) name!');
      return;
    }
    // Create an appointment in DB and in host user's google calendar
    // and redirect the appointee to appointment completion page upon success.
    // Object used to create an appointment in DB.
    const propCA = {
      meetingId: props.meetingId,
      appointeeName: appointeeName,
      appointeeEmail: appointeeEmail,
      timeZone: props.timeZone,
      time: props.time,
      duration: props.duration,
    };
    // Object used to create an appointment in host user's google calendar.
    const propGoogleCreate = {
      email: props.hostEmail,
      summary: props.meetingTitle,
      location: 'N/A',
      description: props.meetingTitle,
      startISO: props.time.toISOString(),
      duration: props.duration,
      timeZone: props.timeZone,
      colorId: 1,
    };
    CreateGoogleEvent(propGoogleCreate, propCA, history);
  };

  const handleEmailChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setAppointeeEmail(event.currentTarget.value.toLowerCase());
  };

  const handleNameChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setAppointeeName(event.currentTarget.value.toLowerCase());
  };

  return (
    <Box className={classes.wrapper}>
      <Typography className={classes.header}>
        You are about to make an appointment with {props.username}
        &nbsp;at {timeString} ({props.timeZone}) for {props.duration} minutes.
      </Typography>
      <TextField
        className={classes.textField}
        onChange={handleEmailChange}
        placeholder="E-mail Address"
        variant="outlined"
        fullWidth
        InputProps={{
          classes: {
            input: classes.textFieldContent,
          },
        }}
      />
      <TextField
        className={classes.textField}
        onChange={handleNameChange}
        placeholder="Your name"
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
