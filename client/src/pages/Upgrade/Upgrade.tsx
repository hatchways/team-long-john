import { CircularProgress, Box } from '@material-ui/core';

import Navigation from '../Navigation/Navigation';
import UpgradeCard from './UpgradeCard/UpgradeCard';
import { useAuth } from '../../context/useAuthContext';
import useStyles from './useStyles';

const Upgrade = (): JSX.Element => {
  const classes = useStyles();
  const { loggedInUser } = useAuth();

  if (loggedInUser === undefined || loggedInUser === null) return <CircularProgress />;

  return (
    <Box>
      <Navigation />
      <Box className={classes.pageBox}>
        <h1>Upgrade your account</h1>
        <h3 style={{ color: 'grey' }}>You are on the free basic plan</h3>
        <Box mt={4} className={classes.paymentBox}>
          <UpgradeCard
            headerColor="#1DA1F2"
            headerText="Standard"
            headerSubtitle="Free"
            disableButton={true}
            buttonText="Current"
            redirectUrl="/upgrade"
          >
            <p>Limited Meetings</p>
            <p>Create Custom Events</p>
          </UpgradeCard>
          <UpgradeCard
            headerColor="#8ab804"
            headerText="Premium"
            headerSubtitle="$5/month"
            disableButton={false}
            buttonText="Upgrade"
            redirectUrl="/checkout"
          >
            <p>Unlimited Meetings</p>
            <p>Group Meetings (Coming soon)</p>
          </UpgradeCard>
        </Box>
      </Box>
    </Box>
  );
};

export default Upgrade;
