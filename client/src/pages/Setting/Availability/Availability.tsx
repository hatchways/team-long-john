import { useEffect, useState } from 'react';
import { Box, Button, TextField, Checkbox, Typography } from '@material-ui/core/';

import useStyles from './useStyles';
import { UpdateAvail } from '../../../helpers/APICalls/onboarding';
import { useAuth } from '../../../context/useAuthContext';
import RenderCheckBoxes from './RenderCheckBoxes';

const Availability = (): JSX.Element => {
  const { loggedInUser, logout } = useAuth();
  const classes = useStyles();
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const [openTimes, setOpenTimes] = useState({ start: '08:00', end: '17:00' });
  const [openDays, setOpenDays] = useState<string[]>([]);

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
  }, [loggedInUser, setOpenTimes, setOpenDays]);

  const handleChangeTimes = (e: { target: HTMLInputElement | HTMLTextAreaElement }) => {
    setOpenTimes({ ...openTimes, [e.target.name]: e.target.value });
  };

  const handleClickFinish = () => {
    if (loggedInUser) {
      UpdateAvail(loggedInUser.email, openTimes, openDays);
      loggedInUser.availableDays = openDays;
      loggedInUser.availableHours = openTimes;
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
              style: { fontSize: 15, fontWeight: 'bold' },
            }}
          />
          <p style={{ fontSize: '30px', margin: '0 50px' }}>-</p>
          <TextField
            onChange={(e) => handleChangeTimes(e)}
            name="end"
            variant="outlined"
            id="time"
            type="time"
            value={openTimes.end}
            InputProps={{
              style: { fontSize: 15, fontWeight: 'bold' },
            }}
          />
        </Box>
        <Box mx={6}>
          <h4>Available Days:</h4>
        </Box>
        <Box mx={6} className={`${classes.formItem} ${classes.formDays}`}>
          {RenderCheckBoxes({ openDays, setOpenDays })}
        </Box>
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
