import React from 'react';
import { Box } from '@material-ui/core';

import Navigation from '../Navigation/Navigation';
import useStyles from './useStyles';

const Events = (): JSX.Element => {
  const classes = useStyles();

  return (
    <Box>
      <Navigation />
      <p>Lol</p>
    </Box>
  );
};

export default Events;
