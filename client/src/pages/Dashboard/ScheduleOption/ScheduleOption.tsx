import Grid from '@material-ui/core/Grid';
import { Paper } from '@material-ui/core';
import { Box } from '@material-ui/core';
import useStyles from './useStyles';
import { Typography } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import SettingsIcon from '@material-ui/icons/Settings';
import { useAuth } from '../../../context/useAuthContext';
import { User } from '../../../interface/User';

interface SchedProp {
  id: string;
  name: string;
  schedTime: number;
  colour: string;
}

export default function ScheduleOption(prop: SchedProp): JSX.Element {
  const loggedInUser: User | null | undefined = useAuth().loggedInUser;
  const classes = useStyles();
  const title = `${prop.name}`;
  const className =
    prop.colour === 'purple'
      ? classes.paperStyleP
      : prop.colour === 'green'
      ? classes.paperStyleG
      : classes.paperStyleO;
  const copyLink = () => {
    if (loggedInUser) {
      const shareLink = `${window.location.origin}/shared/${loggedInUser.username}/${prop.id}`;
      navigator.clipboard.writeText(shareLink);
    } else {
      alert('Please log in!');
    }
  };

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
          <Button variant="outlined" className={classes.outlinedButton} onClick={copyLink}>
            COPY LINK
          </Button>
        </Box>
      </Paper>
    </Grid>
  );
}
