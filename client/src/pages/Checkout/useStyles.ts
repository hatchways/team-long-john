import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  page: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  cardNumberBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  cardInfoBox: {
    display: 'flex',
  },
  cardExpirationBox: {
    width: '30vw',
  },
  cardCVCBox: {
    width: '20vw',
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
}));

export default useStyles;
