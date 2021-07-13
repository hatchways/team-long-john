import { useState } from 'react';
import { CircularProgress } from '@material-ui/core';

import { useAuth } from '../../context/useAuthContext';
import useStyles from './useStyles';

const Upgrade = (): JSX.Element => {
  const classes = useStyles();
  const { loggedInUser } = useAuth();

  if (loggedInUser === undefined || loggedInUser === null) return <CircularProgress />;

  return (
    <div>
      <p>Upgrade</p>
    </div>
  );
};

export default Upgrade;