import { Box, LinearProgress, withStyles } from '@material-ui/core/';

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
    <Box className={classes.container}>
      <h2 className={classes.item}>{headerText}</h2>
      <BorderLinearProgress className={classes.item} variant="determinate" value={progressValue} />
    </Box>
  );
};

export default OnboardingHeader;
