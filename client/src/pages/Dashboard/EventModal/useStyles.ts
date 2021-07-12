import { makeStyles } from '@material-ui/core/styles';
import { Block } from '@material-ui/icons';

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
    height: '30vh',
    width: '70vh',
  },
  formHeader: {
    paddingLeft: '25px',
    display: 'flex',
    borderBottom: '1px solid lightgrey',
  },
  formItem: {
    padding: '7.5px 50px',
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
