import { useHistory } from 'react-router-dom';
import { Box, Button } from '@material-ui/core/';

import CalendAppLogo from '../../../components/CalendAppLogo/CalendAppLogo';
import OnboardingHeader from '../OnboardingHeader/OnboardingHeader';
import useStyles from './useStyles';

const Confirm = (): JSX.Element => {
  const classes = useStyles();
  const history = useHistory();

  const handleClickContinue = async () => {
    // Sends a GET request to check if URL is taken

    // If the request above is successful, then we send a PUT request
    // to update username URL and time zone

    // Use history to push to the confirm page
    history.push('availability');
  };

  return (
    <Box mt={5} className={classes.page}>
      <CalendAppLogo />
      <Box className={classes.formContainer}>
        <OnboardingHeader headerText="Your Google calendar is connected!" progressValue={50} />
        <Box className={classes.formItemsContainer}>
          <Box mx={6} my={1} className={classes.formItem}>
            <h4 style={{ marginLeft: '-20px' }}>Here is how CalendApp will work with john-doe@gmail.com:</h4>
          </Box>
          <Box mx={6} mb={1} className={classes.formItem}>
            <p>
              1. We will check <b>{'"john-doe@gmail.com"'}</b> for conflicts
            </p>
            <h4 style={{ color: 'lightgrey', cursor: 'pointer' }}>EDIT</h4>
          </Box>
          <Box mx={6} mb={1} className={classes.formItem}>
            <p>
              2. We will add event to <b>{'"john-doe@gmail.com"'}</b>
            </p>
            <h4 style={{ color: 'lightgrey', cursor: 'pointer' }}>EDIT</h4>
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

export default Confirm;