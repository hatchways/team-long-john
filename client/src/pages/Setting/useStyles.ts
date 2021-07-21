import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  wrapper: {
    position: 'relative',
    minHeight: '60vh',
    maxWidth: '1050px',
    margin: 'auto',
    marginTop: '10vh',
    padding: '50px',
    backgroundColor: '#f9fbff',
    boxShadow: '0 6px 20px 0 rgba(0, 0, 0, 0.19)',
  },
  headerTitle: {
    marginBottom: '40px',
    paddingBottom: '10px',
    borderBottom: '2px solid #f76900',
    fontSize: '2.5em',
    fontWeight: 'bold',
  },
  imageSettingBox: {
    float: 'left',
    width: '300px',
    marginLeft: '40px',
  },
  iconImage: {
    height: '15vh',
    width: '15vh',
    minHeight: '100px',
    minWidth: '100px',
    borderRadius: '50%',
  },
  imgInput: {
    margin: '7px 15px',
  },
  imgInputButton: {
    border: '2px solid #f76900',
    margin: '7px 15px',
  },
  userInfoBox: {
    float: 'left',
    width: '530px',
    padding: '30px',
    marginTop: '35px',
    marginLeft: '36px',
    marginBottom: '35px',
    marginRight: '40px',
    border: '2px solid #f76900',
    borderRadius: '15px',
    overflow: 'auto',
  },
  subHeader: {
    paddingBottom: '10px',
    fontSize: '2em',
    fontWeight: 'bold',
  },
  infoContent: {
    marginBottom: '10px',
    paddingLeft: '10px',
    paddingRight: '10px',
    fontSize: '1.2em',
  },
  contentBox: {
    float: 'left',
    marginLeft: '40px',
  },
  root: {
    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },
  },
}));

export default useStyles;
