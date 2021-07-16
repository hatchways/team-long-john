import { useState } from 'react';
import { Box, FormControl, OutlinedInput, Button, MenuItem, Grid, Select, InputLabel } from '@material-ui/core';

import Navigation from '../Navigation/Navigation';
import { useSnackBar } from '../../context/useSnackbarContext';
import useStyles from './useStyles';

interface CardInfo {
  cardNumber: string;
  expirationMonth: string;
  expirationYear: string;
  cvc: string;
}

const Checkout = (): JSX.Element => {
  const classes = useStyles();
  const [cardInfo, setCardInfo] = useState<CardInfo>({
    cardNumber: '',
    expirationMonth: '',
    expirationYear: '',
    cvc: '',
  });

  const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  const years = ['21', '22', '23', '24', '25', '26', '27', '28', '29', '30'];

  const { updateSnackBarMessage } = useSnackBar();

  const handleChange = (e: { target: HTMLInputElement | HTMLTextAreaElement }) => {
    const { name, value } = e.target;
    setCardInfo({ ...cardInfo, [name]: value });
  };

  const handleClick = (): void => {
    const { cardNumber, expirationMonth, expirationYear, cvc } = cardInfo;

    if (
      cardNumber.trim() === '' ||
      expirationMonth.trim() === '' ||
      expirationYear.trim() === '' ||
      cvc.trim() === ''
    ) {
      return updateSnackBarMessage('Please enter a valid card');
    }
  };

  return (
    <Box className={classes.page}>
      <Navigation />
      <Box my={15} px={15} py={10} className={classes.checkoutBox}>
        <Grid container justify="center">
          <h1>Checkout</h1>
        </Grid>
        <Grid container justify="center">
          <Box>
            <h3>Card number</h3>
            <FormControl>
              <OutlinedInput
                placeholder="7364 8257 2746 6153"
                name="cardNumber"
                value={cardInfo.cardNumber}
                onChange={(e) => handleChange(e)}
                style={{ minWidth: '400px' }}
              />
            </FormControl>
          </Box>
        </Grid>
        <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <h3>Expiration Date</h3>
            <Box style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <Box>
                <FormControl>
                  <OutlinedInput
                    placeholder="08"
                    name="expirationMonth"
                    value={cardInfo.expirationMonth}
                    onChange={(e) => handleChange(e)}
                    onInput={(e: any) => {
                      e.target.value
                        ? (e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 2))
                        : null;
                    }}
                    style={{ maxWidth: '100px' }}
                  />
                </FormControl>
              </Box>
              <Box>
                <FormControl>
                  <OutlinedInput
                    placeholder="24"
                    name="expirationYear"
                    value={cardInfo.expirationYear}
                    onChange={(e) => handleChange(e)}
                    onInput={(e: any) => {
                      e.target.value
                        ? (e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 2))
                        : null;
                    }}
                    style={{ maxWidth: '100px' }}
                  />
                </FormControl>
              </Box>
            </Box>
          </Box>
          <Box ml={5}>
            <h3>CVC</h3>
            <FormControl>
              <OutlinedInput
                placeholder="•••"
                name="cvc"
                value={cardInfo.cvc}
                onChange={(e) => handleChange(e)}
                style={{ maxWidth: '100px' }}
              />
            </FormControl>
          </Box>
        </Box>
        <Box mt={2.5} className={classes.buttonBox}>
          <Button onClick={handleClick} className={classes.upgradeButton}>
            Pay $5
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Checkout;
