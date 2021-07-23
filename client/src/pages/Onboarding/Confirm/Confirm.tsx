import { useHistory } from 'react-router-dom';
import { Box, Button } from '@material-ui/core/';

import CalendAppLogo from '../../../components/CalendAppLogo/CalendAppLogo';
import OnboardingHeader from '../OnboardingHeader/OnboardingHeader';
import useStyles from './useStyles';
import { useAuth } from '../../../context/useAuthContext';
import { useSnackBar } from '../../../context/useSnackbarContext';

const Confirm = (): JSX.Element => {
  const classes = useStyles();
  const history = useHistory();
  const { updateSnackBarMessage } = useSnackBar();
  const { loggedInUser } = useAuth();

  if (!loggedInUser) {
    updateSnackBarMessage('Please login to your account.');
    history.push('/login');
    return <Box />;
  }

  const handleClickContinue = async () => history.push('availability');

  return (
    <Box mt={5} className={classes.page}>
      <CalendAppLogo />
      <Box className={classes.formContainer}>
        <OnboardingHeader headerText="Your Google calendar is connected!" progressValue={50} />
        <Box className={classes.formItemsContainer}>
          <Box mx={6} my={1} className={classes.formItem}>
            <h4 style={{ marginLeft: '-20px' }}>Here is how CalendApp will work with {loggedInUser.email}:</h4>
          </Box>
          <Box mx={6} mb={1} className={classes.formItem}>
            <p>
              1. We will check <b>{loggedInUser.email}</b> for conflicts
            </p>
          </Box>
          <Box mx={6} mb={1} className={classes.formItem}>
            <p>
              2. We will add event to <b>{loggedInUser.email}</b>
            </p>
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
