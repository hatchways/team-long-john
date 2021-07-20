import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Modal, Box, FormControl, Select, InputLabel, MenuItem, Button, OutlinedInput } from '@material-ui/core';
import { useSnackBar } from '../../../context/useSnackbarContext';
import useStyles from './useStyles';
import { meetingInfoProp } from '../../../interface/SchedulerProps';
import { useEffect } from 'react';
import { editMeetingInfo, getMeetingInfo } from '../../../helpers/APICalls/meetings';
import { useAuth } from '../../../context/useAuthContext';
import { User } from '../../../interface/User';
import { EventDetailEdit } from '../../../interface/Meeting';

interface Props {
  meetingDetail: EventDetailEdit;
  setMeetingDetail: React.Dispatch<React.SetStateAction<EventDetailEdit>>;
}

export default function EventEditModal({ meetingDetail, setMeetingDetail }: Props): JSX.Element {
  const classes = useStyles();
  const { updateSnackBarMessage } = useSnackBar();
  const loggedInUser: User | null | undefined = useAuth().loggedInUser;
  const [meetingInfo, setMeetingInfo] = useState<meetingInfoProp>({
    userId: '',
    meetingTitle: '',
    duration: 15,
  });
  useEffect(() => {
    if (meetingDetail.meetingId !== 'N/A') {
      getMeetingInfo(meetingDetail.meetingId, setMeetingInfo);
    }
  }, [meetingDetail]);

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
        editMeetingInfo(meetingDetail.meetingId, name, duration, updateSnackBarMessage);
        setMeetingDetail({
          meetingId: 'N/A',
          forEdit: false,
        });
        resetForm();
      }
    },
  });

  const handleClose = () => setMeetingDetail({ meetingId: 'N/A', forEdit: false });

  const editForm = (
    <form onSubmit={formik.handleSubmit} className={classes.formBox}>
      <Box className={classes.formItem}>
        <h3>Enter a new name for the event:</h3>
        <FormControl>
          <OutlinedInput
            name="name"
            placeholder={initialValues.name}
            value={formik.values.name}
            onChange={formik.handleChange}
          />
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
            <MenuItem value={15}>15</MenuItem>
            <MenuItem value={30}>30</MenuItem>
            <MenuItem value={45}>45</MenuItem>
            <MenuItem value={60}>60</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box className={classes.buttonBox}>
        <Button type="submit" className={classes.button}>
          Finish Editing
        </Button>
      </Box>
    </form>
  );

  const shareLinkBody = (
    <Box className={classes.shareBox}>
      <h2>
        SHARE LINK:&nbsp;
        {loggedInUser && `${window.location.origin}/shared/${loggedInUser.username}/${meetingDetail.meetingId}`}
      </h2>
    </Box>
  );

  const detailForm = (
    <Box className={classes.formBox}>
      <Box className={classes.formItem}>
        <h2> EVENT NAME: &ldquo;{meetingInfo.meetingTitle}&rdquo; </h2>
      </Box>
      <Box className={classes.formItem}>
        <h2> EVENT DURATION: &ldquo;{meetingInfo.duration}&rdquo; </h2>
      </Box>
      <Box className={classes.buttonBox}>
        <Button type="submit" className={classes.button} onClick={handleClose}>
          CLOSE DETAILS
        </Button>
      </Box>
    </Box>
  );

  return (
    <div>
      <Modal open={meetingDetail.meetingId !== 'N/A'} onClose={handleClose} className={classes.modal}>
        <div className={meetingDetail.forEdit ? classes.paper : classes.eventDetail}>
          <Box className={classes.formHeader}>
            <h1>{meetingDetail.forEdit ? 'Edit Event' : 'Event Details'}</h1>
          </Box>
          {!meetingDetail.forEdit && shareLinkBody}
          {meetingDetail.forEdit ? editForm : detailForm}
        </div>
      </Modal>
    </div>
  );
}
