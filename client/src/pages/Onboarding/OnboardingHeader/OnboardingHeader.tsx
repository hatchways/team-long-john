import { LinearProgress, withStyles } from '@material-ui/core/';

import useStyles from './useStyles';

interface Props {
  headerText: string;
  progressValue: number;
}

const BorderLinearProgress = withStyles(() => ({
  root: {
    height: 10,
    borderRadius: 5,
    width: '30vh',
  },
  colorPrimary: {
    backgroundColor: '#f1f3f8',
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#F76900',
  },
}))(LinearProgress);

const OnboardingHeader = ({ headerText, progressValue }: Props): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <h2>{headerText}</h2>
      <BorderLinearProgress variant="determinate" value={progressValue} />
    </div>
  );
};

export default OnboardingHeader;
