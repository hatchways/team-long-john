import { useHistory } from 'react-router-dom';
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

import CalendAppLogo from '../../../components/CalendAppLogo/CalendAppLogo';
import OnboardingHeader from '../OnboardingHeader/OnboardingHeader';
import useStyles from './useStyles';

interface TimeZone {
  [key: string]: { timeZone: string; abbr: string };
}

const ProfileSettings = (): JSX.Element => {
  const classes = useStyles();
  const filteredTimeZones: TimeZone = {};
  const history = useHistory();

  const handleClickContinue = async () => {
    // Sends a GET request to check if URL is taken

    // If the request above is successful, then we send a PUT request
    // to update username URL and time zone

    // Use history to push to the confirm page
    history.push('confirm');
  };

  // Set up later redirects to dashboard
  const handleClickSetUpLater = () => {
    // Use history to push to the dashboard page
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
              <Select defaultValue="">{renderTimeZones}</Select>
            </FormControl>
          </Box>
        </Box>
        <Box mb={3} className={classes.buttonsContainer}>
          <Button onClick={handleClickContinue} variant="contained" className={classes.finish}>
            Continue
          </Button>
          <Button className={classes.setUpLater}>Set up later</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileSettings;
