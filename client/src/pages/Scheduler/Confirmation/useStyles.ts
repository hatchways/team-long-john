import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  wrapper: {
    position: 'absolute',
    width: '400px',
    height: '500px',
    marginTop: '30vh',
    margin: 'auto',
    padding: '100px 50px',
    border: 'solid 2px #F76900',
    backgroundColor: 'white',
    boxShadow: '0 6px 20px 0 rgba(0, 0, 0, 0.19)',
  },
  header: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '1.5em',
  },
  buttonWrapper: {
    textAlign: 'center',
    margin: '100px 20px',
  },
  button: {
    display: 'inline-block',
    width: '100px',
    height: '50px',
    marginLeft: '5px',
    marginRight: '5px',
  },
  confirm: {
    backgroundColor: '#F76900',
    color: 'white',
  },
  cancel: {
    backgroundColor: 'lightgray',
    color: 'white',
  },
  textField: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  textFieldContent: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default useStyles;
