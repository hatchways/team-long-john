import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  wrapper: {
    position: 'relative',
    width: '500px',
    height: '100%',
    marginTop: '15vh',
    margin: 'auto',
    padding: '100px 50px',
    backgroundColor: 'white',
    boxShadow: '0 6px 20px 0 rgba(0, 0, 0, 0.19)',
  },
  header: {
    textAlign: 'left',
    fontSize: '1em',
  },
  subHeader: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '1em',
  },
  buttonWrapper: {
    textAlign: 'center',
    margin: '60px 20px',
  },
  button: {
    marginLeft: '5px',
    marginRight: '5px',
    fontSize: '0.9em',
  },
  googleCalen: {
    width: '250px',
    height: '60px',
    backgroundColor: '#F76900',
    color: 'white',
  },
  confirm: {
    minWidth: '180px',
    padding: '15px 0px',
    marginBottom: '10px',
    border: '1px solid #F76900',
    color: '#F76900',
  },
  cancel: {
    minWidth: '180px',
    padding: '15px 0px',
    marginBottom: '10px',
    border: '1px solid gray',
    color: 'gray',
  },
});

export default useStyles;
