import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import moment from 'moment-timezone';
import { useAuth } from '../../../context/useAuthContext';
import CalendAppLogo from '../../../components/CalendAppLogo/CalendAppLogo';
import OnboardingHeader from '../OnboardingHeader/OnboardingHeader';
import useStyles from './useStyles';
import { CheckURL } from '../../../helpers/APICalls/onboarding';

import {
  Box,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Select,
  MenuItem,
  FormControl,
  Button,
} from '@material-ui/core/';

interface TimeZone {
  [key: string]: { timeZone: string; abbr: string };
}

interface ProfileSettings {
  username: string;
  timezone: string;
}

const ProfileSettings = (): JSX.Element => {
  const classes = useStyles();
  const filteredTimeZones: TimeZone = {};
  const { loggedInUser } = useAuth();
  const history = useHistory();

  const [profileSettings, setProfileSettings] = useState<ProfileSettings>({
    username: '',
    timezone: '',
  });

  const handleClickContinue = async () => {
    // Error handling
    if (profileSettings.username.trim() === '' || profileSettings.timezone.trim() === '') return;
    if (loggedInUser) {
      CheckURL(profileSettings.username, profileSettings.timezone, loggedInUser.email, history);
    } else {
      alert('No loggedInUser is set!');
    }
  };

  const handleChangeUsername = (e: { target: HTMLInputElement | HTMLTextAreaElement }) => {
    const { name, value } = e.target;

    setProfileSettings({ ...profileSettings, [name]: value });
  };

  const handleChangeSelect = async (e: React.ChangeEvent<{ value: unknown }>) => {
    // Have to write it this way since Material-UI is not a real select element
    setProfileSettings({ ...profileSettings, timezone: e.target.value as string });
  };

  // Filtering out list of unnecessary time zones (lots of duplicates)
  moment.tz.names().map((timeZone): void => {
    const abbr = moment.tz(timeZone).zoneName();

    if (abbr[0] === '+' || abbr[0] === '-') return;

    filteredTimeZones[abbr] = { timeZone, abbr };
    return;
  });

  // Render our list of time zones to choose from
  const renderTimeZones = Object.keys(filteredTimeZones)
    .sort()
    .map((key) => {
      const { timeZone, abbr } = filteredTimeZones[key];
      const time = moment.tz(timeZone).format('(h:mma)');

      return (
        <MenuItem key={abbr} value={timeZone}>
          <h4 style={{ display: 'inline', marginRight: '5px' }}>{abbr} Time</h4>
          <span style={{ color: '#b0b9cd' }}>{time}</span>
        </MenuItem>
      );
    });

  return (
    <Box mt={5} className={classes.page}>
      <CalendAppLogo />
      <Box className={classes.formContainer}>
        <OnboardingHeader headerText="Welcome to CalendApp!" progressValue={25} />
        <Box className={classes.formItemsContainer}>
          <Box mt={5} mb={2} mx={10} className={classes.formItem}>
            <h4 style={{ marginRight: '15px' }}>Create your CalendApp URL:</h4>
            <FormControl>
              <OutlinedInput
                name="username"
                onChange={(e) => handleChangeUsername(e)}
                startAdornment={
                  <InputAdornment position="start">
                    <InputLabel>calendapp.com/</InputLabel>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Box>
          <Box mb={2} mx={10} className={classes.formItem}>
            <h4>Select your time zone:</h4>
            <FormControl style={{ minWidth: '35%' }} variant="outlined">
              <Select onChange={(e) => handleChangeSelect(e)} defaultValue="">
                {renderTimeZones}
              </Select>
            </FormControl>
          </Box>
        </Box>
        <Box mb={3} className={classes.buttonsContainer}>
          <Button onClick={handleClickContinue} variant="contained" className={classes.finish}>
            Continue
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileSettings;
