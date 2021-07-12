import React, { useState } from 'react';
import { Modal, Box, OutlinedInput, Button } from '@material-ui/core';

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

  const handleClose = () => setOpen(false);

  const [formInput, setFormInput] = useState<IForm>({
    title: '',
    duration: '',
  });

  const modalBody = (
    <div className={classes.paper}>
      <Box className={classes.formHeader}>
        <h1>Create New Event</h1>
      </Box>
      <Box mt={2} className={classes.formItem}>
        <h3>Enter the title of the event:</h3>
        <OutlinedInput className={classes.formInput} />
      </Box>
      <Box className={classes.formItem}>
        <h3>Enter the duration of the event:</h3>
        <OutlinedInput className={classes.formInput} />
      </Box>
      <Box mt={2.5} className={classes.buttonBox}>
        <Button className={classes.button}>Create Event</Button>
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
