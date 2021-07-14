import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '40vh',
    width: '30vh',
    boxShadow: '0 6px 20px 0 rgba(0, 0, 0, 0.19)',
  },
  upgradeBox: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottom: '1px solid lightgrey',
  },
  upgradeButton: {
    color: 'white',
    backgroundColor: '#F76900',
    height: '55px',
    width: '150px',
    margin: '15px 0',
  },
  textBox: {
    marginTop: '20px',
    marginLeft: '50px',
    width: '100%',
    fontSize: '15px',
  },
  checkmark: {
    color: '#F76900',
    marginRight: '10px',
  },
}));

export default useStyles;
