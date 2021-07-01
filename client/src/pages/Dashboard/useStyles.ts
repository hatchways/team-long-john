import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    '& .MuiInput-underline:before': {
      borderBottom: '1.2px solid rgba(0, 0, 0, 0.2)',
    },
    position: 'absolute',
    width: '100%',
  },
  dashboard: { backgroundColor: '#FFFFFF' },
  drawerWrapper: {
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: '300px',
    },
  },
  dashWrapper: {
    minHeight: '93.5vh',
    position: 'relative',
    margin: 'auto',
    backgroundColor: '#f9fbff',
  },
  headerWrapper: {
    backgroundColor: 'white',
  },
  header: {
    marginRight: 'auto',
    marginLeft: 'auto',
    paddingTop: '30px',
    paddingRight: '20px',
    paddingLeft: '20px',
    maxWidth: '1050px',
  },
  headerTitle: {
    fontSize: '3em',
    marginRight: 'auto',
    fontWeight: 'bold',
  },
  headerMenu: {
    marginTop: '5px',
    minHeight: '45px',
  },
  option: {
    color: 'black',
    paddingTop: '10px',
    paddingRight: '20px',
    fontWeight: 'bold',
  },
  selected: {
    color: '#f76900',
  },
  dashNewEvent: {
    marginRight: 'auto',
    marginLeft: 'auto',
    paddingTop: '30px',
    paddingRight: '20px',
    paddingLeft: '20px',
    maxWidth: '1050px',
    height: '100%',
  },
  helpButton: {
    position: 'fixed',
    bottom: '100px',
    right: '100px',
    padding: '10px',
    paddingLeft: '20px',
    paddingRight: '20px',
    fontSize: '1.5em',
    color: 'white',
    backgroundColor: '#f76900',
    borderRadius: '30px',
  },
}));

export default useStyles;
