import { useState } from 'react';
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
          <UpgradeCard headerColor="#7900ff" headerText="Standard" headerSubtitle="Free" />
          <UpgradeCard headerColor="#7900ff" headerText="Premium" headerSubtitle="$5/month" />
        </Box>
      </Box>
    </Box>
  );
};

export default Upgrade;
