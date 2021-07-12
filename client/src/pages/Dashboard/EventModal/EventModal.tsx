import React, { useState } from 'react';
import { Modal, Box, OutlinedInput, Button } from '@material-ui/core';
import { useSnackBar } from '../../../context/useSnackbarContext';

import useStyles from './useStyles';

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IForm {
  title: string;
  duration: string;
}

export default function EventModal({ open, setOpen }: Props): JSX.Element {
  const classes = useStyles();
  const { updateSnackBarMessage } = useSnackBar();

  const [form, setForm] = useState<IForm>({
    title: '',
    duration: '',
  });

  const handleClose = () => setOpen(false);

  const handleChange = (e: { target: HTMLInputElement | HTMLTextAreaElement }) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleClick = () => {
    const { title, duration } = form;

    if (title.trim() === '' || duration.trim() === '') {
      updateSnackBarMessage('Please enter a value for title or duration');
    }

    console.log('I have not been implemented yet!');
  };

  const modalBody = (
    <div className={classes.paper}>
      <Box className={classes.formHeader}>
        <h1>Create New Event</h1>
      </Box>
      <Box mt={2} className={classes.formItem}>
        <h3>Enter the title of the event:</h3>
        <OutlinedInput name="title" onChange={(e) => handleChange(e)} className={classes.formInput} />
      </Box>
      <Box className={classes.formItem}>
        <h3>Enter the duration of the event:</h3>
        <OutlinedInput name="duration" onChange={(e) => handleChange(e)} className={classes.formInput} />
      </Box>
      <Box mt={2.5} className={classes.buttonBox}>
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
