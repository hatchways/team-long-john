import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  availWrapper: {
    height: '100%',
    width: '860px',
    display: 'flex',
    marginTop: '50px',
    margin: 'auto',
    padding: '50px',
    border: '2px solid #f76900',
    borderRadius: '15px',
    flexDirection: 'column',
    alignItems: 'center',
  },
  formItemsContainer: {
    width: '100%',
    height: '100%',
  },
  subHeader: {
    paddingBottom: '20px',
    fontSize: '2em',
    fontWeight: 'bold',
  },
  formItem: {
    display: 'flex',
    alignItems: 'center',
  },
  formDays: {
    border: '1px solid #c4c4c4',
    borderRadius: '10px',
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
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  timeZoneForm: {
    width: '35%',
    display: 'flex',
    flexDirection: 'column',
    marginTop: '30px',
    marginLeft: '50px',
  },
  finish: {
    color: 'white',
    backgroundColor: '#F76900',
    height: '45px',
    width: '150px',
    marginTop: '30px',
  },
}));

export default useStyles;
