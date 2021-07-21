import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  wrapper: {
    padding: '50px',
    margin: 'min(100px, 10vw)',
    boxShadow: '0 6px 20px 0 rgba(0, 0, 0, 0.19)',
  },
  headerTitle: {
    marginBottom: '40px',
    paddingBottom: '10px',
    borderBottom: '2px solid #f76900',
    fontSize: '2.5em',
    fontWeight: 'bold',
  },
  iconImage: {
    height: '15vh',
    width: '15vh',
    minHeight: '4em',
    minWidth: '4em',
    borderRadius: '50%',
  },
  contentBox: {
    marginLeft: '40px',
  },
  root: {
    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },
  },
}));

export default useStyles;
