import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  scheduleOption: {
    float: 'left',
    marginTop: '20px',
    width: '100%',
    height: '220px',
  },
  paperStyleP: {
    height: '5px',
    backgroundColor: '#6e20f8',
  },
  paperStyleG: {
    height: '5px',
    backgroundColor: '#93b62e',
  },
  paperStyleO: {
    height: '5px',
    backgroundColor: '#f76900',
  },
  iconButtonStyle: {
    float: 'right',
  },
  iconStyle: {
    float: 'left',
    marginRight: '10px',
  },
  scheduleButton: {
    paddingBottom: '30px',
    width: '100%',
    height: '85px',
    textAlign: 'left',
    overflow: 'auto',
  },
  schedInfo: {
    width: '100%',
    paddingLeft: '20px',
    textAlign: 'left',
  },
  schedTitle: {
    width: '100%',
    fontSize: '1.5em',
    fontWeight: 'bold',
  },
  subInfo: {
    padding: '30px',
    borderTop: 'solid 3px',
    borderTopColor: '#f9fbff',
  },
  subInfoText: {
    display: 'inline-block',
  },
  outlinedButton: {
    float: 'right',
    borderColor: '#f76900',
    color: '#f76900',
  },
});

export default useStyles;
