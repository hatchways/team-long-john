import { useEffect, useState } from 'react';
import { Box, Button, FormControl, TextField, Typography } from '@material-ui/core/';

import useStyles from './useStyles';
import { useAuth } from '../../../context/useAuthContext';
import RenderCheckBoxes from './RenderCheckBoxes';
import BuildTimeZones from '../../Scheduler/BuildTimeZones';
import { useSnackBar } from '../../../context/useSnackbarContext';
import { UpdateAvail } from '../../../helpers/APICalls/settings';

const Availability = (): JSX.Element => {
  const { loggedInUser } = useAuth();
  const classes = useStyles();
  const { updateSnackBarMessage } = useSnackBar();
  const [openTimes, setOpenTimes] = useState({ start: '08:00', end: '17:00' });
  const [openDays, setOpenDays] = useState<string[]>([]);
  const [timeZone, setTimeZone] = useState(loggedInUser ? loggedInUser.timezone : 'America/Toronto');

  useEffect(() => {
    if (loggedInUser) {
      setOpenTimes({
        start: loggedInUser.availableHours.start,
        end: loggedInUser.availableHours.end,
      });
      const processed = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      for (let i = 0; i < 7; i++) {
        if (!loggedInUser.availableDays.includes(processed[i])) {
          processed[i] = '';
        }
      }
      setOpenDays(processed);
    }
  }, [loggedInUser, setOpenTimes, setOpenDays, setTimeZone]);

  const changeTimeZone = (event: React.ChangeEvent<{ value: unknown }>) => {
    setTimeZone(event.target.value as string);
  };

  const handleChangeTimes = (e: { target: HTMLInputElement | HTMLTextAreaElement }) => {
    setOpenTimes({ ...openTimes, [e.target.name]: e.target.value });
  };

  const handleClickFinish = () => {
    if (loggedInUser) {
      UpdateAvail(loggedInUser.email, openTimes, openDays, timeZone, updateSnackBarMessage);
      loggedInUser.availableDays = openDays;
      loggedInUser.availableHours = openTimes;
      loggedInUser.timezone = timeZone;
    } else {
      alert('Please login to your account.');
    }
  };

  return (
    <Box className={classes.availWrapper}>
      <Box className={classes.formItemsContainer}>
        <Typography className={classes.subHeader}> AVAILABILITY SETTING </Typography>
        <Box mx={6}>
          <h4>Available Hours:</h4>
        </Box>
        <Box mx={6} className={classes.formItem}>
          <TextField
            onChange={(e) => handleChangeTimes(e)}
            name="start"
            variant="outlined"
            id="time"
            type="time"
            value={openTimes.start}
            InputProps={{
              className: classes.inputProp,
            }}
          />
          <p className={classes.timeDash}>-</p>
          <TextField
            onChange={(e) => handleChangeTimes(e)}
            name="end"
            variant="outlined"
            id="time"
            type="time"
            value={openTimes.end}
            InputProps={{
              className: classes.inputProp,
            }}
          />
        </Box>
        <Box mx={6}>
          <h4>Available Days:</h4>
        </Box>
        <Box mx={6} className={`${classes.formItem} ${classes.formDays}`}>
          {RenderCheckBoxes({ openDays, setOpenDays })}
        </Box>
        <FormControl className={classes.timeZoneForm}>
          <BuildTimeZones userTimeZone={timeZone} changeTimeZone={changeTimeZone} />
        </FormControl>
      </Box>
      <Box mb={3} className={classes.buttonsContainer}>
        <Button onClick={handleClickFinish} variant="contained" className={classes.finish}>
          Update
        </Button>
      </Box>
    </Box>
  );
};

export default Availability;
