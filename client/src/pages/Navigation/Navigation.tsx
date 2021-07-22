import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import { Box } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grow from '@material-ui/core/Grow';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import logo from '../../Images/logo.png';
import { loadProfileImage } from '../../helpers/APICalls/settings';
import tempImg from '../../Images/loading.gif';
import { useAuth } from '../../context/useAuthContext';
import { useSnackBar } from '../../context/useSnackbarContext';
import useStyles from './useStyles';

export default function Navigation(): JSX.Element {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const classes = useStyles();
  const [profileUrl, setProfileUrl] = useState(tempImg);
  const { updateSnackBarMessage } = useSnackBar();
  const { loggedInUser, logout } = useAuth();
  const history = useHistory();

  useEffect(() => {
    if (loggedInUser) {
      loadProfileImage(loggedInUser._id, setProfileUrl, updateSnackBarMessage);
    }
  }, [loggedInUser, updateSnackBarMessage]);
  if (loggedInUser === undefined || loggedInUser === null) {
    return <CircularProgress />;
  }

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);
  const handleLogout = () => logout();
  const handleSetting = () => {
    history.push('/userSetting');
  };

  return (
    <AppBar position="static" className={classes.root}>
      <CssBaseline />
      <Toolbar className={classes.navbar}>
        <img src={logo} className={classes.logoImage} />
        <Box className={classes.navButtons}>
          <Link to="/upgrade" className={`${classes.option} ${classes.premium}`} style={{ textDecoration: 'none' }}>
            Upgrade Account
          </Link>
          <Link to="/integration" className={classes.option} style={{ textDecoration: 'none' }}>
            Integration
          </Link>
          <Link to="/dashboard" className={classes.option} style={{ textDecoration: 'none' }}>
            Home
          </Link>
        </Box>
        <Button className={classes.dropdown} onClick={handleMenu}>
          <img src={profileUrl} className={classes.iconImage} />
          <Box className={classes.usernameContainer}>
            <Typography className={classes.username}>
              {loggedInUser.name ? loggedInUser.name : loggedInUser.username}
            </Typography>
          </Box>
        </Button>
        <Popper className={classes.dropdownMenu} open={Boolean(anchorEl)} anchorEl={anchorEl} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList>
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleSetting}>Setting</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Toolbar>
    </AppBar>
  );
}
