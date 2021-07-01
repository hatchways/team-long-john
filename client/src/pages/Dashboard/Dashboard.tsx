import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Paper } from '@material-ui/core';
import { Box } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import useStyles from './useStyles';
import { useAuth } from '../../context/useAuthContext';
import { useSocket } from '../../context/useSocketContext';
import { useHistory } from 'react-router-dom';
import ChatSideBanner from '../../components/ChatSideBanner/ChatSideBanner';
import { useEffect } from 'react';
import { Typography } from '@material-ui/core';
import { Button } from '@material-ui/core';

import Navigation from './Navigation/Navigation';
import UserDashInfo from './UserDashInfo/UserDashInfo';
import ScheduleOption from './ScheduleOption/ScheduleOption';

export default function Dashboard(): JSX.Element {
  const classes = useStyles();

  // const { loggedInUser } = useAuth();
  // const { initSocket } = useSocket();

  // const history = useHistory();

  // useEffect(() => {
  //   initSocket();
  // }, [initSocket]);

  // if (loggedInUser === undefined) return <CircularProgress />;
  // if (!loggedInUser) {
  //   history.push('/login');
  //   // loading for a split seconds until history.push works
  //   return <CircularProgress />;
  // }

  // return (
  //   <Grid container component="main" className={`${classes.root} ${classes.dashboard}`}>
  //     <CssBaseline />
  //     <Grid item className={classes.drawerWrapper}>
  //       <ChatSideBanner loggedInUser={loggedInUser} />
  //     </Grid>
  //   </Grid>
  // );

  return (
    <Box className={`${classes.root} ${classes.dashboard}`}>
      <CssBaseline />
      <Navigation />
      <Box className={classes.dashWrapper}>
        <Box className={classes.headerWrapper}>
          <Box className={classes.header}>
            <Typography className={classes.headerTitle}> My CalendApp </Typography>
            <Box className={classes.headerMenu}>
              <Button className={classes.option}> EVENT TYPES </Button>
              <Button className={classes.option}> SCHEDULED EVENTS </Button>
            </Box>
          </Box>
        </Box>
        <Box className={classes.dashNewEvent}>
          <UserDashInfo />
          <Grid container spacing={2}>
            <ScheduleOption schedTime={15} />
            <ScheduleOption schedTime={30} />
            <ScheduleOption schedTime={45} />
          </Grid>
          <Button className={classes.helpButton}> Getting Started Guide </Button>
        </Box>
      </Box>
    </Box>
  );
}
