import { makeStyles } from '@material-ui/core/styles';
import { findByLabelText } from '@testing-library/react';

const useStyles = makeStyles(() => ({
  page: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  formBox: {
    borderRadius: 5,
    height: '60vh',
    width: '70vh',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  formItemsBox: {
    width: '100%',
    height: '100%',
    borderTop: '1px solid lightgrey',
  },
  formItem: {
    display: 'flex',
    alignItems: 'center',
  },
  checkbox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0px 5px',
  },
  buttonBox: {
    display: 'flex',
    flexDirection: 'column',
  },
  finish: {
    color: 'white',
    backgroundColor: '#F76900',
    height: '55px',
    width: '150px',
    marginBottom: '10px',
  },
  test: {
    fontSize: '100px',
  },
}));

export default useStyles;
