import { Link } from 'react-router-dom';
import { Button, Box } from '@material-ui/core';

import useStyles from './useStyles';

interface Props {
  headerColor: string;
  headerText: string;
  headerSubtitle: string;
  disableButton: boolean;
  buttonText: string;
  redirectUrl: string;
  children: JSX.Element[];
}

const UpgradeCard = ({
  headerColor,
  headerText,
  headerSubtitle,
  disableButton,
  buttonText,
  redirectUrl,
  children,
}: Props): JSX.Element => {
  const classes = useStyles();

  const renderText = children.map((element, idx) => {
    return (
      <p key={idx}>
        <span className={classes.checkmark}>✓</span>
        {element.props.children}
      </p>
    );
  });

  return (
    <Box mx={4} className={classes.container}>
      <Box pb={4} className={classes.upgradeBox}>
        <h1 style={{ color: headerColor }}>{headerText}</h1>
        <h2 style={{ marginTop: '-10px' }}>{headerSubtitle}</h2>
        <Link to={redirectUrl} style={{ textDecoration: 'none' }}>
          <Button disabled={disableButton} variant="contained" className={classes.upgradeButton}>
            {buttonText}
          </Button>
        </Link>
      </Box>
      <Box className={classes.textBox}>{renderText}</Box>
    </Box>
  );
};

export default UpgradeCard;
