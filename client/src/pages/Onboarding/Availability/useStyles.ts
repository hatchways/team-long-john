import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  page: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  formContainer: {
    borderRadius: 5,
    height: '60vh',
    width: '70vh',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  formItemsContainer: {
    width: '100%',
    height: '100%',
    borderTop: '1px solid lightgrey',
  },
  formItem: {
    display: 'flex',
    alignItems: 'center',
  },
  checkboxContainer: {
    height: '80px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0 5px',
  },
  disabledCheckbox: {
    color: '#c4c4c4 !important',
  },
  enabledCheckbox: {
    color: '#F76900 !important',
  },
  disabledCheckboxText: {
    color: '#c4c4c4',
    marginTop: '0',
  },
  enabledCheckboxText: {
    marginTop: '0',
  },
  button: {
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
}));

export default useStyles;
