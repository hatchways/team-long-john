import { useFormik } from 'formik';
import { Box, FormControl, OutlinedInput, Button, Grid } from '@material-ui/core';

import Navigation from '../Navigation/Navigation';
import { useSnackBar } from '../../context/useSnackbarContext';
import useStyles from './useStyles';

const Checkout = (): JSX.Element => {
  const classes = useStyles();
  const { updateSnackBarMessage } = useSnackBar();
  const formik = useFormik({
    initialValues: {
      number: '',
      month: '',
      year: '',
      cvc: '',
    },
    onSubmit: async ({ number, month, year, cvc }, { resetForm }) => {
      if (number.trim() === '' || month.trim() === '' || year.trim() === '' || cvc.trim() === '') {
        return updateSnackBarMessage('Please enter valid card credentials');
      }
      // resetForm();
    },
  });

  return (
    <Box className={classes.page}>
      <Navigation />
      <Box my={15} px={15} py={10} className={classes.checkoutBox}>
        <Grid container justify="center">
          <h1>Checkout</h1>
        </Grid>
        <form onSubmit={formik.handleSubmit}>
          <Grid container justify="center">
            <Box>
              <h3>Card number</h3>
              <FormControl>
                <OutlinedInput
                  placeholder="7364 8257 2746 6153"
                  name="number"
                  value={formik.values.number}
                  onChange={formik.handleChange}
                  inputProps={{ maxLength: 16 }}
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
                      name="month"
                      value={formik.values.month}
                      onChange={formik.handleChange}
                      inputProps={{ maxLength: 2 }}
                      style={{ maxWidth: '100px' }}
                    />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl>
                    <OutlinedInput
                      placeholder="24"
                      name="year"
                      value={formik.values.year}
                      onChange={formik.handleChange}
                      inputProps={{ maxLength: 2 }}
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
                  value={formik.values.cvc}
                  onChange={formik.handleChange}
                  inputProps={{ maxLength: 3 }}
                  style={{ maxWidth: '100px' }}
                />
              </FormControl>
            </Box>
          </Box>
          <Box mt={2.5} className={classes.buttonBox}>
            <Button type="submit" className={classes.upgradeButton}>
              Pay $5
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Checkout;
