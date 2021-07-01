import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  scheduleOption: {
    marginTop: '20px',
    width: '100%',
    float: 'left',
  },
  paperStyleP: {
    backgroundColor: '#6e20f8',
    height: '5px',
  },
  paperStyleG: {
    backgroundColor: '#93b62e',
    height: '5px',
  },
  paperStyleO: {
    backgroundColor: '#f76900',
    height: '5px',
  },
  iconButtonStyle: {
    float: 'right',
  },
  iconStyle: {
    float: 'left',
    marginRight: '10px',
  },
  scheduleButton: {
    width: '100%',
    textAlign: 'left',
    paddingBottom: '30px',
  },
  schedInfo: {
    width: '100%',
    textAlign: 'left',
    paddingLeft: '20px',
  },
  schedTitle: {
    fontSize: '1.5em',
    fontWeight: 'bold',
    width: '100%',
  },
  subInfo: {
    borderTop: 'solid 3px',
    borderTopColor: '#f9fbff',
    padding: '30px',
  },
  subInfoText: {
    display: 'inline-block',
  },
  outlinedButton: {
    borderColor: '#f76900',
    color: '#f76900',
    float: 'right',
  },
}));

export default useStyles;
