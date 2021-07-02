import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  page: {
    width: '100vw',
    height: '100vh',
    padding: '0 40px',
  },
  box: {
    borderRadius: 5,
    height: '60vh',
    width: '70vh',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
  },
  inputBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}));

export default useStyles;
