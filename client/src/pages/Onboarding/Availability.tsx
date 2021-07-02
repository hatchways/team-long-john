import React from 'react';
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

const Availability = (): JSX.Element => {
  const classes = useStyles();

  return (
    <Box mt={5} className={classes.page}>
      <CalendAppLogo />
      <Box className={classes.box}>
        <div>
          <OnboardingHeader headerText="Your Google calendar is connected!" progressValue={50} />
          <Box mt={5} className={classes.form}></Box>
        </div>
        <Box mb={3} className={classes.buttonBox}>
          <Button variant="contained" className={classes.finish}>
            Continue
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Availability;
