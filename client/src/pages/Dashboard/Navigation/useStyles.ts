import { makeStyles } from '@material-ui/core/styles';

// const drawerWidth = 240;

const useStyles = makeStyles({
  root: {
    height: '6vh',
    minHeight: '4em',
    backgroundColor: '#FFFFFF',
    border: '0.5vh',
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
  menu: {
    color: 'black',
    float: 'right',
    padding: '0.5vh',
  },
  dropdown: {
    height: 'calc(100% - 1em)',
    margin: '0.5vh',
  },
  iconImage: {
    height: '5vh',
    width: '5vh',
    minHeight: '4em',
    minWidth: '4em',
    borderRadius: '50%',
    padding: '0.5vh',
  },
});

export default useStyles;
