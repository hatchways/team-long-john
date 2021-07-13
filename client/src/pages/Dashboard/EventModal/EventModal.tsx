import React, { useState } from 'react';
import { Modal, Box, FormControl, Select, InputLabel, MenuItem, Button } from '@material-ui/core';
import { useSnackBar } from '../../../context/useSnackbarContext';
import { useAuth } from '../../../context/useAuthContext';

import useStyles from './useStyles';

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IForm {
  userId: string;
  duration: string;
}

export default function EventModal({ open, setOpen }: Props): JSX.Element {
  const classes = useStyles();
  const { updateSnackBarMessage } = useSnackBar();
  const { loggedInUser } = useAuth();

  const [form, setForm] = useState<IForm>({ userId: '', duration: '' });

  const handleClose = () => setOpen(false);

  const handleChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    setForm({ ...form, duration: e.target.value as string });
  };

  const handleClick = async () => {
    const { duration } = form;
    const user: any = loggedInUser;

    if (duration === '') {
      updateSnackBarMessage('Please enter a valid event duration');
    }

    // Appending user id and sending our request
    if (user._id) {
      setForm({ ...form, userId: user._id });

      const res = await fetch('/meeting', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(form),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      if (res.status === 400) {
        const message = await res.json();
        updateSnackBarMessage(message.error);
        return;
      } else if (res.status === 406) {
        const message = await res.json();
        updateSnackBarMessage(message.error);
      }

      setOpen(false);
    }
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
          <Select value={form.duration} onChange={handleChange} className={classes.formInput}>
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
