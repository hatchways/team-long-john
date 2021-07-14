import { useState } from 'react';
import { Box, FormControl, OutlinedInput, Button, MenuItem, Select } from '@material-ui/core';

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

  // Had to duplicate these because TypeScript and Material-UI conflicts
  const handleChangeMonth = async (e: React.ChangeEvent<{ value: unknown }>) => {
    setCardInfo({ ...cardInfo, expirationMonth: e.target.value as string });
  };

  const handleChangeYear = async (e: React.ChangeEvent<{ value: unknown }>) => {
    setCardInfo({ ...cardInfo, expirationYear: e.target.value as string });
  };

  const handleClick = (): void => {
    const { cardNumber, expirationMonth, expirationYear, cvc } = cardInfo;

    if (
      cardNumber.trim() === '' ||
      expirationMonth.trim() === '' ||
      expirationYear.trim() === '' ||
      cvc.trim() === ''
    ) {
      return updateSnackBarMessage('Please enter valid input');
    }
  };

  const renderMonths = months.map((month) => (
    <MenuItem key={month} value={month}>
      {month}
    </MenuItem>
  ));

  const renderYears = years.map((year) => (
    <MenuItem key={year} value={year}>
      {year}
    </MenuItem>
  ));

  return (
    <Box className={classes.page}>
      <Navigation />
      <Box my={5} px={30} py={10} className={classes.checkoutBox}>
        <Box className={classes.headerBox}>
          <h1>Checkout</h1>
        </Box>
        <Box mb={2.5} className={classes.cardNumberBox}>
          <h3>Card number</h3>
          <FormControl>
            <OutlinedInput
              placeholder="7364 8257 2746 6153"
              name="cardNumber"
              value={cardInfo.cardNumber}
              onChange={(e) => handleChange(e)}
            />
          </FormControl>
        </Box>
        <Box className={classes.cardInfoBox}>
          <Box>
            <h3>Expiration date</h3>
            <Box style={{ border: '1px solid #bcbcbc', borderRadius: '5px', display: 'flex' }}>
              <Box>
                <FormControl
                  variant="outlined"
                  className={`${classes.selectButton} ${classes.root}`}
                  style={{ borderRight: '1px solid #bcbcbc' }}
                >
                  <Select value={cardInfo.expirationMonth} onChange={(e) => handleChangeMonth(e)}>
                    {renderMonths}
                  </Select>
                </FormControl>
              </Box>
              <Box>
                <FormControl variant="outlined" className={`${classes.selectButton} ${classes.root}`}>
                  <Select value={cardInfo.expirationYear} onChange={(e) => handleChangeYear(e)}>
                    {renderYears}
                  </Select>
                </FormControl>
              </Box>
            </Box>
          </Box>
          <Box>
            <h3>CVC</h3>
            <FormControl style={{ minWidth: '100px' }}>
              <OutlinedInput placeholder="•••" name="cvc" value={cardInfo.cvc} onChange={(e) => handleChange(e)} />
            </FormControl>
          </Box>
        </Box>
        <Box mt={5} className={classes.buttonBox}>
          <Button onClick={handleClick} className={classes.upgradeButton}>
            Pay $5
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Checkout;
