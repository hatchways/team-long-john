import React, { useState } from 'react';
import { Modal, Box, FormControl, Select, InputLabel, MenuItem, Button } from '@material-ui/core';
import { useSnackBar } from '../../../context/useSnackbarContext';
import { useAuth } from '../../../context/useAuthContext';

import useStyles from './useStyles';

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EventModal({ open, setOpen }: Props): JSX.Element {
  const classes = useStyles();
  const { updateSnackBarMessage } = useSnackBar();
  const loggedInUser: any = useAuth().loggedInUser;

  const [duration, setDuration] = useState<any>('');

  const handleClose = () => setOpen(false);

  const handleChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    setDuration(e.target.value);
  };

  const handleClick = async () => {
    if (duration === '') {
      updateSnackBarMessage('Please enter a valid event duration');
    }

    const res = await fetch('/meeting', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        userId: loggedInUser._id,
        duration: duration,
      }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    if (res.status === 400) {
      const message = await res.json();
      updateSnackBarMessage(message.error);
      return;
    }

    if (res.status === 406) {
      const message = await res.json();
      updateSnackBarMessage(message.error);
      return;
    }

    setOpen(false);
  };

  const modalBody = (
    <div className={classes.paper}>
      <Box className={classes.formHeader}>
        <h1>Create New Event</h1>
      </Box>
      <Box className={classes.formItem}>
        <h3>Enter the duration of the event:</h3>
        <FormControl>
          <InputLabel>Duration</InputLabel>
          <Select value={duration} onChange={handleChange} className={classes.formInput}>
            <MenuItem value="">None</MenuItem>
            <MenuItem value={15}>15</MenuItem>
            <MenuItem value={30}>30</MenuItem>
            <MenuItem value={45}>45</MenuItem>
            <MenuItem value={60}>60</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box className={classes.buttonBox}>
        <Button onClick={handleClick} className={classes.button}>
          Create Event
        </Button>
      </Box>
    </div>
  );

  return (
    <div>
      <Modal open={open} onClose={handleClose} className={classes.modal}>
        {modalBody}
      </Modal>
    </div>
  );
}
