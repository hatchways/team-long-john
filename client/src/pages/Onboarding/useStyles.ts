import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  page: {
    height: '100vh',
  },
  component: {
    borderRadius: 5,
    height: '60vh',
    width: '70vh',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
  },
  form: {
    display: 'flex',
    justifyContent: 'center',
  },
  box: {
    display: 'flex',
    flexDirection: 'column',
  },
  subheader: {
    marginRight: 20,
  },
}));

export default useStyles;
