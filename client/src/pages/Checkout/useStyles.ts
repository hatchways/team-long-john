import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  page: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  checkoutBox: {
    // overflow: 'hidden',
    // height: '60vh',
    // width: '60vw',
    boxShadow: '0 6px 20px 0 rgba(0, 0, 0, 0.19)',
  },
  cardNumberBox: {
    minWidth: '200px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  cardInfoBox: {
    // display: 'flex',
    // justifyContent: 'space-between',
  },
  buttonBox: {
    display: 'flex',
    justifyContent: 'center',
  },
  upgradeButton: {
    color: 'white',
    backgroundColor: '#F76900',
    height: '55px',
    width: '150px',
    margin: '15px 0',
  },
  root: {
    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },
  },
}));

export default useStyles;
