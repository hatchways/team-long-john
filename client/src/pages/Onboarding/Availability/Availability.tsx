import { useState } from 'react';
import { Box, Button, TextField, Checkbox } from '@material-ui/core/';

import CalendAppLogo from '../../../components/CalendAppLogo/CalendAppLogo';
import OnboardingHeader from '../OnboardingHeader/OnboardingHeader';
import useStyles from './useStyles';
import { UpdateAvail } from '../../../helpers/APICalls/onboarding';
import { useAuth } from '../../../context/useAuthContext';
import { useSnackBar } from '../../../context/useSnackbarContext';

const Availability = (): JSX.Element => {
  const { loggedInUser, logout } = useAuth();
  const classes = useStyles();
  const { updateSnackBarMessage } = useSnackBar();
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  // Keeps track of available hours and days
  const [openTimes, setOpenTimes] = useState({ start: '08:00', end: '17:00' });
  const [openDays, setOpenDays] = useState<string[]>([]);

  const handleChangeTimes = (e: { target: HTMLInputElement | HTMLTextAreaElement }) => {
    setOpenTimes({ ...openTimes, [e.target.name]: e.target.value });
  };

  const handleChangeDays = (e: { target: HTMLInputElement | HTMLTextAreaElement }, idx: number) => {
    const { value } = e.target;
    const copy = openDays;

    // If value is already in here, then we want to remove it
    if (copy.includes(value)) copy[idx] = '';
    // else the value is not in here, then add it
    else copy[idx] = value;

    setOpenDays([...copy]);
  };

  const handleClickFinish = () => {
    if (loggedInUser) UpdateAvail(loggedInUser.email, openTimes, openDays, logout, updateSnackBarMessage);
    else updateSnackBarMessage('Please login to your account.');
  };

  const renderCheckboxes = days.map((day: string, idx: number) => {
    // Conditionally renders disabled/enabled checkboxes
    const isEnabled = openDays[idx] === day;

    // Pulling out the first and last box so we can customize the first and last box borders
    if (idx === 0) {
      return (
        <Box key={day} className={classes.checkboxContainer} style={{ borderRight: '1px solid #c4c4c4' }}>
          <Checkbox
            value={day}
            onChange={(e) => handleChangeDays(e, idx)}
            className={isEnabled ? classes.enabledCheckbox : classes.disabledCheckbox}
          />
          <p className={isEnabled ? classes.enabledCheckboxText : classes.disabledCheckboxText}>{day}</p>
        </Box>
      );
    } else if (idx === days.length - 1) {
      return (
        <Box key={day} className={classes.checkboxContainer} style={{ borderRight: '0px' }}>
          <Checkbox
            value={day}
            onChange={(e) => handleChangeDays(e, idx)}
            className={isEnabled ? classes.enabledCheckbox : classes.disabledCheckbox}
          />
          <p className={isEnabled ? classes.enabledCheckboxText : classes.disabledCheckboxText}>{day}</p>
        </Box>
      );
    } else {
      return (
        <Box key={day} className={classes.checkboxContainer} style={{ borderRight: '1px solid #c4c4c4' }}>
          <Checkbox
            value={day}
            onChange={(e) => handleChangeDays(e, idx)}
            className={isEnabled ? classes.enabledCheckbox : classes.disabledCheckbox}
          />
          <p className={isEnabled ? classes.enabledCheckboxText : classes.disabledCheckboxText}>{day}</p>
        </Box>
      );
    }
  });

  return (
    <Box mt={5} className={classes.page}>
      <CalendAppLogo />
      <Box className={classes.formContainer}>
        <OnboardingHeader headerText="Set Your Availability" progressValue={75} />
        <Box className={classes.formItemsContainer}>
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
              defaultValue="08:00"
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
              defaultValue="17:00"
              InputProps={{
                style: { fontSize: 15, fontWeight: 'bold' },
              }}
            />
          </Box>
          <Box mx={6}>
            <h4>Available Days:</h4>
          </Box>
          <Box mx={6} className={classes.formItem} style={{ border: '1px solid #c4c4c4', borderRadius: '10px' }}>
            {renderCheckboxes}
          </Box>
        </Box>
        <Box mb={3} className={classes.buttonsContainer}>
          <Button onClick={handleClickFinish} variant="contained" className={classes.finish}>
            Finish
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Availability;
