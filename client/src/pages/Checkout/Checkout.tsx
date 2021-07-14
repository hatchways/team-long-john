import { useState } from 'react';
import { Box, FormControl, OutlinedInput, Button } from '@material-ui/core';

import { useSnackBar } from '../../context/useSnackbarContext';
import useStyles from './useStyles';

interface CardInfo {
  cardNumber: string;
  expirationDate: string;
  cvc: string;
}

const Checkout = (): JSX.Element => {
  const classes = useStyles();
  const [cardInfo, setCardInfo] = useState<CardInfo>({ cardNumber: '', expirationDate: '', cvc: '' });

  const { updateSnackBarMessage } = useSnackBar();

  const handleChange = (e: any): any => {
    const { name, value } = e.target;
    setCardInfo({ ...cardInfo, [name]: value });
  };

  const handleClick = (): any => {
    const { cardNumber, expirationDate, cvc } = cardInfo;

    if (cardNumber.trim() === '' || expirationDate.trim() === '' || cvc.trim() === '') {
      return updateSnackBarMessage('Please enter valid input');
    }
  };

  return (
    <Box className={classes.page}>
      <h1>Checkout</h1>
      <Box>
        <Box className={classes.cardNumberBox}>
          <h3>Card number</h3>
          <FormControl>
            <OutlinedInput name="cardNumber" value={cardInfo.cardNumber} onChange={(e) => handleChange(e)} />
          </FormControl>
        </Box>
        <Box className={classes.cardInfoBox}>
          <Box className={classes.cardExpirationBox}>
            <h3>Expiry date</h3>
            <FormControl>
              <OutlinedInput name="expirationDate" value={cardInfo.expirationDate} onChange={(e) => handleChange(e)} />
            </FormControl>
          </Box>
          <Box className={classes.cardCVCBox}>
            <h3>CVC</h3>
            <FormControl>
              <OutlinedInput name="cvc" value={cardInfo.cvc} onChange={(e) => handleChange(e)} />
            </FormControl>
          </Box>
        </Box>
        <Box mt={5} className={classes.buttonBox}>
          <Button className={classes.upgradeButton}>Pay $5</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Checkout;
