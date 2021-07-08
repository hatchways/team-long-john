import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    minHeight: '100vh',
    '& .MuiInput-underline:before': {
      borderBottom: '1.2px solid rgba(0, 0, 0, 0.2)',
    },
  },
  wrapper: {
    position: 'relative',
    margin: 'auto',
  },
  logo: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  mainContainer: {
    height: '600px',
    width: '500px',
    position: 'relative',
    marginTop: '30px',
    boxShadow: '0 6px 20px 0 rgba(0, 0, 0, 0.19)',
  },
  mainContent: {
    marginTop: '30px',
    margin: '75px',
    paddingTop: '75px',
  },
  header: {
    marginLeft: '30px',
    marginRight: '30px',
    marginBottom: '60px',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '2em',
  },
  subHeader: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  textField: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  textFieldContent: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  buttonGS: {
    display: 'block',
    padding: '15px',
    paddingLeft: '35px',
    paddingRight: '35px',
    marginTop: '75px',
    marginBottom: '75px',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: '5px',
    boxShadow: '0 3px 5px 0 rgba(0, 0, 0, 0.19)',
    fontWeight: 'bold',
    fontSize: '1.2em',
    color: 'white',
    backgroundColor: '#F76900',
  },
  redirect: {
    textAlign: 'center',
    verticalAlign: 'middle',
    padding: '40px',
    borderTop: 'solid 2px',
    borderColor: '#eff1f7',
  },
  redirectText: {
    fontWeight: 'bold',
  },
  link: {
    color: '#F76900',
  },
}));

export default useStyles;
