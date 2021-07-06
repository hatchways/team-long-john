import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  submit: {
    width: 170,
    height: 54,
    borderRadius: theme.shape.borderRadius,
    filter: 'drop-shadow(0px 2px 6px rgba(74,106,149,0.2))',
    backgroundColor: '#ffffff',
    color: '#F76900',
    boxShadow: 'none',
    marginRight: 35,
    '&:hover': {
      backgroundColor: 'lightgrey',
    },
  },
}));

export default useStyles;
