import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import CssBaseline from '@material-ui/core/CssBaseline';
import useStyles from './useStyles';
import tempImg from '../../Images/b1f0e680702e811aa8ba333cb19c0e0ea95e8e31.png';
import logo from '../../Images/logo.png';
import { Box } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

import { useAuth } from '../../context/useAuthContext';

export default function Navigation(): JSX.Element {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const classes = useStyles();
  const { loggedInUser, logout } = useAuth();

  if (loggedInUser === undefined || loggedInUser === null) {
    return <CircularProgress />;
  }

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);
  const handleLogout = () => logout();

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
          <img src={tempImg} className={classes.iconImage} />
          <Box className={classes.usernameContainer}>
            <Typography className={classes.username}> {loggedInUser.name} </Typography>
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
