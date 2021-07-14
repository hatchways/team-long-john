import { useState } from 'react';
import { Button, Box } from '@material-ui/core';

import useStyles from './useStyles';

interface Props {
  headerColor: string;
  headerText: string;
  headerSubtitle: string;
}

const UpgradeCard = ({ headerColor, headerText, headerSubtitle }: Props): JSX.Element => {
  const classes = useStyles();

  return (
    <Box mx={4} className={classes.container}>
      <Box pb={4} className={classes.upgradeBox}>
        <h1 style={{ color: headerColor }}>{headerText}</h1>
        <h2 style={{ marginTop: '-10px' }}>{headerSubtitle}</h2>
        <Button variant="contained" className={classes.upgradeButton}>
          Upgrade
        </Button>
      </Box>
      <Box className={classes.textBox}>
        <p>
          <span className={classes.checkmark}>✓</span> Unlimited event types
        </p>
        <p>
          <span className={classes.checkmark}>✓</span> Group meetings
        </p>
      </Box>
    </Box>
  );
};

export default UpgradeCard;
