import { makeStyles } from '@material-ui/core/styles';

// const drawerWidth = 240;

const useStyles = makeStyles({
  root: {
    height: '6vh',
    minHeight: '4em',
    border: '0.5vh',
    marginBottom: '0.5vh',
    backgroundColor: '#FFFFFF',
  },
  navbar: {
    height: 'calc(100% - 0.5vh)',
    minHeight: '4em',
    border: '0.5vh',
    backgroundColor: '#FFFFFF',
  },
  navButtons: {
    marginLeft: 'auto',
  },
  option: {
    float: 'right',
    paddingRight: '20px',
    fontWeight: 'bold',
    color: 'black',
  },
  premium: {
    color: '#f76900',
  },
  dropdown: {
    height: 'calc(100% - 1em)',
    minWidth: '200px',
    margin: '0.5vh',
  },
  usernameContainer: {
    overflow: 'hidden',
    maxWidth: '200px',
  },
  username: {
    marginLeft: '10px',
    position: 'relative',
    paddingRight: '20px',
    fontWeight: 'bold',
    color: 'black',
  },
  dropdownMenu: {
    zIndex: 100,
  },
  iconImage: {
    height: '5vh',
    width: '5vh',
    minHeight: '4em',
    minWidth: '4em',
    padding: '0.5vh',
    borderRadius: '50%',
  },
  logoImage: {
    padding: '0.5vh',
    paddingLeft: '2vw',
  },
});

export default useStyles;
