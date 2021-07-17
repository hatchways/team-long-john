import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    overflow: 'auto',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[24],
    padding: theme.spacing(2, 0, 3),
    height: '45vh',
    width: '70vh',
  },
  formHeader: {
    paddingLeft: '25px',
    display: 'flex',
    borderBottom: '1px solid lightgrey',
  },
  formBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    height: '100%',
  },
  formItem: {
    padding: '0 50px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  formInput: {
    width: '120px',
  },
  buttonBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    color: 'white',
    backgroundColor: '#F76900',
    height: '55px',
    width: '150px',
  },
}));

export default useStyles;
