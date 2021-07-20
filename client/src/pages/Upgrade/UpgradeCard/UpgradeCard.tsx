import { Button, Box } from '@material-ui/core';
import { useSnackBar } from '../../../context/useSnackbarContext';

import useStyles from './useStyles';

interface Props {
  headerColor: string;
  headerText: string;
  headerSubtitle: string;
  disableButton: boolean;
  buttonText: string;
  priceId: string;
  children: JSX.Element[];
}

const UpgradeCard = ({
  headerColor,
  headerText,
  headerSubtitle,
  disableButton,
  buttonText,
  priceId,
  children,
}: Props): JSX.Element => {
  const classes = useStyles();
  const { updateSnackBarMessage } = useSnackBar();

  const handleSubmit = async () => {
    const res = await fetch('/stripe/pay', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({ priceId }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    if (res.status !== 303) return updateSnackBarMessage('Error connecting to Stripe');

    const checkOutURL = await res.json();
    window.location.replace(checkOutURL);
  };

  const renderText = children.map((element, idx) => {
    return (
      <div key={idx}>
        <p>
          <span className={classes.checkmark}>✓</span>
          {element.props.children}
        </p>
      </div>
    );
  });

  return (
    <Box mx={4} className={classes.container}>
      <Box pb={4} className={classes.upgradeBox}>
        <h1 style={{ color: headerColor }}>{headerText}</h1>
        <h2 style={{ marginTop: '-10px' }}>{headerSubtitle}</h2>
        <Button onClick={handleSubmit} disabled={disableButton} variant="contained" className={classes.upgradeButton}>
          {buttonText}
        </Button>
      </Box>
      <Box className={classes.textBox}>{renderText}</Box>
    </Box>
  );
};

export default UpgradeCard;
