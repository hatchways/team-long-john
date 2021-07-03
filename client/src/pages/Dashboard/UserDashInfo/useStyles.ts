import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
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
    float: 'right',
    borderColor: '#f76900',
    color: '#f76900',
  },
});

export default useStyles;
