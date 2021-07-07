import { makeStyles } from '@material-ui/core/styles';

// const drawerWidth = 240;

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    minHeight: '100vh',
    '& .MuiInput-underline:before': {
      borderBottom: '1.2px solid rgba(0, 0, 0, 0.2)',
    },
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  wrapper: {
    position: 'relative',
    display: 'flex',
    width: '1200px',
    height: '100%',
    margin: 'auto',
    backgroundColor: 'white',
    boxShadow: '0 6px 20px 0 rgba(0, 0, 0, 0.19)',
  },
  meetingInfo: {
    flex: 'left',
    height: '600px',
    width: '360px',
    borderRight: 'solid 2px #eff1f7',
  },
  calendarContainer: {
    flex: 'left',
    height: '520px',
    position: 'relative',
    margin: '40px',
    paddingTop: 'auto',
    paddingBottom: 'auto',
    border: 'none',
  },
  calendarHeader: {
    paddingLeft: '10px',
    fontWeight: 'bold',
    fontSize: '2em',
  },
  calendarTimeZone: {
    fontWeight: 'bold',
  },
});

export default useStyles;
