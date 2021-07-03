import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    minHeight: '100vh',
    '& .MuiInput-underline:before': {
      borderBottom: '1.2px solid rgba(0, 0, 0, 0.2)',
    },
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
    position: 'relative',
    minHeight: '93.5vh',
    margin: 'auto',
    backgroundColor: '#f9fbff',
  },
  headerWrapper: {
    backgroundColor: 'white',
  },
  header: {
    maxWidth: '1050px',
    marginRight: 'auto',
    marginLeft: 'auto',
    paddingTop: '30px',
    paddingRight: '20px',
    paddingLeft: '20px',
  },
  headerTitle: {
    marginRight: 'auto',
    fontSize: '3em',
    fontWeight: 'bold',
  },
  headerMenu: {
    minHeight: '45px',
    marginTop: '5px',
  },
  option: {
    paddingTop: '10px',
    paddingRight: '20px',
    fontWeight: 'bold',
    color: 'black',
  },
  selected: {
    color: '#f76900',
  },
  dashNewEvent: {
    maxWidth: '1050px',
    height: '100%',
    marginRight: 'auto',
    marginLeft: 'auto',
    paddingTop: '30px',
    paddingRight: '20px',
    paddingLeft: '20px',
  },
  dashSchedEvent: {
    maxWidth: '1050px',
    height: '100%',
    marginTop: '40px',
    marginRight: 'auto',
    marginLeft: 'auto',
    paddingTop: '30px',
    paddingRight: '20px',
    paddingLeft: '20px',
    border: 'solid 1px',
    borderColor: 'lightgray',
    borderRadius: '5px',
    backgroundColor: 'white',
  },
  schedButtonContainer: {
    paddingBottom: '10px',
  },
  schedEventList: {
    maxWidth: '1050px',
    height: '100%',
    marginRight: 'auto',
    marginLeft: 'auto',
    paddingTop: '20px',
    paddingBottom: '20px',
    paddingRight: '20px',
    paddingLeft: '20px',
  },
  schedEventData: {
    maxWidth: '1050px',
    minHeight: '5em',
    overflow: 'auto',
    paddingTop: '10px',
    paddingBottom: '10px',
    border: 'solid 2px',
    borderColor: '#F76900',
    margin: '10px',
  },
  schedInfo: {
    float: 'left',
    width: '300px',
    overflow: 'auto',
    paddingLeft: '10px',
    paddingRight: '10px',
  },
  timeInfo: {
    textAlign: 'center',
    fontSize: '1.5em',
    fontWeight: 'bold',
  },
  emptyEventList: {
    maxWidth: '1050px',
    height: '500px',
    fontSize: '3em',
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'gray',
  },
  helpButton: {
    position: 'fixed',
    bottom: '100px',
    right: '100px',
    padding: '10px',
    paddingLeft: '20px',
    paddingRight: '20px',
    borderRadius: '30px',
    fontSize: '1.5em',
    color: 'white',
    backgroundColor: '#f76900',
  },
}));

export default useStyles;
