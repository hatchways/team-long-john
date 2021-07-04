import { makeStyles } from '@material-ui/core/styles';

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
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'space-apart',
  },
  formItem: {
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
    width: '150px',
    marginBottom: '10px',
  },
}));

export default useStyles;
