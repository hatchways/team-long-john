import React, { useState } from 'react';
import { Modal, Box, FormControl, Select, InputLabel, MenuItem, Button, OutlinedInput } from '@material-ui/core';
import { useSnackBar } from '../../../context/useSnackbarContext';
import { useAuth } from '../../../context/useAuthContext';

import useStyles from './useStyles';

interface Props {
  fetchMeetingsCallback: (id: string) => void;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EventModal({ fetchMeetingsCallback, open, setOpen }: Props): JSX.Element {
  const classes = useStyles();
  const { updateSnackBarMessage } = useSnackBar();
  const loggedInUser: any = useAuth().loggedInUser;

  const [name, setName] = useState<string>('');
  const [duration, setDuration] = useState<number | string | unknown>('');

  const handleClose = () => setOpen(false);

  const handleChangeName = (e: { target: HTMLInputElement | HTMLTextAreaElement }) => {
    setName(e.target.value);
  };

  const handleChangeSelect = (e: React.ChangeEvent<{ value: unknown }>) => {
    setDuration(e.target.value);
  };

  const handleClick = async () => {
    if (duration === '' || name === '') {
      updateSnackBarMessage('Please enter a valid event duration');
    }

    const res = await fetch('/meeting', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        userId: loggedInUser._id,
        name: name,
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

    fetchMeetingsCallback(loggedInUser._id);
    setName('');
    setDuration('false');
    setOpen(false);
  };

  const modalBody = (
    <div className={classes.paper}>
      <Box className={classes.formHeader}>
        <h1>Create New Event</h1>
      </Box>
      <Box className={classes.formItem}>
        <h3>Enter the name of the event:</h3>
        <FormControl>
          <OutlinedInput name="name" placeholder="Name" onChange={(e) => handleChangeName(e)} />
        </FormControl>
      </Box>
      <Box className={classes.formItem}>
        <h3>Enter the duration of the event:</h3>
        <FormControl>
          <InputLabel>Duration</InputLabel>
          <Select value={duration} onChange={handleChangeSelect} className={classes.formInput}>
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
