import React from 'react';
import { Box, Button, TextField, Checkbox } from '@material-ui/core/';

import CalendAppLogo from '../../../components/CalendAppLogo/CalendAppLogo';
import OnboardingHeader from '../OnboardingHeader/OnboardingHeader';
import useStyles from './useStyles';

const Availability = (): JSX.Element => {
  const classes = useStyles();
  const days = ['Sundays', 'Mondays', 'Tuesdays', 'Wednesdays', 'Thursdays', 'Fridays', 'Saturdays'];

  const renderCheckboxes = days.map((day: string) => {
    return (
      <Box key={day} height={75} width={100} className={classes.checkbox}>
        <Checkbox defaultChecked style={{ color: '#F76900' }} />
        <p style={{ marginTop: '0px' }}>{day}</p>
      </Box>
    );
  });

  return (
    <Box mt={5} className={classes.page}>
      <CalendAppLogo />
      <Box className={classes.formBox}>
        <OnboardingHeader headerText="Set Your Availability" progressValue={75} />
        <Box className={classes.formItemsBox}>
          <Box mx={6}>
            <h4>Available Hours:</h4>
          </Box>
          <Box mx={6} className={classes.formItem}>
            <TextField
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
              variant="outlined"
              id="time"
              type="time"
              defaultValue="05:00"
              InputProps={{
                style: { fontSize: 15, fontWeight: 'bold' },
              }}
            />
          </Box>
          <Box mx={6}>
            <h4>Available Days:</h4>
          </Box>
          <Box
            mx={6}
            className={classes.formItem}
            style={{ border: '1px solid #c4c4c4', borderRadius: '4px', borderRight: '0px' }}
          >
            {renderCheckboxes}
          </Box>
        </Box>
        <Box mb={3} className={classes.buttonBox}>
          <Button variant="contained" className={classes.finish}>
            Finish
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Availability;
