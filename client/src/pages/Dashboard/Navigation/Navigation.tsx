import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Link from '@material-ui/core/Link';
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
import tempImg from '../../../Images/b1f0e680702e811aa8ba333cb19c0e0ea95e8e31.png';
import { Box } from '@material-ui/core';

export default function Navigation(): JSX.Element {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const classes = useStyles();
  const userName = 'TEMP USER';

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" className={classes.root}>
      <CssBaseline />
      <Toolbar className={classes.navbar}>
        <Typography className={classes.menu}> CalendApp </Typography>
        <Box className={classes.navButtons}>
          <Link component="button" className={classes.menu}>
            Upgrade Account
          </Link>
          <Link component="button" className={classes.menu}>
            Integration
          </Link>
          <Link component="button" className={classes.menu}>
            Home
          </Link>
        </Box>
        <Button className={classes.dropdown} onClick={handleMenu}>
          <img src={tempImg} className={classes.iconImage} />
          <Typography className={classes.menu}> {userName} </Typography>
        </Button>
        <Popper open={Boolean(anchorEl)} anchorEl={anchorEl} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList>
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>Logout</MenuItem>
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
