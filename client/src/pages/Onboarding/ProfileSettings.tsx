import React from 'react';
import moment from 'moment-timezone';

import {
  Grid,
  Box,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Select,
  MenuItem,
  FormControl,
} from '@material-ui/core/';

import OnboardingHeader from './OnboardingHeader/OnboardingHeader';
import logo from '../../Images/logo.png';
import useStyles from './useStyles';
import { string } from 'yup';

interface TimeZone {
  [key: string]: { timeZone: string; abbr: string };
}

const ProfileSettings = (): JSX.Element => {
  const classes = useStyles();

  const filteredTimeZones: TimeZone = {};

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
      const time = moment.tz(timeZone).format('(h:ma)');

      return (
        <MenuItem key={abbr} value={timeZone}>
          <h4 style={{ display: 'inline', marginRight: '5px' }}>{abbr} Time</h4>
          <span style={{ color: '#b0b9cd' }}>{time}</span>
        </MenuItem>
      );
    });

  return (
    <Grid className={classes.page} container direction="column" justify="center" alignItems="center">
      <img src={logo} />
      <Box className={classes.box}>
        <OnboardingHeader headerText="Welcome to CalendApp!" />
        <Box mt={5}>
          <Box mb={3} mx={10} className={classes.inputBox}>
            <h4>Create your CalendApp URL:</h4>
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
              <Select value="">{renderTimeZones}</Select>
            </FormControl>
          </Box>
        </Box>
      </Box>
    </Grid>
  );
};

export default ProfileSettings;
