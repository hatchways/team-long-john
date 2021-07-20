import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Modal, Box, FormControl, Select, InputLabel, MenuItem, Button, OutlinedInput } from '@material-ui/core';
import { useSnackBar } from '../../../context/useSnackbarContext';
import useStyles from './useStyles';
import { meetingInfoProp } from '../../../interface/SchedulerProps';
import { useEffect } from 'react';
import { editMeetingInfo, getMeetingInfo } from '../../../helpers/APICalls/meetings';

interface Props {
  meetingId: string;
  setMeetingId: React.Dispatch<React.SetStateAction<string>>;
}

export default function EventEditModal({ meetingId, setMeetingId }: Props): JSX.Element {
  const classes = useStyles();
  const { updateSnackBarMessage } = useSnackBar();
  const [meetingInfo, setMeetingInfo] = useState<meetingInfoProp>({
    userId: '',
    meetingTitle: '',
    duration: 10,
  });
  useEffect(() => {
    if (meetingId !== 'N/A') {
      getMeetingInfo(meetingId, setMeetingInfo);
    }
  }, [meetingId]);

  const initialValues = {
    name: meetingInfo.meetingTitle,
    duration: meetingInfo.duration.toString(),
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: async ({ name, duration }, { resetForm }) => {
      if (duration === '' || name === '') {
        updateSnackBarMessage('Please enter a valid event duration');
      } else {
        editMeetingInfo(meetingId, name, duration, updateSnackBarMessage);
        setMeetingId('N/A');
        resetForm();
      }
    },
  });

  const handleClose = () => setMeetingId('N/A');

  const modalBody = (
    <div className={classes.paper}>
      <Box className={classes.formHeader}>
        <h1>Edit Event</h1>
      </Box>
      <form onSubmit={formik.handleSubmit} className={classes.formBox}>
        <Box className={classes.formItem}>
          <h3>Enter a new name for the event:</h3>
          <FormControl>
            <OutlinedInput name="name" placeholder="Name" value={formik.values.name} onChange={formik.handleChange} />
          </FormControl>
        </Box>
        <Box className={classes.formItem}>
          <h3>Change the duration of the event:</h3>
          <FormControl>
            <InputLabel>Duration</InputLabel>
            <Select
              name="duration"
              value={formik.values.duration}
              onChange={formik.handleChange}
              className={classes.formInput}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value={15}>15</MenuItem>
              <MenuItem value={30}>30</MenuItem>
              <MenuItem value={45}>45</MenuItem>
              <MenuItem value={60}>60</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box className={classes.buttonBox}>
          <Button type="submit" className={classes.button}>
            Finish Editting
          </Button>
        </Box>
      </form>
    </div>
  );

  return (
    <div>
      <Modal open={meetingId !== 'N/A'} onClose={handleClose} className={classes.modal}>
        {modalBody}
      </Modal>
    </div>
  );
}
