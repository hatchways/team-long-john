import { makeStyles } from '@material-ui/core/styles';

// const drawerWidth = 240,

const useStyles = makeStyles({
  '@global': {
    '::-webkit-scrollbar': {
      width: '10px',
    },
    '::-webkit-scrollbar-track': {
      background: '#f1f1f1',
      borderRadius: '15px',
    },
    '::-webkit-scrollbar-thumb': {
      background: 'lightgray',
      borderRadius: '15px',
    },
    '::-webkit-scrollbar-thumb:hover': {
      background: 'gray',
      borderRadius: '15px',
    },
    '.react-calendar': {
      width: '450px',
      maxWidth: '100%',
      background: 'white',
      fontFamily: 'Arial, Helvetica, sans-serif',
      lineHeight: '1.125em',
      marginTop: '30px',
      marginBottom: '30px',
    },
    '.react-calendar--doubleView': {
      width: '700px',
    },
    '.react-calendar--doubleView .react-calendar__viewContainer': {
      display: 'flex',
      margin: '-0.5em',
    },
    '.react-calendar--doubleView .react-calendar__viewContainer > *': {
      width: '50%',
      margin: '0.5em',
    },
    '.react-calendar, .react-calendar *, .react-calendar *:before, .react-calendar *:after': {
      boxSizing: 'border-box',
    },
    '.react-calendar button': {
      margin: '0',
      border: '0',
      outline: 'none',
    },
    '.react-calendar button:enabled:hover': {
      cursor: 'pointer',
    },
    '.react-calendar__navigation': {
      height: '44px',
      marginTop: '1em',
      marginBottom: '1em',
    },
    '.react-calendar__navigation button': {
      minWidth: '44px',
      background: 'none',
      fontSize: '1.5em',
      fontWeight: 'bold',
      color: 'gray',
    },
    '.react-calendar__navigation button:enabled:hover, .react-calendar__navigation button:enabled:focus': {
      color: 'white',
      backgroundColor: '#f76b00',
    },
    '.react-calendar__navigation button[disabled]': {
      backgroundColor: '#f0f0f0',
    },
    '.react-calendar__navigation button.react-calendar__navigation__next-button': {
      color: '#f76b00',
    },
    '.react-calendar__navigation button.react-calendar__navigation__next-button:enabled:hover': {
      color: 'white',
      backgroundColor: '#f76b00',
    },
    '.react-calendar__navigation button.react-calendar__navigation__next2-button': {
      color: '#f76b00',
    },
    '.react-calendar__navigation button.react-calendar__navigation__next2-button:enabled:hover': {
      color: 'white',
      backgroundColor: '#f76b00',
    },
    '.react-calendar__month-view__weekdays': {
      textAlign: 'center',
      textTransform: 'uppercase',
      fontWeight: 'bold',
    },
    '.react-calendar__month-view__weekdays__weekday': {
      padding: '0.5em',
    },
    '.react-calendar__month-view__weekNumbers': {
      fontWeight: 'bold',
    },
    '.react-calendar__month-view__weekNumbers .react-calendar__tile': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '0.75em',
      padding: 'calc(0.75em / 0.75) calc(0.5em / 0.75)',
    },
    '.react-calendar__month-view__days': {
      height: '300px',
    },
    '.react-calendar__month-view__days__day--weekend': {
      color: '#d10000',
    },
    '.react-calendar__month-view__days__day--neighboringMonth': {
      color: 'white',
    },
    '.react-calendar__year-view .react-calendar__tile, .react-calendar__decade-view .react-calendar__tile, .react-calendar__century-view .react-calendar__tile':
      {
        padding: '2em 0.5em',
      },
    '.react-calendar__tile': {
      maxWidth: '100%',
      textAlign: 'center',
      padding: '0.75em 0.75em',
      borderRadius: '30%',
      background: 'none',
      fontWeight: 'bold',
    },
    '.react-calendar__tile:disabled': {
      color: 'lightgray',
    },
    '.react-calendar__tile:enabled:hover, .react-calendar__tile:enabled:focus': {
      backgroundColor: '#e6e6e6',
    },
    '.react-calendar__tile--hasActive': {
      color: 'white',
      background: '#f76b00',
    },
    '.react-calendar__tile--hasActive:enabled:hover, .react-calendar__tile--hasActive:enabled:focus': {
      color: 'white',
      background: '#f76b00',
    },
    '.react-calendar__tile--active': {
      background: '#f76900',
      color: 'white',
    },
    '.react-calendar__tile--active:enabled:hover, .react-calendar__tile--active:enabled:focus': {
      background: '#f76b00',
    },
    '.react-calendar--selectRange .react-calendar__tile--hover': {
      backgroundColor: '#e6e6e6',
    },
    '.react-calendar abbr': {
      fontSize: '1.2em',
      textDecoration: 'none',
    },
  },
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
    overflow: 'auto',
    position: 'relative',
    flex: 'left',
    height: '640px',
    width: '360px',
    padding: '50px',
    borderRight: 'solid 2px #eff1f7',
  },
  meetingInfoUser: {
    fontSize: '1.5em',
    color: 'lightgray',
  },
  meetingInfoHeader: {
    fontWeight: 'bold',
    fontSize: '2em',
    marginBottom: '20px',
  },
  meetingInfoTime: {
    float: 'left',
    paddingLeft: '3px',
    fontWeight: 'bold',
  },
  calendarContainer: {
    position: 'relative',
    flex: 'left',
    height: '560px',
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
  timeContainer: {
    position: 'relative',
    flex: 'left',
    height: '600px',
    width: '30%',
    margin: '20px',
    paddingTop: '90px',
    paddingBottom: 'auto',
    border: 'none',
  },
  timeHeader: {
    fontWeight: 'bold',
    fontSize: '1.5em',
    color: 'gray',
  },
  timeSchedContainer: {
    height: '400px',
    marginTop: '30px',
    overflow: 'auto',
  },
  timeSched: {
    width: '250px',
    height: '50px',
    marginBottom: '10px',
    border: 'solid 2px lightgray',
  },
});

export default useStyles;
