import { makeStyles } from '@material-ui/core/styles';
import { findByLabelText } from '@testing-library/react';

const useStyles = makeStyles(() => ({
  page: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  box: {
    borderRadius: 5,
    height: '60vh',
    width: '70vh',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonBox: {
    display: 'flex',
    flexDirection: 'column',
  },
  finish: {
    color: 'white',
    backgroundColor: '#F76900',
    height: '55px',
    width: '200px',
    marginBottom: '10px',
  },
  setUpLater: {
    color: 'lightgray',
    height: '55px',
    width: '200px',
    marginBottom: '10px',
  },
}));

export default useStyles;
