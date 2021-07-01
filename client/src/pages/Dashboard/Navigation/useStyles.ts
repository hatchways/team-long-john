import { makeStyles } from '@material-ui/core/styles';

// const drawerWidth = 240;

const useStyles = makeStyles({
  root: {
    height: '6vh',
    minHeight: '4em',
    backgroundColor: '#FFFFFF',
    border: '0.5vh',
    marginBottom: '0.5vh',
  },
  navbar: {
    height: 'calc(100% - 0.5vh)',
    minHeight: '4em',
    backgroundColor: '#FFFFFF',
    border: '0.5vh',
  },
  navButtons: {
    marginLeft: 'auto',
  },
  option: {
    color: 'black',
    float: 'right',
    paddingRight: '20px',
    fontWeight: 'bold',
  },
  premium: {
    color: '#f76900',
  },
  dropdown: {
    height: 'calc(100% - 1em)',
    margin: '0.5vh',
  },
  dropdownMenu: {
    zIndex: 100,
  },
  iconImage: {
    height: '5vh',
    width: '5vh',
    minHeight: '4em',
    minWidth: '4em',
    borderRadius: '50%',
    padding: '0.5vh',
  },
  logoImage: {
    padding: '0.5vh',
    paddingLeft: '2vw',
  },
});

export default useStyles;
