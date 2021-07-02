import React from 'react';
import moment from 'moment-timezone';

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

import CalendAppLogo from '../../components/CalendAppLogo/CalendAppLogo';
import OnboardingHeader from './OnboardingHeader/OnboardingHeader';
import useStyles from './useStyles';

interface TimeZone {
  [key: string]: { timeZone: string; abbr: string };
}

const ProfileSettings = (): JSX.Element => {
  const classes = useStyles();
  const filteredTimeZones: TimeZone = {};

  // Sends a GET request to check for a unique URL
  // Add a randomly generated unique url in the default value
  // If not taken, then send a PUT request for username url and time zone
  // const handleClickContinue = async () => {};

  // Set up later redirects to dashboard
  // const handleClickSetUpLater = () => {};

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
      <Box className={classes.box}>
        <div>
          <OnboardingHeader headerText="Welcome to CalendApp!" />
          <Box mt={5} className={classes.form}>
            <Box mb={3} mx={10} className={classes.inputBox}>
              <h4 style={{ marginRight: '15px' }}>Create your CalendApp URL:</h4>
              <FormControl>
                <OutlinedInput
                  startAdornment={
                    <InputAdornment position="start">
                      <InputLabel>calendapp.com/</InputLabel>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Box>
            <Box mb={2} mx={10} className={classes.inputBox}>
              <h4>Select your time zone:</h4>
              <FormControl style={{ minWidth: '35%' }} variant="outlined">
                <Select defaultValue="">{renderTimeZones}</Select>
              </FormControl>
            </Box>
          </Box>
        </div>
        <Box mb={3} className={classes.buttonBox}>
          <Button variant="contained" className={classes.finish}>
            Continue
          </Button>
          <Button className={classes.setUpLater}>Set up later</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileSettings;
