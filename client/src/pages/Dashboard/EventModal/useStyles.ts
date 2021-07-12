import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 0, 3),
    height: '32.5vh',
    width: '70vh',
  },
  formHeader: {
    paddingLeft: '25px',
    display: 'flex',
    borderBottom: '1px solid lightgrey',
  },
  formItem: {
    padding: '7.5px 25px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  formInput: {
    height: '45px',
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
    width: '200px',
  },
}));

export default useStyles;
