import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  iconWrapper: {
    width: '5vh',
  },
  iconImage: {
    height: '5vh',
    width: '5vh',
    minHeight: '4em',
    minWidth: '4em',
    borderRadius: '50%',
  },
  userName: {
    fontWeight: 'bold',
  },
  outlinedButton: {
    borderColor: '#f76900',
    color: '#f76900',
    float: 'right',
  },
}));

export default useStyles;
