import React from 'react';
import { Grid, Box, InputAdornment, InputLabel, OutlinedInput } from '@material-ui/core/';

import OnboardingHeader from './OnboardingHeader/OnboardingHeader';
import logo from '../../Images/logo.png';
import useStyles from './useStyles';

const ProfileSettings = (): JSX.Element => {
  const classes = useStyles();

  return (
    <Grid className={classes.page} container direction="column" justify="center" alignItems="center">
      <img src={logo} />
      <Box className={classes.component}>
        <OnboardingHeader headerText="Welcome to CalendApp!" />
        <Box className={classes.form}>
          <Box>
            <h4 className={classes.subheader}>Create your CalendApp URL:</h4>
            <h4 className={classes.subheader}>Select your time zone:</h4>
          </Box>
          <Box className={classes.box}>
            <OutlinedInput
              id="input-with-icon-adornment"
              startAdornment={
                <InputAdornment position="start">
                  <InputLabel htmlFor="component-outlined">calendapp.com/</InputLabel>
                </InputAdornment>
              }
            />
            <OutlinedInput id="input-with-icon-adornment" />
          </Box>
        </Box>
      </Box>
    </Grid>
  );
};

export default ProfileSettings;
