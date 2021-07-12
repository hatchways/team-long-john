import React, { useState } from 'react';
import { Modal, Box, OutlinedInput, Button } from '@material-ui/core';
import { useSnackBar } from '../../../context/useSnackbarContext';

import useStyles from './useStyles';

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IForm {
  duration: string;
}

export default function EventModal({ open, setOpen }: Props): JSX.Element {
  const classes = useStyles();
  const { updateSnackBarMessage } = useSnackBar();

  const [form, setForm] = useState<IForm>({ duration: '' });

  const handleClose = () => setOpen(false);

  const handleChange = (e: { target: HTMLInputElement | HTMLTextAreaElement }) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleClick = async () => {
    const { duration } = form;

    if (duration.trim() === '') {
      updateSnackBarMessage('Please enter a valid event duration');
    }

    const res = await fetch('/meeting', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(form),
    });

    console.log(res);
  };

  const modalBody = (
    <div className={classes.paper}>
      <Box className={classes.formHeader}>
        <h1>Create New Event</h1>
      </Box>
      <Box className={classes.formItem}>
        <h3>Enter the duration of the event:</h3>
        <OutlinedInput name="duration" onChange={(e) => handleChange(e)} className={classes.formInput} />
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
