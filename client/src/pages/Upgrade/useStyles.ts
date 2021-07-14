import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  pageBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paymentBox: {
    display: 'flex',
  },
}));

export default useStyles;
