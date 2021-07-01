import Grid from '@material-ui/core/Grid';
import { Paper } from '@material-ui/core';
import { Box } from '@material-ui/core';
import useStyles from './useStyles';
import { Typography } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import SettingsIcon from '@material-ui/icons/Settings';

interface SchedProp {
  schedTime: number;
}

export default function ScheduleOption(prop: SchedProp): JSX.Element {
  const classes = useStyles();
  const title =
    prop.schedTime === 15 ? '15 minutes meeting' : prop.schedTime === 30 ? '30 minutes meeting' : '45 minutes meeting';
  const className =
    prop.schedTime === 15 ? classes.paperStyleP : prop.schedTime === 30 ? classes.paperStyleG : classes.paperStyleO;

  return (
    <Grid item xs={12} sm={4}>
      <Paper className={classes.scheduleOption}>
        <Box className={className} />
        <IconButton className={classes.iconButtonStyle}>
          <SettingsIcon />
        </IconButton>
        <Button className={classes.scheduleButton}>
          <Box className={classes.schedInfo}>
            <Typography className={classes.schedTitle}> {title} </Typography>
            <Typography> One-on-one </Typography>
          </Box>
        </Button>
        <Box className={classes.subInfo}>
          <QueryBuilderIcon className={classes.iconStyle} />
          <Typography className={classes.subInfoText}> {prop.schedTime} min </Typography>
          <Button variant="outlined" className={classes.outlinedButton}>
            COPY LINK
          </Button>
        </Box>
      </Paper>
    </Grid>
  );
}
