import { useState } from 'react';
import { Box, Button, TextField, Checkbox } from '@material-ui/core/';

import CalendAppLogo from '../../../components/CalendAppLogo/CalendAppLogo';
import OnboardingHeader from '../OnboardingHeader/OnboardingHeader';
import useStyles from './useStyles';

const Availability = (): JSX.Element => {
  const classes = useStyles();
  const days = ['Sundays', 'Mondays', 'Tuesdays', 'Wednesdays', 'Thursdays', 'Fridays', 'Saturdays'];

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
    console.log("I haven't been integrated to our server yet!");
  };

  const renderCheckboxes = days.map((day: string, idx: number) => {
    // Pulling out the first and last box so we can customize the first and last box borders
    if (idx === 0) {
      return (
        <Box
          key={day}
          width={150}
          height={100}
          className={classes.checkbox}
          style={{ borderRight: '1px solid #c4c4c4' }}
        >
          <Checkbox onChange={(e) => handleChangeDays(e, idx)} value={day} style={{ color: '#F76900' }} />
          <p style={{ marginTop: '0px' }}>{day}</p>
        </Box>
      );
    } else if (idx === days.length - 1) {
      return (
        <Box key={day} width={150} height={100} className={classes.checkbox} style={{ borderRight: '0px' }}>
          <Checkbox onChange={(e) => handleChangeDays(e, idx)} value={day} style={{ color: '#F76900' }} />
          <p style={{ marginTop: '0px' }}>{day}</p>
        </Box>
      );
    } else {
      return (
        <Box
          key={day}
          width={150}
          height={100}
          className={classes.checkbox}
          style={{ borderRight: '1px solid #c4c4c4' }}
        >
          <Checkbox onChange={(e) => handleChangeDays(e, idx)} value={day} style={{ color: '#F76900' }} />
          <p style={{ marginTop: '0px' }}>{day}</p>
        </Box>
      );
    }
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
        <Box mb={3} className={classes.buttonBox}>
          <Button onClick={handleClickFinish} variant="contained" className={classes.finish}>
            Finish
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Availability;
